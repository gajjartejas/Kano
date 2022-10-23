// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

'use strict';

var copy = require('recursive-copy');

var sourceAssets = ['./assets/barakhadi', './assets/numbers', './assets/barakhadi', './assets/numbers'];
let destAssets = [
  './ios/assets/svgs/barakhadi',
  './ios/assets/svgs/numbers',
  './android/app/src/main/assets/svgs/barakhadi',
  './android/app/src/main/assets/svgs/numbers',
];

for (let i = 0; i < sourceAssets.length; i++) {
  const sourceAsset = sourceAssets[i];
  const destAsset = destAssets[i];
  copy(
    sourceAsset,
    destAsset,
    {
      overwrite: true,
      expand: true,
      dot: true,
      junk: true,
      debug: true,
    },
    error => {
      console.log(error);
    },
  );
}

/*// FOR FUTURE USE
const barakhadiFolder = './assets/test';
const destFolder = './assets/numbers';
const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const path = require('path');

function modifySVG(filePath) {
  const options = {
    ignoreAttributes: false,
  };

  try {
    const xmlDataStr = fs.readFileSync(path.resolve(__dirname, filePath));
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(xmlDataStr);

    let groups = jsonObj.svg.g;
    if (!Array.isArray(jsonObj.svg.g)) {
      groups = [groups];
    }
    let mappedGroups = groups.map((g, i) => {
      const gid = 'g' + i;
      return {
        ...g,
        '@_id': gid,
        '@_inkscape:label': gid,
        path: g.path.map((p, j) => {
          const pid = j === 0 ? 'p0' : `s${j - 1}`;
          const upid = gid + pid;
          return {
            ...p,
            '@_id': upid,
            '@_inkscape:label': upid,
          };
        }),
      };
    });

    jsonObj.svg.g = mappedGroups;
    const builder = new XMLBuilder(options);
    let xmlDataStr1 = builder.build(jsonObj);
    return xmlDataStr1;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function getFiles(dir) {
  var dirs = fs.readdirSync(dir).filter(v => !v.includes('.DS_Store'));
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder);
  }
  for (var i in dirs) {
    var current_dir = dir + '/' + dirs[i];
    var currentDirName = path.basename(current_dir);
    var files = fs.readdirSync(current_dir).filter(v => !v.includes('.DS_Store'));

    for (let j = 0; j < files.length; j++) {
      const fileName = files[j];
      console.log('fileName', fileName);
      let newSVGString = modifySVG(current_dir + '/' + fileName);
      if (!fs.existsSync(destFolder + '/' + currentDirName)) {
        fs.mkdirSync(destFolder + '/' + currentDirName);
      }
      fs.writeFileSync(destFolder + '/' + fileName, newSVGString);
    }
  }
}

getFiles(barakhadiFolder);
*/
