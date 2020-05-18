const { default: axios } = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const url = require('url');
const { agroHtml } = require('../utils/create-files-dir');

module.exports = function() {
  return axios.get('https://agropartnerships.co/investments').then(res => {
    const $ = cheerio.load(res.data);

    fs.writeFileSync(agroHtml, res.data);

    const activeProducts = $('a.farm-block.demo-farm').filter(function() {
      return $(this).find('h6.light-green-text.no-padding').length === 0;
    });

    const productList = activeProducts
      .map(function() {
        const title = $(this)
          .find('h2.white-text')
          .text()
          .trim();
        const type = $(this)
          .find('h3.white-text')
          .text()
          .trim();
        const price = $(this)
          .find('h5.white-text')
          .text()
          .trim();
        const returns =
          $(this)
            .find('div.preview-yield-block.main-page > div')
            .text()
            .trim() +
          ' ' +
          $(this)
            .find('div.preview-yield-block.main-page > h5')
            .text()
            .trim();
        const link = url.resolve(
          'https://agropartnerships.co',
          $(this)
            .attr('href')
            .trim()
        );

        return { title, price, link, returns, type };
      })
      .toArray();

    return productList;
  });
};
