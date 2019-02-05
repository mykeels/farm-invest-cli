const getAgro = require('./sites/agro')

const { agroTxt } = require('./utils/create-files-dir')
const fs = require('fs')
const LineDiff = require('line-diff')
const { printDiff } = require('./utils/print-diff')

const syncAgro = async ({ getAgro }) => {
    try {
        const productListText = await getAgro()
        if (!fs.existsSync(agroTxt)) {
            fs.writeFileSync(agroTxt, productListText)
            console.log(productListText)
        }
        else {
            const oldProductListText = fs.readFileSync(agroTxt, 'utf8')

            fs.writeFileSync(agroTxt, productListText)
            
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

    (async () => await syncAgro({ getAgro, fs }))()
}

module.exports = syncAgro