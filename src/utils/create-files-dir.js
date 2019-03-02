const fs = require('fs')
const path = require('path')

const filesDir = path.join(__dirname, '../../files')
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir)
}

module.exports.filesDir = filesDir
module.exports.agroHtml = path.join(filesDir, 'agro.html')
module.exports.eFarmsHtml = path.join(filesDir, 'efarms.html')
module.exports.farmCrowdyHtml = path.join(filesDir, 'farm-crowdy.html')
module.exports.thriveAgricHtml = path.join(filesDir, 'thrive-agric.html')
module.exports.agroJson = path.join(filesDir, 'agro.json')
module.exports.eFarmsJson = path.join(filesDir, 'efarms.json')
module.exports.farmCrowdyJson = path.join(filesDir, 'farm-crowdy.json')
module.exports.thriveAgricJson = path.join(filesDir, 'thrive-agric.json')