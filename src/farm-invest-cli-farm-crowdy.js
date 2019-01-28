const getFarmCrowdy = require('./sites/farm-crowdy')
const { farmCrowdyTxt } = require('./utils/create-files-dir')
const fs = require('fs')
const LineDiff = require('line-diff')
const { printDiff } = require('./utils/print-diff')

const syncFarmCrowdy = async ({ getFarmCrowdy, fs }) => {
    try {
        const productListText = await getFarmCrowdy()
        if (!fs.existsSync(farmCrowdyTxt)) {
            fs.writeFileSync(farmCrowdyTxt, productListText)
            console.log(productListText)
        }
        else {
            const oldProductListText = fs.readFileSync(farmCrowdyTxt, 'utf8')

            fs.writeFileSync(farmCrowdyTxt, productListText)
            
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
    const program = require('commander')

    program.parse(process.argv);
    
    (async () => await syncFarmCrowdy({ getFarmCrowdy, fs }))()
}

module.exports = syncFarmCrowdy