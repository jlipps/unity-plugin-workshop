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

module.exports = WDIO_PARAMS
