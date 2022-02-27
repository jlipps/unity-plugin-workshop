const { remote } = require('webdriverio')

const capabilities = {
  platformName: 'Android',
  'appium:deviceName': 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:app': process.env['UNITY_APP'],
  'appium:altUnityHost': 'localhost',
  'appium:altUnityPort': 13000,
}

const WDIO_PARAMS = {
  hostname: 'localhost',
  port: 4723,
  path: '/',
  connectionRetryCount: 0,
  logLevel: 'silent',
  capabilities,
}

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
