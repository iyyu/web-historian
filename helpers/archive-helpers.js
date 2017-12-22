var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var requestLib = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'), // our own static HTML page and stylesheet
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //use fs.readFile( path to the sites.txt, encoding, callback)
  // returns an array of data.split('');
  // assumes that the callback is making the return for readListOfUrls
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) { throw err; }
    return callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  // see if url is in array by using rLO
  exports.readListOfUrls((array) => {
    console.log('boolean:', array.includes(url));
    callback(array.includes(url));  
  });
};

exports.addUrlToList = function(url, callback) {
  // if !isUrlInList
    // fs.write the URL to the sites.txt 
  fs.appendFile(exports.paths.list, url, 'utf8', (err) => {
    if (err) { throw err; }
    callback(); 
  });
};

exports.isUrlArchived = function(url, callback) {
// the html of the url is stored in the sites folder  
  fs.readdir(exports.paths.archivedSites, 'utf8', (err, files) => {
    if (err) { throw err; }
    callback(files.includes(url));
  });
};

exports.downloadUrls = function(urls) {
  // takes in array of urls that need to be archived
  // to be used in htmlfetcher
  // ['www.example.com', 'www.google.com']
  for (let i = 0; i < urls.length; i++) {
    let modifiedUrl = 'http://' + urls[i];
    console.log('urls[i]', urls[i]);
    console.log('modifiedUrl', modifiedUrl);
    requestLib(modifiedUrl, function (err, response, body) {
      if (err) { 
        throw err; 
      } 
      if (response.statusCode === 200) {
        fs.writeFile(exports.paths.archivedSites + '/' + urls[i], body, 'utf8', () => { console.log('downloaded ' + urls[i]); }); 
      }
    }); 
  }
};

