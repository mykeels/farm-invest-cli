const { default : axios } = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const { farmCrowdyHtml } = require('../utils/create-files-dir')

module.exports = function () {
    return axios.get('https://www.farmcrowdy.com/farmshop').then(res => {
        const $ = cheerio.load(res.data)
    
        fs.writeFileSync(farmCrowdyHtml, res.data)
        
        const activeProducts = $('div.project').filter(function () {
            return $(this).find('div.project-image a span strong').length == 0
        })
    
        const productList = activeProducts.map(function () {
            const title = $(this).find('div.project-content h5').text().trim()
            const price = $(this).find('div.project-content span').text().trim()
            const link = $(this).find('div.project-image a').attr('href').trim()
            const returns = $(this).find('div.project-content p').text().trim()
            return { title, price, link, returns }
        }).toArray()
    
        return productList
    })
}