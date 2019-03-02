const getEFarms = require('./sites/efarms')

const { eFarmsJson } = require('./utils/create-files-dir')
const fs = require('fs')
const diff = require('fast-array-diff')
const { printDiff } = require('./utils/print-diff')
const { comparison } = require('./utils/comparison')

const syncEFarms = async ({ getEFarms }) => {
    try {
        const productList = await getEFarms()
        if (!fs.existsSync(eFarmsJson)) {
            fs.writeFileSync(eFarmsJson, JSON.stringify(productList, null, 2))
            console.log(productList)
        }
        else {
            const oldProductList = JSON.parse(fs.readFileSync(eFarmsJson, 'utf8'))

            fs.writeFileSync(eFarmsJson, JSON.stringify(productList, null, 2))
            
            if (diff.diff(oldProductList, productList, comparison).removed.length) {
                const diffObj = diff.diff(oldProductList, productList, comparison)
                printDiff(diffObj)
                return diffObj
            }
        }
        return productList
    }
    catch (ex) {
        console.error(ex)
    }
}

if (require.main === module) {
    const program = require('commander')

    program.parse(process.argv);

    (async () => await syncEFarms({ getEFarms, fs }))()
}

module.exports = syncEFarms