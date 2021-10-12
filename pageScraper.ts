


const fs = require('fs')
const scraperObject = {
    url: 'https://www.talentschmiede.com/jobs/',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.waitForSelector('a.jobarticleteaser');
        let urls = await page.$$eval('a.jobarticleteaser', links => {
            links = links.map(el => el.getAttribute('href'));
            return links;
        });
        let m = 0; 
        while (urls[m] != null){
            let newPage = await browser.newPage();
            console.log(`Navigating to ${urls[m]}`)
            await newPage.goto(urls[m])
            await newPage.waitForSelector('.jobcat');
            let name = await newPage.$$eval('h3.jobcat', names => {
                names= names.map(em => em.innerText);
                return names;
                })
            console.log(name[m]);
            await newPage.close();
            m++;
        }
        
        await page.close();
        await browser.close();
        const logger = fs.createWriteStream('Output.txt')
        let n = 0;
        while (urls[n] != null){
            logger.write(`${name[n].replace(/\) \←/,')')}; ${urls[n]}\n`)
            n ++;}
        logger.close()
        // await browser.close();
    }
    
}

module.exports = scraperObject;