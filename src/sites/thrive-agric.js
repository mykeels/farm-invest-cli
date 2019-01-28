const { default : axios } = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const { thriveAgricHtml } = require('../utils/create-files-dir')

module.exports = function () {
    return axios.get('https://www.thriveagric.com/shop').then(res => {
        const $ = cheerio.load(res.data)
    
        fs.writeFileSync(thriveAgricHtml, res.data)
        
        const activeProducts = $('li.product.type-product').filter(function () {
            return $(this).find('span.out-of-stock-button').length == 0
        })
    
        const productListText = activeProducts.map(function () {
            const title = $(this).find('h6[itemprop="name"]').text().trim()
            const price = $(this).find('span.woocommerce-Price-amount.amount').text().trim()
            const link = $(this).find('a.product-category.product-info').attr('href').trim()
            return `${title}\n${price}\n${link}`
        }).toArray().join('\n\n')
    
        return productListText
    })
}