const getThriveAgric = require('./sites/thrive-agric')
const { thriveAgricTxt } = require('./utils/create-files-dir')
const fs = require('fs')
const LineDiff = require('line-diff')
const { printDiff } = require('./utils/print-diff')

const syncThriveAgric = async ({ getThriveAgric }) => {
    try {
        const productListText = await getThriveAgric()
        if (!fs.existsSync(thriveAgricTxt)) {
            fs.writeFileSync(thriveAgricTxt, productListText)
            console.log(productListText)
        }
        else {
            const oldProductListText = fs.readFileSync(thriveAgricTxt, 'utf8')

            fs.writeFileSync(thriveAgricTxt, productListText)
            
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
    
    (async () => syncThriveAgric({ getThriveAgric, fs }))()
}

module.exports = syncThriveAgric