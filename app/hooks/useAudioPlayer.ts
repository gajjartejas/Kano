import { useCallback, useEffect, useRef } from 'react';

//ThirdParty
import Sound from 'react-native-sound';
import { singletonHook } from 'react-singleton-hook';
import crashlytics from '@react-native-firebase/crashlytics';

interface ISoundPlayerProps {
  play: ((soundFile: string) => void) | null;
  pause: (() => void) | null;
}

const useSoundPlayer = (): ISoundPlayerProps => {
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    Sound.setCategory('Playback');

    return () => {
      // Clean up the sound instance
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  const playSound = useCallback((soundFile: string): void => {
    console.log('playSound:', soundFile);
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
    }

    soundRef.current = new Sound(soundFile, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(`failed to load the sound: ${soundFile}`, error);
        crashlytics().recordError(error, `useAudioPlayer.ts->${soundFile}`);
        return;
      }

      soundRef.current?.play(success => {
        if (!success) {
          console.log(`playback failed due to audio decoding errors: ${soundFile}`);
        }
      });
    });
  }, []);

  const pauseSound = useCallback((): void => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  }, []);

  return { play: playSound, pause: pauseSound };
};

export default singletonHook(
  {
    play: null,
    pause: null,
  },
  useSoundPlayer,
);
