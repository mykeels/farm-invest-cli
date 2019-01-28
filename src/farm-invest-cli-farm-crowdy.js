const getFarmCrowdy = require('./sites/farm-crowdy')
const program = require('commander')
const { farmCrowdyTxt } = require('./utils/create-files-dir')
const fs = require('fs')
const LineDiff = require('line-diff')
const { printDiff } = require('./utils/print-diff')

program
    .parse(process.argv);

(async () => {
    try {
        const productListText = await getFarmCrowdy()
        // const productListText = `Catfish Farmx\nCost Per Farm: ₦ 76,000\ncatfishfarm.php\nROI: 15.5% (6 months)\nLagos-State`
        if (!fs.existsSync(farmCrowdyTxt)) {
            fs.writeFileSync(farmCrowdyTxt, productListText)
            console.log(productListText)
        }
        else {
            const oldProductListText = fs.readFileSync(farmCrowdyTxt, 'utf8')
            if (oldProductListText != productListText) {
                const diff = new LineDiff(oldProductListText, productListText)

                printDiff(diff.toString())
            }
        }
        
    }
    catch (ex) {
        console.error(ex)
    }
})()