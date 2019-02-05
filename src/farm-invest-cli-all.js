const getAgro = require('./sites/agro')
const getEFarms = require('./sites/efarms')
const getFarmCrowdy = require('./sites/farm-crowdy')
const getThriveAgric = require('./sites/thrive-agric')
const fs = require('fs')

const syncAll = async () => {
    try {
        const syncAgro = require('./farm-invest-cli-agro')
        const syncEFarms = require('./farm-invest-cli-efarms')
        const syncFarmCrowdy = require('./farm-invest-cli-farm-crowdy')
        const syncThriveAgric = require('./farm-invest-cli-thrive-agric')

        return await Promise.all([
            syncAgro({ getAgro, fs }),
            syncEFarms({ getEFarms, fs }),
            syncFarmCrowdy({ getFarmCrowdy, fs }),
            syncThriveAgric({ getThriveAgric, fs })
        ])
    }
    catch (ex) {
        console.error(ex)
    }
}

if (require.main === module) {
    const program = require('commander')

    program.parse(process.argv);

    (async () => await syncAll())()
}


module.exports = syncAll