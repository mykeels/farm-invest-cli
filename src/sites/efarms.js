const { default: axios } = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const { eFarmsHtml } = require('../utils/create-files-dir');

module.exports = function() {
  return axios.get('https://www.efarms.com.ng/index.php/en/farms').then(res => {
    const $ = cheerio.load(res.data);

    fs.writeFileSync(eFarmsHtml, res.data);

    const activeProducts = $('section.causes div.grid');

    const productList = activeProducts
      .map(function() {
        const title = $(this)
          .find('h3 a')
          .text()
          .trim();
        const price = $(this)
          .find('div.raised > h4 > span')
          .text()
          .trim();
        const returns = $(this)
          .find('div.goal > h4 > span')
          .text()
          .trim();
        const daysLeft = $(this)
          .find('span.remaining-days')
          .text()
          .trim();
        const link = $(this)
          .find('h3 a')
          .attr('href')
          .trim();
        return { title, price, link, returns, daysLeft, farm: 'efarms' };
      })
      .toArray()
      .filter(({ daysLeft }) => daysLeft && !daysLeft.endsWith('ago'));

    console.table(productList);

    return productList;
  });
};
