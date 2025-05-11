const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "os": false,
      "fs": false,
      "path": false,
      "util": false,
      "stream": false,
      "crypto": false,
      "http": false,
      "net": false,
      "dns": false,
      "tls": false,
      "https": false,
      "zlib": false,
      "constants": false
    }
  }
};
