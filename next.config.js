const withLess = require("@zeit/next-less");
const path = require('path');
const fs = require('fs');

module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        localIdentName: '[local]___[hash:base64:5]',
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
      rootDir: path.join(__dirname, "./")
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: '/public',
    },
    i18n: {
      locales: ['en', 'fr', 'nl'],
      defaultLocale: 'en',
    }
});

