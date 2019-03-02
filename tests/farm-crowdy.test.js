const syncFarmCrowdy = require('../src/farm-invest-cli-farm-crowdy')
const mock = require('mock-fs')
const oldData = [{
    "title": "Poultry Farm",
    "price": "Cost Per Farm: ₦",
    "link": "poultryfarm.php",
    "returns": "Duration: 6 months",
    "address": "Oyo-State"
  }]
const newData = [
    {
      "title": "Maize Farm",
      "price": "Cost Per Farm: ₦",
      "link": "poultryfarm.php",
      "returns": "Duration: 6 months",
      "address": "Oyo-State"
    }
]
const path = require('path')
const { expect } = require('chai')

describe('Farm-Crowdy', () => {
    beforeEach(() => {
        mock({
            [path.join(__dirname, '../files')]: {
                'farm-crowdy.json': mock.file({
                    content: JSON.stringify(oldData, null, 2)
                })
            }
        })
    })
    
    afterEach(() => {
        mock.restore()
    })

    it('should provide a diff', async () => {
        const diff = await syncFarmCrowdy({ 
            getFarmCrowdy: () => Promise.resolve(newData)
        })

        expect(diff.removed).to.be.instanceOf(Array)
        expect(diff.added).to.be.instanceOf(Array)
        expect(diff.removed.length > 0).to.be.true
    })
})