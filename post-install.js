// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

'use strict';

var gentlyCopy = require('gently-copy');

var assetsToCopy = ['assets/barakhdi'];

var iOSAssetDir = 'ios/assets/svgs';
var androidAssetDir = 'android/app/src/main/assets/svgs';

gentlyCopy(assetsToCopy, iOSAssetDir);
gentlyCopy(assetsToCopy, androidAssetDir);
