const program = require('commander')

program
    .parse(process.argv);

const syncAll = async () => {
    try {
        const syncEFarms = require('./farm-invest-cli-efarms')
        const syncFarmCrowdy = require('./farm-invest-cli-farm-crowdy')
        const syncThriveAgric = require('./farm-invest-cli-thrive-agric')

        return await Promise.all([
            syncEFarms(),
            syncFarmCrowdy(),
            syncThriveAgric()
        ])
    }
    catch (ex) {
        console.error(ex)
    }
}

if (require.main === module) {
    (async () => await syncAll())()
}


module.exports = syncAll