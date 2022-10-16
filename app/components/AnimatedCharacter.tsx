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
  duration: number;
  path: string;
  emptyStroke: string;
  play: boolean;
}

interface IAnimatedCharacterStrokeTiming {
  delay: number;
  duration: number;
  length: number;
}

interface IAnimatedCharacterStrokeGroupTiming {
  timings: IAnimatedCharacterStrokeTiming[];
}

const AnimatedCharacter = (props: IAnimatedCharacter) => {
  const { parsedSvg, readSvg } = useSvgReader();
  const [strokeTiming, setStrokeTiming] = useState<IAnimatedCharacterStrokeGroupTiming[]>([]);

  const initialDelay = props.initialDelay;
  const path = props.path;
  const emptyStroke = props.emptyStroke;
  const play = props.play;
  const duration = props.duration;

  useEffect(() => {
    if (!parsedSvg) {
      return;
    }
    let durations: number[] = [];
    let counter = 0;
    let timings = parsedSvg.groups.map(g => {
      let res = g.svgClipPaths.map(p => {
        const properties = new svgPathProperties(p.d);
        const l = properties.getTotalLength();
        const _duration = duration + initialDelay;
        const delay = durations.slice(0, counter).reduce((ps, a) => ps + a, 0);
        durations[counter] = _duration;
        counter += 1;
        return {
          duration: _duration,
          delay: delay,
          length: l,
        };
      });
      return { timings: res };
    });

    setStrokeTiming(timings);
  }, [initialDelay, parsedSvg, duration]);

  useEffect(() => {
    readSvg(path);
  }, [path, readSvg]);

  if (!parsedSvg || strokeTiming.length < 1) {
    return null;
  }

  console.log('parsedSvg', JSON.stringify(parsedSvg));
  return (
    <Svg
      height="100%"
      preserveAspectRatio="xMidYMid"
      width="100%"
      viewBox={`0 0 ${parsedSvg?.width} ${parsedSvg?.height}`}>
      <Defs>
        {parsedSvg?.groups.map(g => {
          return (
            <ClipPath key={g.id} id={`path-clip${g.id}`}>
              {g.svgPaths.map(p => {
                return <Path key={p.id} d={p.d} />;
              })}
            </ClipPath>
          );
        })}
      </Defs>

      {parsedSvg?.groups.map((g, groupIndex) => {
        let otherSVGProps = g.transform ? { transform: g.transform } : null;
        return (
          <G key={g.id} id={g.id} {...otherSVGProps}>
            {g.svgPaths.map(p => {
              return <Path key={p.id} fill={emptyStroke} d={p.d} />;
            })}
            {play &&
              g.svgClipPaths.map((p, index) => {
                return (
                  <AnimatedStroke
                    {...props}
                    key={p.id}
                    d={p.d}
                    clipPath={`url(#path-clip${g.id})`}
                    delay={strokeTiming[groupIndex].timings[index].delay}
                    duration={strokeTiming[groupIndex].timings[index].duration}
                    length={strokeTiming[groupIndex].timings[index].length}
                  />
                );
              })}
          </G>
        );
      })}
    </Svg>
  );
};

export default AnimatedCharacter;
