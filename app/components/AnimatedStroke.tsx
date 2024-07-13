import React, { memo, useEffect, useRef } from 'react';

//ThirdParty
import Animated, {
  Easing,
  EasingFunction,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

//Interface
interface AnimatedStrokeProps extends PathProps {
  delay: number;
  duration: number;
  length: number;
  onFinish: () => void;
  easing?: EasingFunction;
}

const AnimatedPath = memo(Animated.createAnimatedComponent(Path));

export const AnimatedStrokeEasing = Easing;
export type AnimatedStrokeEasingFunction = EasingFunction;

const AnimatedStroke = (props: AnimatedStrokeProps) => {
  let { delay, duration, length, easing } = props;
  const ref = useRef<any>(null);
  const progress = useSharedValue(0);
  const easingFn = easing === undefined ? AnimatedStrokeEasing.linear : easing;

  useEffect(() => {
    if (!length || delay === null || duration === null) {
      return;
    }
    progress.value = withDelay(
      delay,
      withTiming(
        1,
        {
          duration: duration,
          easing: easingFn,
        },
        finished => {
          if (finished) {
            runOnJS(props.onFinish)();
          }
        },
      ),
    );

    // Cleanup function
    return () => {
      progress.value = 0;
    };
  }, [progress, delay, duration, length, props, easingFn]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * easingFn(progress.value),
  }));

  return <AnimatedPath {...props} animatedProps={animatedProps} ref={ref} strokeDasharray={length} />;
};

export default memo(AnimatedStroke);
