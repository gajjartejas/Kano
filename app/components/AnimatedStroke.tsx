import React, { useEffect, useRef } from 'react';

//ThirdParty
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

//Interface
interface AnimatedStrokeProps extends PathProps {
  delay: number;
  duration: number;
  length: number;
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
        (v, c) => {
          console.log('Finished..', c, v);
        },
      ),
    );
  }, [progress, delay, duration, length]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.linear(progress.value),
  }));

  return <AnimatedPath {...props} animatedProps={animatedProps} ref={ref} strokeDasharray={length} />;
};

export default AnimatedStroke;
