// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// cron will make this happen every minute
// need to set up log file to indicate start/finish
var helpers = require('../helpers/archive-helpers');
// we need list 
// we need to check urls in list using read 
// iterate over urls to check if archive or nah 
// .. if nah, then go do that fetching thing with downloadUrls 
exports.htmlFetcher = function(sitestxt) {
  helpers.readListOfUrls((array) => {
    var sites = array; 
    console.log('sites', sites);
    sites.forEach((site) => {
      if (site !== '') {
        helpers.isUrlArchived(site, (archived) => {
          if (archived === false) {
            helpers.downloadUrls([site]);
            // this is probably not time-efficient because it goes to fetch for URLs on an individual basis
          }
        });
      } else {
        // this means the site is an empty string
        sites.splice(sites.indexOf(site), 1); 
      }
    });
  }); 
};  
