const puppeteer = require('puppeteer')
let cenarios = [
    
        { //otimista
            retorno: 0.2,
            prob: 0.4
        },
        { //realista
            retorno: 0.1,
            prob: 0.5
        },
        { //pessimista
            retorno: -0.1,
            prob: 0.1
        }
        
]
function retorno_final(lista_cenarios) {
    let taxa_retorno = 0
    let variancia = 0
    for (let i = 0; i < lista_cenarios.length; i++) {
        taxa_retorno += lista_cenarios[i].retorno*lista_cenarios[i].prob

    }
    for (let i = 0; i < lista_cenarios.length; i++) {
        variancia += lista_cenarios[i].prob*(taxa_retorno - lista_cenarios[i].retorno)^2
        
    }



    
}


let scrape = async (adjetivo) => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto('https://www.google.com/search?q=mico%20leao%20dourado%20'+adjetivo + '&source=lnms&tbm=isch')
    

    const result = await page.evaluate(() => {
        let t1 = 'not found'
        let t2 = 'not found'
        
        let tt = document.querySelector('body').querySelector("div:nth-child(7) > c-wiz > div:nth-child(3) > div > div > div > div > div > div > span > div > div > div:nth-child(2) > a > div > img").src

        if(document.querySelector('.iUh30') != null){
            t1 = document.querySelector('.iUh30').innerText
        }
        if(document.querySelector('#rso > div > div > div:nth-child(1) > div > div > div.s > div > span') != null){
            t2 = document.querySelector('#rso > div > div > div:nth-child(1) > div > div > div.s > div > span').innerText
        }
        return {t1, t2, tt}
    })
    //browser.close()
    console.log(result)
    return result
}
scrape('pulando')