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

const useSvgReader = () => {
  //State
  const [parsedSvgPaths, setParsedSvgPaths] = useState<IParsedSVGPaths>();
  const [error, setError] = useState<Error | null>();

  const readSvgSilently = useCallback((name: string, path: string): Promise<IParsedSVGPaths> => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        RNFS.readFile(`${RNFS.MainBundlePath}/${path}/${name}`)
          .then((res: string) => {
            let parsedSVGText = parseSvgText(res);
            resolve(parsedSVGText);
          })
          .catch((e: Error) => {
            reject(e);
          });
      } else if (Platform.OS === 'android') {
        RNFS.readFileAssets(`${path}/${name}`)
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
    (name: string, path: string) => {
      readSvgSilently(name, path)
        .then(paths => {
          setParsedSvgPaths(paths);
        })
        .catch((e: Error) => {
          setError(e);
        });
    },
    [readSvgSilently],
  );

  const parseSvgText = (text: string): IParsedSVGPaths => {
    const doc = new DOMParser().parseFromString(text, 'text/xml');
    let paths = doc.getElementsByTagName('path');
    let svgPaths: IParsedSVG[] = [];
    let svgClipPaths: IParsedSVG[] = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const attributes = path.attributes;
      let pathDicts: any = {};
      let isPath = false;
      for (let j = 0; j < attributes.length; j++) {
        const attribute = attributes[j];
        if (attribute.nodeName === 'id') {
          isPath = !!attribute.nodeValue?.includes('p');
          pathDicts[attribute.nodeName] = attribute.nodeValue;
        } else if (attribute.nodeName === 'd') {
          pathDicts[attribute.nodeName] = attribute.nodeValue;
          pathDicts[attribute.nodeName] = attribute.nodeValue;
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

  return { parsedSvgPaths, error, readSvg, readSvgSilently };
};

export default useSvgReader;
