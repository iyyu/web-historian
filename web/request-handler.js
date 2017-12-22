var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var utils = require('./http-helpers');
var url = require('url');
var fetchHtml = require('../workers/htmlfetcher');
// var htmlhelp = require('../workers/htmlfetcher');
exports.handleRequest = function (req, res) {
  // if req.method === "GET"
    // check for index.html
  //call serveAssets which will either 200 or 404
  // console.log('method: ' + req.method + ' and URL: ' + req.url);
  if (req.method === 'GET') {
    // console.log('Req method registered');
    if (req.url === '/' || req.url === '/index.html') {
      // console.log('Req URL received');
      utils.serveAssets(res, '/index.html', (res, data) => {
        // console.log(data);
        res.writeHead(200, utils.headers);
        res.end(data);
      }); 
    } else {
      utils.send404(res); 
    }  
  }
  if (req.method === 'POST') {
    utils.prepareResponse(req, function(data) {
      var url = data.slice(4); 
      // check if string is on list
      // .. if not, add to list 
      archive.isUrlInList(url, (boolean) => { 
        if (boolean === false) {
          console.log('boolean', boolean);
          url = url + '\n';
          archive.addUrlToList(url, () => { 
            console.log('added ' + url + ' to list!');
            fetchHtml.htmlFetcher(archive.paths.list);
          });
          
        } else {
          archive.isUrlArchived(url, (archived) => {
            if (archived) {
              var siteFile = archive.paths.archivedSites;
              utils.serveAssets(res, url, (res, data) => {
                utils.respond(res, data);
              }, siteFile);
            }
          });
        }
      }
      );   // if the page is on the list but not archived, redirect to waiting page
    });    
  } 
  if (req.method === 'OPTIONS') {
    
  }


  // res.end(archive.paths.list);
};



//           });
