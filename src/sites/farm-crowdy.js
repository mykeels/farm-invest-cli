const { default: axios } = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { farmCrowdyHtml } = require('../utils/create-files-dir');

module.exports = function() {
  return axios.get('https://www.farmcrowdy.com/farmshop').then(res => {
    const $ = cheerio.load(res.data);

    fs.writeFileSync(farmCrowdyHtml, res.data);

    const activeProducts = $('div.row.farmshop.h-100').filter(function() {
      return $(this).find('span.sold-out').length === 0;
    });

    const productList = activeProducts
      .map(function() {
        const title = $(this)
          .find('h4')
          .text()
          .trim();
        const price = $(this)
          .find('a > p')
          .text()
          .trim();
        const link = $(this)
          .find('a')
          .attr('href')
          .trim();
        const returns = $(this)
          .find('span.duration')
          .text()
          .trim();

        return { title, price, link, returns };
      })
      .toArray();

    return productList;
  });
};
