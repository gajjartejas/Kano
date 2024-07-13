import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import zustandStorage from 'app/store/zustandStorage';
import { Appearance } from 'react-native';

interface ICardAnimationConfigState {
  play: boolean;
  initialDelay: number;
  duration: number;
  strokeWidth: number;
  arrowFontSize: number;
  arrowSymbol: string;
  easingId: number;
  emptyStroke: string;
  arrowFill: string;
  stroke: string;
  disableStrokeAnimation: boolean;
  showArrow: boolean;
  cardAutoSwipeDuration: number;
}

interface ICardAnimationConfigActions {
  setPlay: (play: boolean) => void;
  setInitialDelay: (initialDelay: number) => void;
  setDuration: (duration: number) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  setArrowFontSize: (arrowFontSize: number) => void;
  setArrowSymbol: (arrowSymbol: string) => void;
  setEasingId: (easingId: number) => void;
  setEmptyStroke: (emptyStroke: string) => void;
  setArrowFill: (arrowFill: string) => void;
  setStroke: (stroke: string) => void;
  setDisableStrokeAnimation: (disableStrokeAnimation: boolean) => void;
  setShowArrow: (showArrow: boolean) => void;
  setTheme: (isDark: boolean) => void;
  setCardAutoSwipeDuration: (duration: number) => void;
  reset: () => void;
}

const IS_DARK = Appearance.getColorScheme() === 'dark';
const initialState: ICardAnimationConfigState = {
  play: true,
  initialDelay: 500,
  duration: 3000,
  strokeWidth: 6,
  arrowFontSize: 4,
  arrowSymbol: '→',
  easingId: 0,
  emptyStroke: IS_DARK ? '#FFFFFF11' : '#00000022',
  arrowFill: IS_DARK ? '#000000' : '#FFFFFF',
  stroke: IS_DARK ? '#FFFFFF' : '#000000',
  disableStrokeAnimation: false,
  showArrow: true,
  cardAutoSwipeDuration: 4000,
};

const useCardAnimationConfigStore = create<ICardAnimationConfigState & ICardAnimationConfigActions>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        setPlay: (play: boolean) => set(_state => ({ play: play })),
        setInitialDelay: (initialDelay: number) => set(_state => ({ initialDelay: initialDelay })),
        setDuration: (duration: number) => set(_state => ({ duration: duration })),
        setStrokeWidth: (strokeWidth: number) => set(_state => ({ strokeWidth: strokeWidth })),
        setArrowFontSize: (arrowFontSize: number) => set(_state => ({ arrowFontSize: arrowFontSize })),
        setArrowSymbol: (arrowSymbol: string) => set(_state => ({ arrowSymbol: arrowSymbol })),
        setEasingId: (easingId: number) => set(_state => ({ easingId: easingId })),
        setEmptyStroke: (emptyStroke: string) => set(_state => ({ emptyStroke: emptyStroke })),
        setArrowFill: (arrowFill: string) => set(_state => ({ arrowFill: arrowFill })),
        setStroke: (stroke: string) => set(_state => ({ stroke: stroke })),
        setDisableStrokeAnimation: (disableStrokeAnimation: boolean) =>
          set(_state => ({ disableStrokeAnimation: disableStrokeAnimation })),
        setShowArrow: (showArrow: boolean) => set(_state => ({ showArrow: showArrow })),
        setTheme: (isDark: boolean) =>
          set(_state => ({
            emptyStroke: isDark ? '#FFFFFF11' : '#00000022',
            arrowFill: isDark ? '#000000' : '#FFFFFF',
            stroke: isDark ? '#FFFFFF' : '#000000',
          })),
        setCardAutoSwipeDuration: (duration: number) => set(_state => ({ cardAutoSwipeDuration: duration })),
        reset: () => set(_state => ({ ...initialState })),
      }),
      {
        name: 'app-card-animation-storage',
        storage: createJSONStorage(() => zustandStorage),
        onRehydrateStorage: state => {
          console.log('useAppConfigStore->hydration starts', state);
        },
        version: 1,
      },
    ),
  ),
);

export default useCardAnimationConfigStore;
