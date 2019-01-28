const getFarmCrowdy = require('./sites/farm-crowdy')
const program = require('commander')
const { farmCrowdyTxt } = require('./utils/create-files-dir')
const fs = require('fs')
const LineDiff = require('line-diff')
const { printDiff } = require('./utils/print-diff')

program
    .parse(process.argv);

const syncFarmCrowdy = async () => {
    try {
        // const productListText = await getFarmCrowdy()
        const productListText = `Maize Farm
₦130,000
https://www.farmcrowdy.com/farm/maize-farm/
Returns 8%  per 9 months`
        if (!fs.existsSync(farmCrowdyTxt)) {
            fs.writeFileSync(farmCrowdyTxt, productListText)
            console.log(productListText)
        }
        else {
            const oldProductListText = fs.readFileSync(farmCrowdyTxt, 'utf8')
            if (oldProductListText != productListText) {
                const diff = new LineDiff(oldProductListText, productListText)

                printDiff(diff.toString())
                return diff
            }
        }
        return []
    }
    catch (ex) {
        console.error(ex)
    }
}

if (require.main === module) {
    (async () => await syncFarmCrowdy())()
}

module.exports = syncFarmCrowdy