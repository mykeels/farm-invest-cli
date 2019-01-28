const fs = require('fs')
const path = require('path')

const filesDir = path.join(__dirname, '../../files')
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir)
}

module.exports.filesDir = filesDir
module.exports.eFarmsHtml = path.join(filesDir, 'efarms.html')
module.exports.farmCrowdyHtml = path.join(filesDir, 'farm-crowdy.html')
module.exports.thriveAgricHtml = path.join(filesDir, 'thrive-agric.html')
module.exports.eFarmsTxt = path.join(filesDir, 'efarms.txt')
module.exports.farmCrowdyTxt = path.join(filesDir, 'farm-crowdy.txt')
module.exports.thriveAgricTxt = path.join(filesDir, 'thrive-agric.txt')