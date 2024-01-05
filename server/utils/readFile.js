const fs = require('fs');

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = readFile;
