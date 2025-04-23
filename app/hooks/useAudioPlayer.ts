import { useCallback, useEffect, useRef } from 'react';

//ThirdParty
import Sound from 'react-native-sound';
import crashlytics from '@react-native-firebase/crashlytics';

interface ISoundPlayerProps {
  play: (soundFile: string) => void;
  pause: () => void;
}

let sharedInstance: ISoundPlayerProps | null = null;

export const useSoundPlayer = (): ISoundPlayerProps => {
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    Sound.setCategory('Playback');
    Sound.setMode('SpokenAudio');

    return () => {
      soundRef.current?.release();
    };
  }, []);

  const play = useCallback((soundFile: string) => {
    console.log('playSound:', soundFile);
    soundRef.current?.stop();
    soundRef.current?.release();

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

  const pause = useCallback(() => soundRef.current?.pause(), []);

  const instance = { play, pause };

  // Keep only one shared instance per app lifecycle
  if (!sharedInstance) sharedInstance = instance;

  return sharedInstance;
};
