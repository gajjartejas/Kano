import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { ColorValue } from 'react-native';

//ThirdParty
import { ClipPath, Defs, G, Path, PathProps, Svg, Text, TextPath } from 'react-native-svg';
import { svgPathProperties } from 'svg-path-properties';
import AnimatedStroke, { AnimatedStrokeEasingFunction } from './AnimatedStroke';

//App Modules
import useSvgReader from 'app/hooks/useSvgReader';

//Interface
export interface IAnimatedCharacterProps extends PathProps {
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

const AnimatedCharacter = forwardRef<IAnimatedCharacterRef, IAnimatedCharacterProps>((props, ref) => {
  const { parsedSvg, readSvg } = useSvgReader();

  const {
    path,
    emptyStroke,
    play = true,
    duration = 0,
    initialDelay = 0,
    showArrow,
    arrowSymbol = '➤',
    arrowFontSize = 6,
    highlightGroupIndex,
    highlightStrokeIndex,
    stroke,
    highlightStroke,
    arrowFill,
    disableStrokeAnimation,
    onProgress,
    onFinish,
    easing,
  } = props;

  // We'll introduce a resetKey (number or string) in state, and pass it as a key to the AnimatedStroke components.
  // This forces them to re-mount and replay their animation when reset() is called.
  const [resetKey, setResetKey] = useState(0);

  const getPathLength = useCallback((d: string) => {
    return new svgPathProperties(d).getTotalLength();
  }, []);

  const strokeTiming: IAnimatedCharacterStrokeGroupTiming[] = useMemo(() => {
    if (!parsedSvg) {
      return [];
    }

    let durations: number[] = [];
    let counter = 0;

    const totalLength = parsedSvg.groups
      .flatMap(g => g.svgClipPaths.map(p => getPathLength(p.d)))
      .reduce((a, b) => a + b, 0);

    return parsedSvg.groups.map(g => {
      const timings = g.svgClipPaths.map(p => {
        const length = getPathLength(p.d);
        const _duration = (length * duration) / totalLength;
        const delay = durations.slice(0, counter).reduce((a, b) => a + b, 0) + initialDelay;
        durations[counter] = _duration;
        counter++;
        return { duration: _duration, delay, length };
      });
      return { timings };
    });
  }, [parsedSvg, getPathLength, duration, initialDelay]);

  useImperativeHandle(ref, () => ({
    reset: () => setResetKey(v => v + 1),
  }));

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

  if (!parsedSvg || !strokeTiming || strokeTiming.length < 1) {
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
                      key={`${p.id}-${resetKey}`}
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
                  const pl = getPathLength(p.d);
                  const tl = pl * 0.2;
                  const tr = Math.round(tl);
                  const end = new Array(tr).fill(0).map((_, i) => (i * 100) / tl);

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

export default memo(AnimatedCharacter);
