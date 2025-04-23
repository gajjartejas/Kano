import React, { memo, useEffect, useMemo, useRef } from 'react';

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
  let { delay, duration, length, easing, onFinish } = props;
  const ref = useRef<any>(null);
  const progress = useSharedValue(0);
  const easingFn = useMemo(() => easing ?? AnimatedStrokeEasing.linear, [easing]);

  useEffect(() => {
    if (!length || delay === null || duration === null) {
      return;
    }

    progress.value = withDelay(
      delay,
      withTiming(1, { duration, easing: easingFn }, finished => {
        if (finished) {
          runOnJS(onFinish)();
        }
      }),
    );

    return () => {
      progress.value = withTiming(0, { duration: 100 });
    };
  }, [delay, duration, length, onFinish, easingFn, progress]);

  const animatedProps = useAnimatedProps(() => {
    'worklet';
    if (length <= 0) {
      return { strokeDashoffset: 0 };
    }
    return {
      strokeDashoffset: length - length * easingFn(progress.value),
    };
  });

  return <AnimatedPath {...props} animatedProps={animatedProps} ref={ref} strokeDasharray={length} />;
};

export default memo(AnimatedStroke);
