const { remote } = require('webdriverio')
const { expect } = require('earljs')
const WDIO_PARAMS = require('./config')

describe('Unity Game', function() {
  /** @type import('webdriverio').Browser<'async'> **/
  let driver

  before(async function() {
    driver = await remote(WDIO_PARAMS)
  })

  it('should find elements', async function() {
    await driver.switchContext('UNITY')
    /** @type import('webdriverio').Element<'async> **/
    const player = await driver.$('#SuperPlayer')
    /** @type import('webdriverio').Element<'async> **/
    const enemy10 = await driver.$('//Enemy[10]')
    expect(await player.isDisplayed()).toBeTruthy()
    expect(await enemy10.isDisplayed()).toBeFalsy()
  })

  after(async function() {
    if (driver) {
      await driver.deleteSession()
    }
  })
})
