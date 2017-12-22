var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var utils = require('./http-helpers');
var url = require('url');
var fetchHtml = require('../workers/htmlfetcher');

exports.handleRequest = function (req, res) {
  // check for index.html
  //call serveAssets which will either 200 or 404
  if (req.method === 'GET') {
    if (req.url === '/' || req.url === '/index.html') {
      utils.serveAssets(res, '/index.html', (res, data) => {
        utils.respond(res, data);
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
      archive.isUrlInList(url, (inList) => {
        if (inList === false) {
          url = url + '\n';
          archive.addUrlToList(url, () => { 
            console.log('added ' + url + ' to list!');
            fetchHtml.htmlFetcher(archive.paths.list);
          });
        
          utils.redirectToLoading(res, data);
        
        } else {
          // site is inList
          archive.isUrlArchived(url, (archived) => {
            if (archived) {
              var siteFile = archive.paths.archivedSites;
              utils.serveAssets(res, url, (res, data) => {
                utils.respond(res, data);
              }, siteFile);
            } else {
              // inList but !archived
              utils.redirectToLoading(res, data);
            }
          });
        }
      });
    });    
  } 
  if (req.method === 'OPTIONS') {
    
  }
};