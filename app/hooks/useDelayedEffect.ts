import { useEffect } from 'react';

function useDelayedEffect(callback: () => void, skipTimeout: boolean, dependencies: any[]) {
  useEffect(() => {
    if (skipTimeout) {
      callback();
      return;
    }
    const to = setTimeout(callback, 100);
    return () => {
      clearTimeout(to);
    };
  }, [callback, dependencies, skipTimeout]);
}

export default useDelayedEffect;
