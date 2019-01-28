#!/usr/bin/env node

const getEFarms = require('./sites/efarms')
const getFarmCrowdy = require('./sites/farm-crowdy')
const getThriveAgric = require('./sites/thrive-agric')
const pjson = require('../package.json')

if (require.main === module) {
    const program = require('commander')

    program
        .version(pjson.version)
        .command('all [env]', 'gets latest info on all', { isDefault: true })
        .command('efarms [env]', 'gets latest info on efarms')
        .command('farm-crowdy [env]', 'gets latest info on farm-crowdy')
        .command('thrive-agric [env]', 'gets latest info on thrive-agric')
        .parse(process.argv)
}

module.exports = {
    getEFarms,
    getFarmCrowdy,
    getThriveAgric
}