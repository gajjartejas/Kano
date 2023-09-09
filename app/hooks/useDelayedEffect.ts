import { useEffect } from 'react';

function useDelayedEffect(callback: () => void, skipTimeout: boolean, delay: number, dependencies: any[]) {
  useEffect(() => {
    if (skipTimeout) {
      callback();
      return;
    }
    const to = setTimeout(callback, delay);
    return () => {
      clearTimeout(to);
    };
  }, [callback, delay, dependencies, skipTimeout]);
}

export default useDelayedEffect;
