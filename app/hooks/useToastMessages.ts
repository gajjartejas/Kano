import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { IHintConfig } from 'app/hooks/useHintConfig';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface ToastMessage {
  type: 'info' | 'success' | 'warning' | 'error';
  text1: string;
  visibilityTime: number;
  position: 'top' | 'bottom';
}

const useToastMessages = (hintConfig: IHintConfig): null => {
  const { id, hints } = hintConfig;
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const storage = useAsyncStorage(id.toString());

  useEffect(() => {
    const clearToast = (): void => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
      Toast.hide();
    };

    const visibilityTime = 4000;
    const delay = 1000;

    storage
      .getItem((error, result) => {
        if (!error && result === '1') {
          return;
        }
        hints.forEach((hint, index) => {
          const timer = setTimeout(() => {
            const toastMessage: ToastMessage = {
              type: 'info',
              text1: hint,
              visibilityTime: visibilityTime,
              position: 'bottom',
            };

            Toast.show(toastMessage);
            if (index === hints.length - 1) {
              storage.setItem('1').then(() => {});
            }
          }, visibilityTime * index + (index + 1) * delay);
          timersRef.current.push(timer);
        });
      })
      .catch(error => {
        console.log('error', error);
      });

    return clearToast;
  }, [hints, storage]);

  return null;
};

export default useToastMessages;
