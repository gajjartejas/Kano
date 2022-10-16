// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

'use strict';

var copy = require('recursive-copy');

var assetsToCopy = './assets/barakhdi';
var iOSAssetDir = './ios/assets/svgs';
var androidAssetDir = './android/app/src/main/assets/svgs';

copy(
  assetsToCopy,
  iOSAssetDir,
  {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
  },
  error => {
    console.log(error);
  },
);

copy(
  assetsToCopy,
  androidAssetDir,
  {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
  },
  error => {
    console.log(error);
  },
);

/* FOR FUTURE USE
const barakhdiFolder = './assets/barakhdi';
const destFolder = './assets/barakhdi1';
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
    var files = fs.readdirSync(current_dir);

    for (let j = 0; j < files.length; j++) {
      const fileName = files[j];
      console.log('fileName', fileName);
      let newSVGString = modifySVG(current_dir + '/' + fileName);
      if (!fs.existsSync(destFolder + '/' + currentDirName)) {
        fs.mkdirSync(destFolder + '/' + currentDirName);
      }
      fs.writeFileSync(destFolder + '/' + currentDirName + '/' + fileName, newSVGString);
    }
  }
}

// getFiles(barakhdiFolder);
*/
