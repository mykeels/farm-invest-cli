const chalk = require('chalk').default

const printDiff = (diff) => {
    diff.removed.forEach(line => {
        console.log(chalk.red(JSON.stringify(line, null, 2).replace(/\n/g, '\n-').replace('{', '-{')))
    })
    diff.added.forEach(line => {
        console.log(chalk.green(JSON.stringify(line, null, 2).replace(/\n/g, '\n+').replace('{', '+{')))
    })
}

module.exports = printDiff
module.exports.printDiff = printDiff