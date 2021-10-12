


const fs = require('fs')
const scraperObject = {
    url: 'https://www.talentschmiede.com/jobs/',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        let scrapedData = [];
        async function scrapeCurrentPage(){
        await page.waitForSelector('a.jobarticleteaser');
        let urls = await page.$$eval('a.jobarticleteaser', links => {
            links = links.map(el => el.getAttribute('href'));
            return links;
        });
        
        let name = await page.$$eval('a.jobarticleteaser', names => {
            names= names.map(em => em.outerText);
            return names;
        })
        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            await newPage.close()
        }); 
        const logger = fs.createWriteStream('Output.txt')
        let n = 0;
        while (name[n] != null){
            logger.write(`${name[n].replace(/\) \←/,')')}; ${urls[n]}+\n`)
            n ++;}
        logger.close()
        await browser.close();
        }
        let data = await scrapeCurrentPage();
        return data;
    }
}

module.exports = scraperObject;