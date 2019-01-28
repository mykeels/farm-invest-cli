const { default : axios } = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

if (!fs.existsSync('../files')) {
    fs.mkdirSync('../files')
}

axios.get('https://www.farmcrowdy.com/farmshop').then(res => {
    const $ = cheerio.load(res.data)

    fs.writeFileSync('../files/farm-crowdy.html', res.data)
    
    const activeProducts = $('div.project').filter(function () {
        return $(this).find('div.project-image a span strong').length == 0
    })

    const productListText = activeProducts.map(function () {
        const title = $(this).find('div.project-content h5').text().trim()
        const price = $(this).find('div.project-content span').text().trim()
        const link = $(this).find('div.project-image a').attr('href').trim()
        const returns = $(this).find('div.project-content p').text().trim()
        return `${title}\n${price}\n${link}\n${returns}`
    }).toArray().join('\n\n')

    console.log(productListText)
})