import React, { useEffect, useRef, useState } from 'react';

//ThirdParty
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

//Interface
interface AnimatedStrokeProps extends PathProps {
  delay: number;
  velocity: number;
  onLength: (length: number) => void;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = (props: AnimatedStrokeProps) => {
  let { onLength } = props;
  const [length, setLength] = useState(0);
  const ref = useRef<any>(null);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!length || props.delay === null || props.velocity === null) {
      return;
    }
    progress.value = withDelay(
      props.delay,
      withTiming(1, {
        duration: props.velocity,
        easing: Easing.linear,
      }),
    );
  }, [progress, props.delay, props.velocity, length]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value),
  }));

  return (
    <AnimatedPath
      {...props}
      animatedProps={animatedProps}
      //@ts-ignore
      onLayout={() => {
        setLength(ref.current!.getTotalLength());
        onLength(ref.current!.getTotalLength());
      }}
      ref={ref}
      strokeDasharray={length}
    />
  );
};

export default AnimatedStroke;
