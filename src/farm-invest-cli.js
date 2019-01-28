#!/usr/bin/env node

const getEFarms = require('./sites/efarms')
const getFarmCrowdy = require('./sites/farm-crowdy')
const getThriveAgric = require('./sites/thrive-agric')
const pjson = require('../package.json')

if (require.main === module) {
    const program = require('commander')

    program
        .version(pjson.version)
        .command('all [env]', 'shows latest info on efarms, farm-crowdy abd thrive-agric', { isDefault: true })
        .command('efarms [env]', 'shows latest info on efarms')
        .command('farm-crowdy [env]', 'shows latest info on farm-crowdy')
        .command('thrive-agric [env]', 'shows latest info on thrive-agric')
        .parse(process.argv)
}

module.exports = {
    getEFarms,
    getFarmCrowdy,
    getThriveAgric
}