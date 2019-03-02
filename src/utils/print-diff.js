const chalk = require('chalk').default

const printDiff = (diff) => {
    diff.removed.forEach(line => {
        console.log(chalk.red(line))
    })
    diff.added.forEach(line => {
        console.log(chalk.green(line))
    })
}

module.exports = printDiff
module.exports.printDiff = printDiff