import React, { useEffect, useRef } from 'react';

//ThirdParty
import Animated, {
  Easing,
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
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = (props: AnimatedStrokeProps) => {
  let { delay, duration, length } = props;
  const ref = useRef<any>(null);
  const progress = useSharedValue(0);

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
          easing: Easing.linear,
        },
        finished => {
          if (finished) {
            runOnJS(props.onFinish)();
          }
        },
      ),
    );
  }, [progress, delay, duration, length, props]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.linear(progress.value),
  }));

  return <AnimatedPath {...props} animatedProps={animatedProps} ref={ref} strokeDasharray={length} />;
};

export default AnimatedStroke;
