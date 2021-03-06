const { remote } = require('webdriverio')
const WDIO_PARAMS = require('./config')

describe('Unity Game', function() {
  /** @type import('webdriverio').Browser<'async'> **/
  let driver

  before(async function() {
    driver = await remote(WDIO_PARAMS)
  })

  it('should open and do nothing', function() {
  })

  after(async function() {
    if (driver) {
      await driver.deleteSession()
    }
  })
})
