import { useCallback, useEffect, useRef } from 'react';
import Sound from 'react-native-sound';
import { singletonHook } from 'react-singleton-hook';

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
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
    }

    soundRef.current = new Sound(soundFile, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound.', error);
        return;
      }

      console.log(
        'duration in seconds: ' +
          soundRef.current?.getDuration() +
          ' number of channels: ' +
          soundRef.current?.getNumberOfChannels(),
      );

      soundRef.current?.play(success => {
        if (success) {
          console.log('successfully finished playing sound.');
        } else {
          console.log('playback failed due to audio decoding errors.');
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
