const { default : axios } = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

if (!fs.existsSync('../files')) {
    fs.mkdirSync('../files')
}

axios.get('https://www.efarms.com.ng/index.php').then(res => {
    const $ = cheerio.load(res.data)

    fs.writeFileSync('../files/efarms.html', res.data)
    
    const activeProducts = $('#services div.media.services-wrap')

    const productListText = activeProducts.map(function () {
        const title = $(this).find('h3.media-heading').text().trim()
        const [ address, price, returns ] = $(this).find('h4.media-heading').map(function () {
            return $(this).text().trim()
        }).toArray()
        const link = $(this).parentsUntil('a').parent().attr('href').trim()
        return `${title}\n${price}\n${link}\n${returns}\n${address}`
    }).toArray().join('\n\n')

    console.log(productListText)
})