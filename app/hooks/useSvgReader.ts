import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

//Third Party
import { DOMParser } from '@xmldom/xmldom';
var RNFS = require('react-native-fs');

//Interface
interface IParsedSVG {
  id: string;
  width?: string | null;
  height?: string | null;
  groups: IParsedSVGGroup[];
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

  const readSvgSilently = useCallback((path: string): Promise<IParsedSVG> => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        RNFS.readFile(`${RNFS.MainBundlePath}/${path}`)
          .then((res: string) => {
            let parsedSVGText = parseSvgText(res);
            resolve(parsedSVGText);
          })
          .catch((e: Error) => {
            reject(e);
          });
      } else if (Platform.OS === 'android') {
        RNFS.readFileAssets(`${path}`)
          .then((res: string) => {
            let parsedSVGText = parseSvgText(res);
            resolve(parsedSVGText);
          })
          .catch((e: Error) => {
            reject(e);
          });
      }
    });
  }, []);

  const readSvg = useCallback(
    (path: string) => {
      readSvgSilently(path)
        .then(svg => {
          setParsedSvg(svg);
        })
        .catch((e: Error) => {
          console.log('readSvg', e);
          setError(e);
        });
    },
    [readSvgSilently],
  );

  const parseSvgText = (text: string): IParsedSVG => {
    const doc = new DOMParser().parseFromString(text, 'text/xml');
    const groups = doc.getElementsByTagName('g');

    const svgProps = doc.getElementsByTagName('svg');

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
          } else if (attribute.nodeName === 'd') {
            pathDicts.d = attribute.nodeValue;
            pathDicts.d = attribute.nodeValue;
          }
        }
        if (isPath) {
          svgPaths.push(pathDicts);
        } else {
          svgClipPaths.push(pathDicts);
        }
      }
      let svgGroup: IParsedSVGGroup = {
        id: group.getAttribute('id')!,
        transform: group.getAttribute('transform'),
        svgPaths: svgPaths,
        svgClipPaths: svgClipPaths,
      };
      svgGroups.push(svgGroup);
    }

    let parsedSVG = {
      id: svgProps[0].getAttribute('id')!,
      width: svgProps[0].getAttribute('width'),
      height: svgProps[0].getAttribute('height'),
      groups: svgGroups,
    };

    return parsedSVG;
  };
  return { parsedSvg, error, readSvg, readSvgSilently };
};

export default useSvgReader;
