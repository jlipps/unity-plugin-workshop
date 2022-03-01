const { remote } = require('webdriverio')
const { expect } = require('earljs')
const WDIO_PARAMS = require('./config')

describe('Unity Game', function() {
  /** @type import('webdriverio').Browser<'async'> **/
  let driver

  before(async function() {
    driver = await remote(WDIO_PARAMS)
  })

  it('should navigate to the settings menu', async function() {
    await driver.switchContext('UNITY')

    const pressEsc = {
        type: 'key',
        id: 'keyboard',
        actions: [
            {type: 'keyDown', value: 'Escape'},
            {type: 'pause', duration: 750},
            {type: 'keyUp', value: 'Escape'},
        ]
    }

    await driver.performActions([pressEsc])

    /** @type import('webdriverio').Element<'async>[] **/
    const menuButtons = await driver.$$('//Button/Text')
    for (const button of menuButtons) {
      if (await button.getText() === 'Settings') {
        await button.click()
        break
      }
    }

    /** @type import('webdriverio').Element<'async> **/
    const settingsHeader = await driver.$('//Settings/Header')
    expect(await settingsHeader.getText()).toEqual('Settings')
    await driver.performActions([pressEsc])
  })

  after(async function() {
    if (driver) {
      await driver.deleteSession()
    }
  })
})
