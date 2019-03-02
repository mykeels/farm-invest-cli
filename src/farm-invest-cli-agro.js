const getAgro = require('./sites/agro')

const { agroJson } = require('./utils/create-files-dir')
const fs = require('fs')
const diff = require('fast-array-diff')
const { printDiff } = require('./utils/print-diff')
const { comparison } = require('./utils/comparison')

const syncAgro = async ({ getAgro }) => {
    try {
        const productList = await getAgro()

        if (!fs.existsSync(agroJson)) {
            fs.writeFileSync(agroJson, JSON.stringify(productList, null, 2))
            console.log(productList)
        }
        else {
            const oldProductList = JSON.parse(fs.readFileSync(agroJson, 'utf8'))

            fs.writeFileSync(agroJson, JSON.stringify(productList, null, 2))

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

    (async () => await syncAgro({ getAgro, fs }))()
}

module.exports = syncAgro