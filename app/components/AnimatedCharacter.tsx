import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

//App Modules
import useSvgReader from 'app/hooks/useSvgReader';

//ThirdParty
import { ClipPath, Defs, G, Path, PathProps, Svg, Text, TextPath } from 'react-native-svg';
import { svgPathProperties } from 'svg-path-properties';
import AnimatedStroke, { AnimatedStrokeEasingFunction } from './AnimatedStroke';
import { ColorValue } from 'react-native';

//Interface
interface IAnimatedCharacter extends PathProps {
  /**
   * Initial delay in ms
   */
  initialDelay?: number;
  /**
   * Delay in ms
   */
  duration?: number;
  path: string;
  emptyStroke: string;
  play?: boolean;
  /**
   * Callback function
   *
   * progress range will be 0 to 1
   */
  onProgress?: (progress: number) => void;
  /**
   * Callback function
   *
   * Called when animation finished
   */
  onFinish?: () => void;

  showArrow?: boolean;

  highlightStrokeIndex?: number;
  highlightGroupIndex?: number;
  highlightStroke?: ColorValue;
  arrowFill?: ColorValue;
  disableStrokeAnimation?: boolean;
  arrowSymbol?: string;
  arrowFontSize?: number;
  easing?: AnimatedStrokeEasingFunction;
}

interface IAnimatedCharacterStrokeTiming {
  delay: number;
  duration: number;
  length: number;
}

interface IAnimatedCharacterStrokeGroupTiming {
  timings: IAnimatedCharacterStrokeTiming[];
}

export interface IAnimatedCharacterRef extends PathProps {
  reset: () => void;
}

const AnimatedCharacter = forwardRef<IAnimatedCharacterRef, IAnimatedCharacter>((props, ref) => {
  const { parsedSvg, readSvg } = useSvgReader();
  const [strokeTiming, setStrokeTiming] = useState<IAnimatedCharacterStrokeGroupTiming[]>([]);

  const initialDelay = props.initialDelay === undefined ? 0 : props.initialDelay;
  const path = props.path;
  const emptyStroke = props.emptyStroke;
  const play = props.play === undefined ? true : props.play;
  const duration = props.duration === undefined ? 0 : props.duration;
  const showArrow = props.showArrow;
  const arrowSymbol = props.arrowSymbol === undefined ? '➤' : props.arrowSymbol;
  const arrowFontSize = props.arrowFontSize === undefined ? 6 : props.arrowFontSize;
  const highlightGroupIndex = props.highlightGroupIndex;
  const highlightStrokeIndex = props.highlightStrokeIndex;
  const stroke = props.stroke;
  const highlightStroke = props.highlightStroke;
  const arrowFill = props.arrowFill;
  const disableStrokeAnimation = props.disableStrokeAnimation;
  const onProgress = props.onProgress;
  const onFinish = props.onFinish;
  const easing = props.easing;

  useImperativeHandle(ref, () => ({
    reset: () => {
      let oldTimings = [...strokeTiming];
      setStrokeTiming([]);
      setTimeout(() => {
        setStrokeTiming(oldTimings);
      }, 1);
    },
  }));

  useEffect(() => {
    if (!parsedSvg) {
      return;
    }
    let durations: number[] = [];
    let counter = 0;

    let totalLength = parsedSvg.groups
      .map(g => {
        return g.svgClipPaths
          .map(p => {
            const properties = new svgPathProperties(p.d);
            return properties.getTotalLength();
          })
          .reduce((ps, a) => ps + a, 0);
      })
      .reduce((ps, a) => ps + a, 0);

    let timings = parsedSvg.groups.map(g => {
      let res = g.svgClipPaths.map(p => {
        const properties = new svgPathProperties(p.d);
        const l = properties.getTotalLength();
        const _duration = (l * duration) / totalLength;
        const delay = durations.slice(0, counter).reduce((ps, a) => ps + a, 0) + initialDelay;
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

  const onFinishAnimation = useCallback(
    (index: number, length: number) => {
      if (onProgress && typeof onProgress === 'function') {
        onProgress(index / length);
      }
      if (onFinish && typeof onFinish === 'function' && index === length) {
        onFinish();
      }
    },
    [onProgress, onFinish],
  );

  if (!parsedSvg) {
    return null;
  }

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

      {strokeTiming.length > 0 &&
        parsedSvg?.groups.map((g, groupIndex) => {
          let otherSVGProps = g.transform ? { transform: g.transform } : null;
          return (
            <G key={g.id} id={g.id} {...otherSVGProps}>
              {g.svgPaths.map(p => {
                return <Path key={p.id} fill={emptyStroke} d={p.d} />;
              })}
              {!disableStrokeAnimation &&
                play &&
                g.svgClipPaths.map((p, index) => {
                  return (
                    <AnimatedStroke
                      {...props}
                      id={p.id}
                      key={p.id}
                      onFinish={() => {
                        onFinishAnimation(index, g.svgClipPaths.length);
                      }}
                      d={p.d}
                      clipPath={`url(#path-clip${g.id})`}
                      delay={strokeTiming[groupIndex].timings[index].delay}
                      duration={strokeTiming[groupIndex].timings[index].duration}
                      length={strokeTiming[groupIndex].timings[index].length}
                      fill={'transparent'}
                      stroke={
                        highlightGroupIndex === groupIndex && highlightStrokeIndex === index ? highlightStroke : stroke
                      }
                      easing={easing}
                    />
                  );
                })}
              {disableStrokeAnimation &&
                play &&
                g.svgClipPaths.map((p, index) => {
                  return (
                    <Path
                      {...props}
                      id={p.id}
                      key={p.id}
                      d={p.d}
                      clipPath={`url(#path-clip${g.id})`}
                      fill={'transparent'}
                      stroke={
                        highlightGroupIndex === groupIndex && highlightStrokeIndex === index ? highlightStroke : stroke
                      }
                    />
                  );
                })}
              {showArrow &&
                g.svgClipPaths.map(p => {
                  const properties = new svgPathProperties(p.d);
                  let tl = properties.getTotalLength() * 0.2;
                  let tr = Math.round(tl);
                  let end = new Array(tr).fill(0).map((_, i) => (i * 100) / tl);

                  return (
                    <Text fill={arrowFill} alignmentBaseline={'middle'} key={p.id} fontSize={arrowFontSize}>
                      {end.map(v => {
                        return (
                          <TextPath key={v.toString()} href={`#${p.id}`} startOffset={`${v}%`}>
                            {arrowSymbol}
                          </TextPath>
                        );
                      })}
                    </Text>
                  );
                })}
            </G>
          );
        })}
    </Svg>
  );
});
AnimatedCharacter.displayName = 'AnimatedCharacter';
export default AnimatedCharacter;
