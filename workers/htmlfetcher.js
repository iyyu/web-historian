// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// cron will make this happen every minute
// need to set up log file to indicate start/finish
var helpers = require('./helpers/archive-helpers');
// we need list 
// we need to check urls in list using read 
// iterate over urls to check if archive or nah 
// .. if nah, then go do that fetching thing with downloadUrls 
// and its coo 
var htmlFetcher = function(sitestxt) {
  var sites = helpers.readListOfUrls((array) => array); 
  // returns array of site URL strings
  var newUrls = [];
  sites.forEach((site) => {
    if (!helpers.isUrlArchived(site, () => {
      console.log('stuff'); 
    })) {
      newUrls.push(site); 
    }
  });
  
  helpers.downloadUrls(newUrls);
  
  
};  
