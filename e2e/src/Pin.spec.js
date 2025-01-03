import PINChange from './usecases/PINChange'
import PINRequire from './usecases/PINRequire'
import { launchApp } from './utils/retries'
import { quickOnboarding } from './utils/utils'

describe('Given PIN', () => {
  beforeEach(async () => {
    await launchApp({
      delete: true,
      permissions: { notifications: 'YES', contacts: 'YES' },
    })
    await quickOnboarding()
  })

  afterAll(async () => {
    await device.uninstallApp()
  })

  describe('When Requiring Pin', PINRequire)
  describe('When Changing Pin', PINChange)
})
