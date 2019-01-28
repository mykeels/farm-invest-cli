const chalk = require('chalk').default

const printDiff = (diff) => {
    const lines = diff.split('\n')
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.startsWith(' -')) console.log(chalk.red(line))
        else if (line.startsWith(' +')) console.log(chalk.green(line))
        else console.log(line)
    }
}

module.exports = printDiff
module.exports.printDiff = printDiff