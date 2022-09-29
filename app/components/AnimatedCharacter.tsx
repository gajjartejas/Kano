import React, { useState, useEffect } from 'react';

//App Modules
import useSvgReader from 'app/hooks/useSvgReader';

//ThirdParty
import { ClipPath, Defs, G, Path, PathProps, Svg } from 'react-native-svg';
import { svgPathProperties } from 'svg-path-properties';
import AnimatedStroke from './AnimatedStroke';

//Interface
interface IAnimatedCharacter extends PathProps {
  initialDelay: number;
  path: string;
  emptyStroke: string;
  play: boolean;
}

interface IAnimatedCharacterStrokeTiming {
  delay: number;
  duration: number;
  length: number;
}

const AnimatedCharacter = (props: IAnimatedCharacter) => {
  const { parsedSvgPaths, readSvg, svgAttributes } = useSvgReader();
  const [strokeTiming, setStrokeTiming] = useState<IAnimatedCharacterStrokeTiming[]>([]);

  const initialDelay = props.initialDelay;
  const path = props.path;
  const emptyStroke = props.emptyStroke;
  const play = props.play;

  useEffect(() => {
    if (!parsedSvgPaths) {
      return;
    }
    let durations: number[] = [];
    let res = parsedSvgPaths.svgClipPaths.map((p, index) => {
      const properties = new svgPathProperties(p.d);
      const l = properties.getTotalLength();
      const duration = l * 40 + initialDelay;
      const delay = durations.slice(0, index).reduce((ps, a) => ps + a, 0);

      durations[index] = duration;
      return {
        duration: duration,
        delay: delay,
        length: l,
      };
    });

    setStrokeTiming(res);
  }, [initialDelay, parsedSvgPaths]);

  useEffect(() => {
    readSvg(path);
  }, [path, readSvg]);

  if (!parsedSvgPaths || strokeTiming.length < 1) {
    return null;
  }

  return (
    <Svg
      height="100%"
      preserveAspectRatio="xMidYMid"
      width="100%"
      viewBox={`0 0 ${svgAttributes?.width} ${svgAttributes?.height}`}>
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
        {play &&
          parsedSvgPaths.svgClipPaths.map((p, index) => {
            return (
              <AnimatedStroke
                {...props}
                key={p.id}
                d={p.d}
                clipPath="url(#path-clip)"
                delay={strokeTiming[index].delay}
                duration={strokeTiming[index].duration}
                length={strokeTiming[index].length}
              />
            );
          })}
      </G>
    </Svg>
  );
};

export default AnimatedCharacter;
