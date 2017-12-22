module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{css,html,scss,js,png,woff}",
  ],
  "swSrc": "./src/sw.js",
  "swDest": "./dist/ess-SW.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
