#!/usr/bin/env node

const getEFarms = require('./sites/efarms')
const getFarmCrowdy = require('./sites/farm-crowdy')
const getThriveAgric = require('./sites/thrive-agric')

if (require.main === module) {
    const program = require('commander')

    program
        .version('1.0.0')
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