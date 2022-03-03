const { remote } = require('webdriverio')
const { expect } = require('earljs')
const WDIO_PARAMS = require('./config')

describe('Unity Game', function() {
  /** @type import('webdriverio').Browser<'async'> **/
  let driver

  before(async function() {
    driver = await remote(WDIO_PARAMS)
  })

  it('should stomp on enemies', async function() {
    await driver.switchContext('UNITY')
    let firstEnemy = await driver.$('//Enemy[starts-with(@worldX, "7.7")]')
    const initWorldY = parseFloat(await firstEnemy.getAttribute('worldY'))

    const runWithJump = {
      type: 'key',
      id:'keyboard',
      actions: [
        {type: 'keyDown', value: 'RightArrow'},
        {type: 'pause', duration: 1600},
        {type: 'keyDown', value: 'Space'},
        {type: 'pause', duration: 500},
        {type: 'keyUp', value: 'Space'},
        {type: 'pause', duration: 500},
        {type: 'keyUp', value: 'RightArrow'},
        {type: 'pause', duration: 1000},
      ]
    }
    await driver.performActions([runWithJump])

    firstEnemy = await driver.$('//Enemy[starts-with(@worldX, "7.7")]')
    const finalWorldY = parseFloat(await firstEnemy.getAttribute('worldY'))
    expect(finalWorldY).toBeLessThan(initWorldY)
  })

  after(async function() {
    if (driver) {
      await driver.deleteSession()
    }
  })
})
