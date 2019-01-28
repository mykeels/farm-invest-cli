const syncFarmCrowdy = require('../src/farm-invest-cli-farm-crowdy')
const mock = require('mock-fs')
const oldTxt = `Maize Farm\nCost Per Farm: ₦ 75,000\maize.php\nROI: 12.5% (6 months)\nOyo-State`
const newTxt = `Kolanut Farm\nCost Per Farm: ₦ 125,000\nkolanut.php\nROI: 16.5% (6 months)\nOyo-State`
const path = require('path')
const { expect } = require('chai')

describe('Farm-Crowdy', () => {
    beforeEach(() => {
        mock({
            [path.join(__dirname, '../files')]: {
                'farm-crowdy.txt': mock.file({
                    content: oldTxt
                })
            }
        })
    })
    
    afterEach(() => {
        mock.restore()
    })

    it('should provide a diff', async () => {
        const diff = await syncFarmCrowdy({ 
            getFarmCrowdy: () => Promise.resolve(newTxt)
        })

        expect(diff.changes).to.be.instanceOf(Array)
        expect(diff.changes.length > 0).to.be.true
    })
})