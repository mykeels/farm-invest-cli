# Farm Invest CLI

A CLI tool, built to detect updates to the products on:

- [AgroPartnerships](https://agropartnerships.co)
- [EFarms](https://www.efarms.com.ng)
- [ThriveAgric](https://www.thriveagric.com)
- [FarmCrowdy](https://www.farmcrowdy.com)

## Installation

with npm

```sh
npm i -g farm-invest-cli
```

with yarn

```sh
yarn add global farm-invest-cli
```

for developers

```sh
git clone https://github.com/mykeels/farm-invest-cli
cd farm-invest-cli
npm install
npm link
```

## Usage as a CLI tool

```sh
farm-invest-cli
farm-invest-cli agro # only agro-partnerships
farm-invest-cli efarms # only efarms
farm-invest-cli farm-crowdy # only farm-crowdy
farm-invest-cli thrive-agric # only thrive-agric
```

You'll get an output like:

![farm-invest-cli output](https://user-images.githubusercontent.com/11996508/51835933-238da100-22ff-11e9-8dfc-1086b0db4d52.png)

Where the green text shows new products, and text is only shown when there is a difference between the products currently existing and the last time it checked.

## Usage in Node environment

```js
const { syncAll, syncAgro, syncEFarms, syncFarmCrowdy, syncThriveAgric } = require('farm-invest-cli')

syncAll().then(diff => {
    console.log(diff) // an array of (array | fast-array-diff) objects for all sources
})

syncAgro().then(diff => {
    console.log(diff) // an (array | fast-array-diff) object for Agro-Partnerships
})

syncEFarms().then(diff => {
    console.log(diff) // an (array | fast-array-diff) object for eFarms
})

syncFarmCrowdy().then(diff => {
    console.log(diff) // an (array | fast-array-diff) object for Farm-Crowdy
})

syncThriveAgric().then(diff => {
    console.log(diff) // an (array | fast-array-diff) object for Thrive-Agric
})
```

NB: A fast-array-diff object looks like:

```js
{
   removed:[
       { title: 'Foo', link: 'Bar' },
       { title: 'Bar', link: 'Foo' }
   ],
   added: [ { title: 'Baz', link: 'Foo' } ]
}
```

```js
const { getAgro, getEFarms, getFarmCrowdy, getThriveAgric } = require('farm-invest-cli')

getAgro().then(productList => {
    console.log(productList) // an array of active products on Agro-Partnerships
})

getEFarms().then(productList => {
    console.log(productList) // an array of active products on eFarms
})

getFarmCrowdy().then(productList => {
    console.log(productList) // an array of active products on Farm-Crowdy
})

getThriveAgric().then(productList => {
    console.log(productList) // an array of active products on Thrive-Agric
})
```