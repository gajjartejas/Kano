import React, { useEffect, useRef, useState } from 'react';
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

interface AnimatedStrokeProps extends PathProps {
  delay: number;
  duration: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = (props: AnimatedStrokeProps) => {
  const [length, setLength] = useState(0);
  const ref = useRef<any>(null);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      props.delay,
      withTiming(1, {
        duration: props.duration,
        easing: Easing.linear,
      }),
    );
  }, [progress, props.delay, props.duration]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value),
  }));
  return (
    <AnimatedPath
      {...props}
      animatedProps={animatedProps}
      onLayout={() => setLength(ref.current!.getTotalLength())}
      ref={ref}
      stroke="black"
      strokeWidth={12}
      strokeDasharray={length}
    />
  );
};

export default AnimatedStroke;
