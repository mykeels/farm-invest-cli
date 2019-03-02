const getThriveAgric = require('./sites/thrive-agric')
const { thriveAgricJson } = require('./utils/create-files-dir')
const fs = require('fs')
const diff = require('fast-array-diff')
const { printDiff } = require('./utils/print-diff')

const syncThriveAgric = async ({ getThriveAgric }) => {
    try {
        const productList = await getThriveAgric()
        if (!fs.existsSync(thriveAgricJson)) {
            fs.writeFileSync(thriveAgricJson, JSON.stringify(productList, null, 2))
            console.log(productList)
        }
        else {
            const oldProductList = fs.readFileSync(thriveAgricJson, 'utf8')

            fs.writeFileSync(thriveAgricJson, JSON.stringify(productList, null, 2))
            
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
    
    (async () => syncThriveAgric({ getThriveAgric, fs }))()
}

module.exports = syncThriveAgric