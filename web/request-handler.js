var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var utils = require('./http-helpers');
var url = require('url');

exports.handleRequest = function (req, res) {
  // if req.method === "GET"
    // check for index.html
  //call serveAssets which will either 200 or 404
  console.log('method: ' + req.method + ' and URL: ' + req.url);
  if (req.method === 'GET') {
    // console.log('Req method registered');
    if (req.url === '/' || req.url === '/index.html') {
      // console.log('Req URL received');
      utils.serveAssets(res, '/index.html', (res, data) => {
        // console.log(data);
        res.writeHead(200, utils.headers);
        res.end(data);
      }); 
    } 
  } 


  // res.end(archive.paths.list);
};


// else {
//       console.log('yo so 404 or nah');
//       utils.send404(res); 
//     } 