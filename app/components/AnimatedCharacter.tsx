import React, { useState, useRef, useCallback, useEffect } from 'react';

//App Modules
import useSvgReader from 'app/hooks/useSvgReader';

//ThirdParty
import { ClipPath, Defs, G, Path, PathProps, Svg } from 'react-native-svg';
import AnimatedStroke from './AnimatedStroke';

//Interface
interface IAnimatedCharacter extends PathProps {
  initialDelay: number;
  path: string;
  name: string;
  emptyStroke: string;
}

const AnimatedCharacter = (props: IAnimatedCharacter) => {
  const { parsedSvgPaths, readSvg } = useSvgReader();
  const [strokeDelays, setStrokeDelays] = useState<any[]>(Array(parsedSvgPaths?.svgClipPaths.length).fill(null));
  const [durations, setDurations] = useState<any[]>(Array(parsedSvgPaths?.svgClipPaths.length).fill(null));

  const strokeLengths = useRef<number[]>([]);
  const initialDelay = props.initialDelay;
  const name = props.name;
  const path = props.path;
  const emptyStroke = props.emptyStroke;

  const onLength = useCallback(
    (l: number, index: number) => {
      strokeLengths.current[index] = l * 20 + initialDelay;

      let newDelay = [...strokeDelays];
      newDelay[index] = strokeLengths.current.slice(0, index).reduce((ps, a) => ps + a, 0);
      setStrokeDelays(newDelay);

      let newDurations = [...durations];
      newDurations[index] = strokeLengths.current[index];
      setDurations(newDurations);
    },
    [initialDelay, strokeDelays, durations],
  );

  useEffect(() => {
    readSvg(name, path);
  }, [name, path, readSvg]);

  if (!parsedSvgPaths) {
    return null;
  }

  return (
    <Svg height="100%" preserveAspectRatio="xMinYMin slice" width="100%" viewBox="0 0 200 200">
      <Defs>
        <ClipPath id="path-clip">
          {parsedSvgPaths.svgPaths.map(p => {
            return <Path key={p.id} d={p.d} />;
          })}
        </ClipPath>
      </Defs>
      <G>
        {parsedSvgPaths.svgPaths.map(p => {
          return <Path key={p.id} fill={emptyStroke} d={p.d} />;
        })}
        {parsedSvgPaths.svgClipPaths.map((p, index) => {
          return (
            <AnimatedStroke
              {...props}
              key={p.id}
              d={p.d}
              clipPath="url(#path-clip)"
              onLength={(len: number) => onLength(len, index)}
              delay={strokeDelays[index]}
              velocity={durations[index]}
            />
          );
        })}
      </G>
    </Svg>
  );
};

export default AnimatedCharacter;
