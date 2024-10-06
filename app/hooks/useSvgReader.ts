import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

//Third Party
import { DOMParser } from '@xmldom/xmldom';
import { svgPathProperties } from 'svg-path-properties';
import RNFS from 'react-native-fs';
import crashlytics from '@react-native-firebase/crashlytics';

//Interface
interface IParsedSVG {
  id: string;
  width?: string | null;
  height?: string | null;
  groups: IParsedSVGGroup[];
  totalLength: number;
}

interface IParsedSVGPath {
  id: string;
  d: string;
}

interface IParsedSVGGroup {
  id: string;
  transform: string | null | undefined;
  svgPaths: IParsedSVGPath[];
  svgClipPaths: IParsedSVGPath[];
}

interface IParsedSVGGroup {
  id: string;
  transform: string | null | undefined;
  svgPaths: IParsedSVGPath[];
  svgClipPaths: IParsedSVGPath[];
}

const useSvgReader = () => {
  //State
  const [parsedSvg, setParsedSvg] = useState<IParsedSVG>();
  const [error, setError] = useState<Error | null>();

  const parseSvgText = useCallback((text: string): IParsedSVG => {
    const doc = new DOMParser().parseFromString(text, 'text/xml');
    const groups = doc.getElementsByTagName('g');

    const svgProps = doc.getElementsByTagName('svg');
    let totalLength = 0;
    let svgGroups: IParsedSVGGroup[] = [];

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];

      let svgPaths: IParsedSVGPath[] = [];
      let svgClipPaths: IParsedSVGPath[] = [];

      const paths = group.getElementsByTagName('path');

      for (let j = 0; j < paths.length; j++) {
        const path = paths[j];
        const attributes = path.attributes;
        let pathDicts: any = {};
        let isPath = false;
        for (let k = 0; k < attributes.length; k++) {
          const attribute = attributes[k];
          if (attribute.nodeName === 'inkscape:label') {
            isPath = !!attribute.nodeValue?.includes('p');
            pathDicts.id = attribute.nodeValue;
            if (isPath) {
              const properties = new svgPathProperties(pathDicts.d);
              totalLength = totalLength + properties.getTotalLength();
            }
          } else if (attribute.nodeName === 'd') {
            pathDicts.d = attribute.nodeValue;
          }
        }
        if (isPath) {
          svgPaths.push(pathDicts);
        } else {
          svgClipPaths.push(pathDicts);
        }
      }
      const svgGroup: IParsedSVGGroup = {
        id: group.getAttribute('id')!,
        transform: group.getAttribute('transform'),
        svgPaths: svgPaths,
        svgClipPaths: svgClipPaths,
      };
      svgGroups.push(svgGroup);
    }

    return {
      id: svgProps[0].getAttribute('id')!,
      width: svgProps[0].getAttribute('width'),
      height: svgProps[0].getAttribute('height'),
      groups: svgGroups,
      totalLength: totalLength,
    };
  }, []);

  const readSvgSilently = useCallback(
    (path: string): Promise<IParsedSVG> => {
      return new Promise((resolve, reject) => {
        if (Platform.OS === 'ios') {
          RNFS.readFile(`${RNFS.MainBundlePath}/${path}`)
            .then((res: string) => {
              let parsedSVGText = parseSvgText(res);
              resolve(parsedSVGText);
            })
            .catch((e: Error) => {
              crashlytics().recordError(e, 'useSvgReader.ts->readSvgSilently');
              reject(e);
            });
        } else if (Platform.OS === 'android') {
          RNFS.readFileAssets(`${path}`)
            .then((res: string) => {
              let parsedSVGText = parseSvgText(res);
              resolve(parsedSVGText);
            })
            .catch((e: Error) => {
              crashlytics().recordError(e, 'useSvgReader.ts->readSvgSilently');
              reject(e);
            });
        }
      });
    },
    [parseSvgText],
  );

  const readSvg = useCallback(
    (path: string) => {
      readSvgSilently(path)
        .then(svg => {
          setParsedSvg(svg);
        })
        .catch((e: Error) => {
          crashlytics().recordError(e, 'useSvgReader.ts->readSvg');
          console.log('readSvg Error:', e);
          setError(e);
        });
    },
    [readSvgSilently],
  );

  return { parsedSvg, error, readSvg, readSvgSilently, parseSvgText };
};

export default useSvgReader;
