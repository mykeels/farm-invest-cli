const getEFarms = require('./sites/efarms')

const { eFarmsTxt } = require('./utils/create-files-dir')
const fs = require('fs')
const LineDiff = require('line-diff')
const { printDiff } = require('./utils/print-diff')



const syncEFarms = async () => {
    try {
        const productListText = await getEFarms()
        if (!fs.existsSync(eFarmsTxt)) {
            fs.writeFileSync(eFarmsTxt, productListText)
            console.log(productListText)
        }
        else {
            const oldProductListText = fs.readFileSync(eFarmsTxt, 'utf8')

            fs.writeFileSync(eFarmsTxt, productListText)
            
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

    (async () => await syncEFarms())()
}

module.exports = syncEFarms