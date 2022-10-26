const { launch } = require('puppeteer')
const { load } = require('cheerio')
async function getSite() {
    let url = 'https://docs.google.com/spreadsheets/d/11Nt8PLFQBuz4WkalQqWjeH_FjcgWSm8jFfKsB2a7fyU/pubhtml'
    
    const browser = await launch({
        ignoreHTTPSErrors: true,
        args: [ '--no-sandbox' ],
        headless: true
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle0'
    })
    const pageContent = await page.content()
    await browser.close()
    const $ = load(pageContent)
    const teachersName = $('.s5').text().split(', ')
    let names = []
    teachersName.forEach((name) => {
        name = name.replace('Mevr. ', '')
        oldname = name.split('. ')
        if (oldname.length > 1) {
            name = oldname[1].replace(' ', '')
        }
        names.push(name)
    })
    const firstHour = $('.s8').text()
    const secondHour = $('.s10').text()
    const thirdHour = $('.15').text()
    const myClass = 'NP4'
    if(firstHour.includes(myClass) == true) return true
    if(secondHour.includes(myClass) == true) return true
    if(thirdHour.includes(myClass) == true) return true
    return false
}


module.exports = getSite