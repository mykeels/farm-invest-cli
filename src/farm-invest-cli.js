#!/usr/bin/env node

const getAgro = require('./sites/agro')
const getEFarms = require('./sites/efarms')
const getFarmCrowdy = require('./sites/farm-crowdy')
const getThriveAgric = require('./sites/thrive-agric')
const syncAll = require('./farm-invest-cli-all')
const syncAgro = require('./farm-invest-cli-agro')
const syncEFarms = require('./farm-invest-cli-efarms')
const syncFarmCrowdy = require('./farm-invest-cli-farm-crowdy')
const syncThriveAgric = require('./farm-invest-cli-thrive-agric')
const pjson = require('../package.json')

if (require.main === module) {
    const program = require('commander')

    program
        .version(pjson.version)
        .command('agro [env]', 'shows latest info on agro partnerships')
        .command('efarms [env]', 'shows latest info on efarms')
        .command('farm-crowdy [env]', 'shows latest info on farm-crowdy')
        .command('thrive-agric [env]', 'shows latest info on thrive-agric')
        .command('all [env]', 'shows latest info on efarms, farm-crowdy abd thrive-agric', { isDefault: true })
        .parse(process.argv)
}

module.exports.getAgro = getAgro
module.exports.getEFarms = getEFarms
module.exports.getFarmCrowdy = getFarmCrowdy
module.exports.getThriveAgric = getThriveAgric
module.exports.syncAll = syncAll
module.exports.syncAgro = syncAgro
module.exports.syncEFarms = syncEFarms
module.exports.syncFarmCrowdy = syncFarmCrowdy
module.exports.syncThriveAgric = syncThriveAgric