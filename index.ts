const browserObject = require('./browser.ts');
const scraperController = require('./pageController.ts');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)