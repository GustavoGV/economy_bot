const puppeteer = require('puppeteer')

let scrape = async (adjetivo) => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()

    await page.goto('https://www.google.com/search?q=mico%20leao%20dourado%20'+adjetivo)

    const result = await page.evaluate(() => {
        let t1 = 'not found'
        let t2 = 'not found'

        if(document.querySelector('.iUh30') != null){
            t1 = document.querySelector('.iUh30').innerText
        }
        if(document.querySelector('#rso > div > div > div:nth-child(1) > div > div > div.s > div > span') != null){
            t2 = document.querySelector('#rso > div > div > div:nth-child(1) > div > div > div.s > div > span').innerText
        }
        return {t1, t2}
    })
    browser.close()
    console.log(result)
    return result
}