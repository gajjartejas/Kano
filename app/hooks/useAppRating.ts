import InAppReview from 'react-native-in-app-review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useRef } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

const RATE_PROMPT_INTERVAL_DAYS = 30;
const ONE_DAY_MS = 24 * 60 * 60 * 1000; // One day in milliseconds
const ELIGIBLE_FOR_RATING_COUNT = 10;

const useAppRating = () => {
  const refSkipAddItem = useRef<boolean>(false);

  const getItemView = useCallback(async () => {
    const rawAppItemsViews = await AsyncStorage.getItem('APP_ITEM_VIEWS');
    return rawAppItemsViews ? parseInt(rawAppItemsViews, 10) : 0;
  }, []);

  const eligibleForRating = useCallback(async () => {
    let appItemsViews = await getItemView();
    return appItemsViews >= ELIGIBLE_FOR_RATING_COUNT;
  }, [getItemView]);

  const addItemView = useCallback(async () => {
    if (refSkipAddItem.current) {
      return;
    }
    const rawAppItemsViews = await AsyncStorage.getItem('APP_ITEM_VIEWS');
    let appItemsViews = rawAppItemsViews ? parseInt(rawAppItemsViews, 10) + 1 : 1;
    AsyncStorage.setItem('APP_ITEM_VIEWS', String(appItemsViews));
    if (appItemsViews >= ELIGIBLE_FOR_RATING_COUNT) {
      refSkipAddItem.current = true;
      return;
    }
  }, []);

  // Function to show the rating prompt
  const showRatingPrompt = useCallback(async (currentDate: number) => {
    try {
      const isAvailable = InAppReview.isAvailable();
      if (isAvailable) {
        InAppReview.RequestInAppReview();
        await AsyncStorage.setItem('LAST_PROMPT_DATE', currentDate.toString());
      } else {
        console.warn('showRatingPrompt->Rating prompt is not available on this device.');
      }
    } catch (error: any) {
      crashlytics().recordError(error, 'useAppRating.ts->showRatingPrompt');
      console.error('showRatingPrompt->Error showing rating prompt:', error);
    }
  }, []);

  // Function to check if we should show the rating prompt
  const rateAppIfNeeded = useCallback(async () => {
    try {
      //to test use: `currentDate + 1 * 1000 * 60 * 60 * 24 + 1000 * 60 * 5;`
      const currentDate = new Date().getTime();
      const firstUseDateString = await AsyncStorage.getItem('FIRST_USE_DATE');

      // First use, don't prompt for rating yet
      if (!firstUseDateString) {
        await AsyncStorage.setItem('FIRST_USE_DATE', currentDate.toString());
        return;
      }

      // Check eligible for rating
      const isEligibleForRating = await eligibleForRating();
      if (!isEligibleForRating) {
        return;
      }

      const lastPromptDateString = await AsyncStorage.getItem('LAST_PROMPT_DATE');
      const firstUseDate = parseInt(firstUseDateString, 10);
      const lastPromptDate = lastPromptDateString ? parseInt(lastPromptDateString, 10) : null;
      const timeSinceFirstUse = currentDate - firstUseDate;
      const isDayAfterFirstUse = timeSinceFirstUse >= ONE_DAY_MS;

      if (lastPromptDate) {
        const timeSinceLastPrompt = currentDate - lastPromptDate;
        const isTimeForNextPrompt = timeSinceLastPrompt >= RATE_PROMPT_INTERVAL_DAYS * ONE_DAY_MS;
        if (isTimeForNextPrompt) {
          showRatingPrompt(currentDate);
        }
      } else if (isDayAfterFirstUse) {
        showRatingPrompt(currentDate);
      }
    } catch (error: any) {
      crashlytics().recordError(error, 'useAppRating.ts->rateAppIfNeeded');
      console.error('showRatingPrompt->Error checking rating prompt:', error);
    }
  }, [eligibleForRating, showRatingPrompt]);

  return { rateAppIfNeeded, addItemView, getItemView };
};

export default useAppRating;
