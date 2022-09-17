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
