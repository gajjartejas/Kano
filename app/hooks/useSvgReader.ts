import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

//Third Party
import { DOMParser } from '@xmldom/xmldom';
var RNFS = require('react-native-fs');

//Interface
interface IParsedSVG {
  id: string;
  d: string;
}

interface IParsedSVGPaths {
  svgPaths: IParsedSVG[];
  svgClipPaths: IParsedSVG[];
}

interface ISVGAttributes {
  width?: string | null;
  height?: string | null;
}

const useSvgReader = () => {
  //State
  const [parsedSvgPaths, setParsedSvgPaths] = useState<IParsedSVGPaths>();
  const [error, setError] = useState<Error | null>();
  const [svgAttributes, setSVGattributes] = useState<ISVGAttributes>();

  const readSvgSilently = useCallback((path: string): Promise<IParsedSVGPaths> => {
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
        .then(paths => {
          setParsedSvgPaths(paths);
        })
        .catch((e: Error) => {
          console.log('readSvg', e);
          setError(e);
        });
    },
    [readSvgSilently],
  );

  const parseSvgText = (text: string): IParsedSVGPaths => {
    const doc = new DOMParser().parseFromString(text, 'text/xml');
    let paths = doc.getElementsByTagName('path');
    let svgProps = doc.getElementsByTagName('svg');

    let _svgAttributes = {
      width: svgProps[0].getAttribute('width'),
      height: svgProps[0].getAttribute('height'),
    };
    setSVGattributes(_svgAttributes);

    let svgPaths: IParsedSVG[] = [];
    let svgClipPaths: IParsedSVG[] = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const attributes = path.attributes;
      let pathDicts: any = {};
      let isPath = false;
      for (let j = 0; j < attributes.length; j++) {
        const attribute = attributes[j];
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

    return {
      svgPaths,
      svgClipPaths,
    };
  };

  return { parsedSvgPaths, error, readSvg, readSvgSilently, svgAttributes };
};

export default useSvgReader;
