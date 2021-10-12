


const fs = require('fs')
const scraperObject = {
    url: 'https://www.talentschmiede.com/jobs/',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.waitForSelector('a.jobarticleteaser');
        // Get the link to all the required books
        let urls = await page.$$eval('a.jobarticleteaser', links => {
            links = links.map(el => el.getAttribute('href'));
            return links;
        });
        
        let name = await page.$$eval('a.jobarticleteaser', names => {
            names= names.map(em => em.outerText);
            return names;
        })
        const logger = fs.createWriteStream('Output.txt')
        let n = 0;
        while (name[n] != null){
            logger.write(`${name[n].replace(/\) \←/,')')}; ${urls[n]}+\n`)
            n ++;}
        logger.close()

        await browser.close();
            
    } 
}

module.exports = scraperObject;