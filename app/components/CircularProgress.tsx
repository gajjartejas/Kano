import React from 'react';
import { Svg, Circle, Text as SVGText, SvgProps } from 'react-native-svg';

interface CircularProgressProps extends SvgProps {
  size: number;
  text: string;
  strokeWidth: number;
  progressPercent: number;
  bgColor: string;
  pgColor: string;
  textSize: number;
  textColor: string;
}

const CircularProgress = (props: CircularProgressProps) => {
  const { size, strokeWidth, text } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - props.progressPercent;

  return (
    <Svg style={props.style} width={size} height={size}>
      {/* Background Circle */}
      <Circle
        stroke={props.bgColor ? props.bgColor : '#f2f2f2'}
        fill={props.fill}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        {...{ strokeWidth }}
      />

      {/* Progress Circle */}
      <Circle
        stroke={props.pgColor ? props.pgColor : '#3b5998'}
        fill={props.fill}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={`${circum} ${circum}`}
        strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
        strokeLinecap="round"
        transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        {...{ strokeWidth }}
      />

      {/* Text */}
      <SVGText
        fontSize={props.textSize ? props.textSize : '10'}
        x={size / 2}
        y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
        textAnchor="middle"
        fill={props.textColor ? props.textColor : '#333333'}>
        {text}
      </SVGText>
    </Svg>
  );
};

export default CircularProgress;
