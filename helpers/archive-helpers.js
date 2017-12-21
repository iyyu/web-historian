var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
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
  // if (err) throw err;
  // returns an array of data.split('');
  // assumes that the callback is making the return for readListOfUrls
  var results = fs.readFileSync(exports.paths.list, 'utf8', (err, data) => {
    if (err) { throw err; }
    // return callback(data.split('\n'));
    // var results = callback(data.split('\n'));
    // // console.log('RESULTS: ', results); 
    // return results; 
    return data;
  });
  // console.log('RLO RESULTS', results.split('\n'));
  return callback(results.split('\n'));
};

exports.isUrlInList = function(url, callback) {
  // see if url is in array by using rLO
  // returns boolean
  var urlList = exports.readListOfUrls((array) => {
    return array;
  });
  return callback(urlList.indexOf(url) !== -1);
};

exports.addUrlToList = function(url, callback) {
  // if !isUrlInList
    // fs.write the URL to the sites.txt
};

exports.isUrlArchived = function(url, callback) {
// the html of the url is stored in the sites folder  
// assuming we have requested for this site before, is it here?
// we know: we will check to see if the url is in the list first using previous function 

};

exports.downloadUrls = function(urls) {
// hit up the htmlhelper 
};
