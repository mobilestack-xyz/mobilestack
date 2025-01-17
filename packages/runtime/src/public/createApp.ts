// Note: We should be careful of what we import in this module, we don't want to load the entire runtime here
// until createApp is called, since we set some globals here, which will be read by other runtime modules
import '@mobilestack-xyz/runtime/src/missingGlobals'
import Config from 'react-native-config'
import DeviceInfo from 'react-native-device-info'
import { ToggleableOnboardingFeatures } from '../onboarding/types'
import { setAppConfig } from './appConfig'
import { PublicAppConfig } from './types'

// Note: could be nice to have a direct mapping, but for now it's explicit and simple
// but we have to remember to expose new features
function getOnboardingFeatures(config: PublicAppConfig) {
  const onboardingConfig = config.features?.onboarding ?? {
    enableBiometry: true,
    protectWallet: true,
  }

  const onboardingFeatures = []
  if (config.features?.cloudBackup) {
    onboardingFeatures.push(ToggleableOnboardingFeatures.CloudBackup)
    onboardingFeatures.push(ToggleableOnboardingFeatures.CloudBackupSetupInOnboarding)
  }
  // Special case for e2e to test phone number verification
  // As we're not yet sure how we wanna expose this feature in the runtime
  if (process.env.EXPO_PUBLIC_MOBILE_STACK_E2E === 'true') {
    onboardingFeatures.push(ToggleableOnboardingFeatures.PhoneVerification)
  }
  if (onboardingConfig) {
    onboardingFeatures.push(ToggleableOnboardingFeatures.EnableBiometry)
  }
  if (onboardingConfig) {
    onboardingFeatures.push(ToggleableOnboardingFeatures.ProtectWallet)
  }
  return onboardingFeatures.join(',')
}

export function createApp(config: PublicAppConfig) {
  // Hack, map public config to react-native-config
  // TODO: refactor to eliminate this, but for now it avoids more changes in the rest of the codebase
  Config.DEFAULT_TESTNET = 'mainnet'
  Config.DEV_SETTINGS_ACTIVE_INITIALLY = 'false'
  Config.DEV_RESTORE_NAV_STATE_ON_RELOAD = 'false'
  Config.FIREBASE_ENABLED = 'false'
  Config.SHOW_TESTNET_BANNER = 'false'
  Config.APP_BUNDLE_ID = DeviceInfo.getBundleId()
  Config.APP_STORE_ID = config.ios?.appStoreId
  Config.APP_DISPLAY_NAME = config.displayName
  Config.SENTRY_ENABLED = config.features?.sentry?.clientUrl ? 'true' : 'false'
  Config.AUTH0_DOMAIN = 'auth.valora.xyz' // TODO: also set auth0ClientId and web3AuthClientId that are needed for cloud backup
  Config.ONBOARDING_FEATURES_ENABLED = getOnboardingFeatures(config)
  Config.DEEP_LINK_URL_SCHEME = config.deepLinkUrlScheme
  Config.APP_REGISTRY_NAME = config.registryName

  // TODO: map/handle the whole config

  // Keep the config in a global variable so it can be accessed by other runtime modules
  setAppConfig(config)

  const App = require('../app/App').default
  return App
}
