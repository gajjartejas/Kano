import * as React from 'react';
import Svg, { SvgProps, G, Rect, Path, Defs, Mask, LinearGradient, Stop } from 'react-native-svg';

const SVGComponent = (props: SvgProps) => (
  <Svg height="100%" preserveAspectRatio="xMinYMin slice" width="100%" viewBox="0 0 900 675" {...props}>
    <Rect x={0} y={0} width={900} height={675} fill="#ff6573" />
    <Defs>
      <LinearGradient id="grad1_0" x1="25%" y1="0%" x2="100%" y2="100%">
        <Stop offset="23.333333333333336%" stopColor="#e73252" stopOpacity={1} />
        <Stop offset="76.66666666666666%" stopColor="#e73252" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient id="grad1_1" x1="25%" y1="0%" x2="100%" y2="100%">
        <Stop offset="23.333333333333336%" stopColor="#e73252" stopOpacity={1} />
        <Stop offset="76.66666666666666%" stopColor="#f34e62" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient id="grad1_2" x1="25%" y1="0%" x2="100%" y2="100%">
        <Stop offset="23.333333333333336%" stopColor="#ff6573" stopOpacity={1} />
        <Stop offset="76.66666666666666%" stopColor="#f34e62" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient id="grad2_0" x1="0%" y1="0%" x2="75%" y2="100%">
        <Stop offset="23.333333333333336%" stopColor="#e73252" stopOpacity={1} />
        <Stop offset="76.66666666666666%" stopColor="#e73252" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient id="grad2_1" x1="0%" y1="0%" x2="75%" y2="100%">
        <Stop offset="23.333333333333336%" stopColor="#f34e62" stopOpacity={1} />
        <Stop offset="76.66666666666666%" stopColor="#e73252" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient id="grad2_2" x1="0%" y1="0%" x2="75%" y2="100%">
        <Stop offset="23.333333333333336%" stopColor="#f34e62" stopOpacity={1} />
        <Stop offset="76.66666666666666%" stopColor="#ff6573" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <G transform="translate(900, 0)">
      <Path
        d="M0 478.1C-49.1 436.5 -98.2 394.8 -155.4 375.1C-212.6 355.4 -277.8 357.6 -329.5 329.5C-381.2 301.4 -419.2 242.9 -441.7 183C-464.2 123 -471.2 61.5 -478.1 0L0 0Z"
        fill="#f95a6b"
      />
      <Path
        d="M0 318.8C-32.7 291 -65.5 263.2 -103.6 250.1C-141.7 236.9 -185.2 238.4 -219.7 219.7C-254.1 200.9 -279.5 162 -294.5 122C-309.5 82 -314.1 41 -318.7 0L0 0Z"
        fill="#ed415a"
      />
      <Path
        d="M0 159.4C-16.4 145.5 -32.7 131.6 -51.8 125C-70.9 118.5 -92.6 119.2 -109.8 109.8C-127.1 100.5 -139.7 81 -147.2 61C-154.7 41 -157.1 20.5 -159.4 0L0 0Z"
        fill="#e73252"
      />
    </G>
    <G transform="translate(0, 675)">
      <Path
        d="M0 -478.1C64.4 -473.5 128.7 -468.9 183 -441.7C237.2 -414.6 281.3 -365 316.1 -316.1C350.9 -267.2 376.4 -219 401.9 -166.5C427.4 -113.9 452.7 -57 478.1 0L0 0Z"
        fill="#f95a6b"
      />
      <Path
        d="M0 -318.7C42.9 -315.7 85.8 -312.6 122 -294.5C158.1 -276.4 187.5 -243.3 210.7 -210.7C233.9 -178.1 250.9 -146 267.9 -111C284.9 -75.9 301.8 -38 318.8 0L0 0Z"
        fill="#ed415a"
      />
      <Path
        d="M0 -159.4C21.5 -157.8 42.9 -156.3 61 -147.2C79.1 -138.2 93.8 -121.7 105.4 -105.4C117 -89.1 125.5 -73 134 -55.5C142.5 -38 150.9 -19 159.4 0L0 0Z"
        fill="#e73252"
      />
    </G>
  </Svg>
);

export default SVGComponent;
