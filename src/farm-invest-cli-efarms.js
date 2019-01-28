const getEFarms = require('./sites/efarms')
const program = require('commander')
const { eFarmsTxt } = require('./utils/create-files-dir')
const fs = require('fs')
const LineDiff = require('line-diff')
const { printDiff } = require('./utils/print-diff')

program
    .parse(process.argv);

(async () => {
    try {
        const productListText = await getEFarms()
        // const productListText = `Catfish Farmx\nCost Per Farm: ₦ 76,000\ncatfishfarm.php\nROI: 15.5% (6 months)\nLagos-State`
        if (!fs.existsSync(eFarmsTxt)) {
            fs.writeFileSync(eFarmsTxt, productListText)
            console.log(productListText)
        }
        else {
            const oldProductListText = fs.readFileSync(eFarmsTxt, 'utf8')
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