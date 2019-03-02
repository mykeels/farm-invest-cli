const getFarmCrowdy = require('./sites/farm-crowdy')
const { farmCrowdyJson } = require('./utils/create-files-dir')
const fs = require('fs')
const diff = require('fast-array-diff')
const { printDiff } = require('./utils/print-diff')

const syncFarmCrowdy = async ({ getFarmCrowdy }) => {
    try {
        const productList = await getFarmCrowdy()
        if (!fs.existsSync(farmCrowdyJson)) {
            fs.writeFileSync(farmCrowdyJson, JSON.stringify(productList, null, 2))
            console.log(productList)
        }
        else {
            const oldProductList = fs.readFileSync(farmCrowdyJson, 'utf8')

            fs.writeFileSync(farmCrowdyJson, JSON.stringify(productList, null, 2))
            
            if (!diff.same(oldProductList, productList)) {
                const diffObj = diff.diff(oldProductList, productList)
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
    
    (async () => await syncFarmCrowdy({ getFarmCrowdy, fs }))()
}

module.exports = syncFarmCrowdy