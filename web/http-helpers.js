var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', (err, data) => {
    if (err) {
      console.log('ASSET: ', asset); 
      throw err; 
    }
    console.log(data); 
  });
  
  
};



// As you progress, keep thinking about what helper functions you can put here!
module.exports.prepareResponse = function(req, cb) {
  var data = '';
  req.on('data', function(chunk) { data += chunk; });
  req.on('end', function() { cb(data); });
};

module.exports.respond = function(res, data, status = 200) {
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
};

module.exports.send404 = function(res) {
  exports.respond(res, 'Not Found', 404);
};

module.exports.redirector = function(res, loc, status = 302) {
  res.writeHead(status, { Location: loc });
  res.end();
};