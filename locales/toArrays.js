'use strict';

const path     = require('path'),
      fs       = require('fs'),
      async    = require('async'),
      axios    = require('axios'),
      fileName = path.basename(__filename),
      rawDir   = `${__dirname}/raw`,
      cleanDir = `${__dirname}/arrays`;


class toArray {
  constructor() {
    fs.mkdir('arrays', () => {
      this.start();
    });
  }

  start() {
    async.waterfall([
      //Search
      (callback) => {
        console.log('Searching for files');
        fs.readdir(rawDir, (err, files) => {
          files = files.filter((file) => {
            return file !== fileName;
          });
          callback(null, files);
        });
      },

      //Read & Write
      (files, callback) => {
        let count = 0;
        files.forEach((file) => {
          fs.readFile(`${rawDir}/${file}`, 'utf8', (err, data) => {
            count++;

            if(file.split('-').length <= 1) {
              try {
                data = data.split('\n').filter((word) => { return word.length > 0; });
                count--;
                fs.writeFile(`${cleanDir}/${file}.json`, JSON.stringify(data), 'utf8', () => {
                  console.log('Writing to file', file);
                  count++;
                });
              } catch(err) {
                console.log('--> Couldnt read file', '' + __filename + file);
              }
            }

            if(count >= files.length) {
              callback(null, count);
            }
          });
        });
      }
    ], (results) => {
      console.log('Update done');
    });
  }
};

new toArray();
