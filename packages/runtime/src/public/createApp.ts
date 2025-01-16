// Note: We should be careful of what we import in this module, we don't want to load the entire runtime here
// until createApp is called, since we set some globals here, which will be read by other runtime modules
import '@mobilestack-xyz/runtime/src/missingGlobals'
import Config from 'react-native-config'
import DeviceInfo from 'react-native-device-info'
import { ToggleableOnboardingFeatures } from 'src/onboarding/types'

// This will evolve. We should be mindful of breaking changes.
// This structure should scale well as we add more features
// and makes it clear what's core configuration vs optional features.
export interface PublicAppConfig {
  registryName: string
  displayName: string
  deepLinkUrlScheme: string
  iosAppStoreId?: string

  // Optional features/capabilities
  features?: {
    firebase?: boolean
    sentry?: {
      clientUrl: string
    }
    // TODO: what's the marketing name for this?
    cloudBackup?: {
      auth0Domain: string
      auth0ClientId: string
      web3AuthClientId: string
    }
    onboarding?: {
      cloudBackup?: boolean
      cloudBackupSetupInOnboarding?: boolean
      enableBiometry?: boolean
      protectWallet?: boolean
    }
    walletConnect?: {
      projectId: string
    }
  }

  //
  network?: {
    // TODO: we'll pass RPC urls, API urls, etc here
  }
}

// Note: could be nice to have a direct mapping, but for now it's explicit and simple
// but we have to remember to expose new features
function getOnboardingFeatures(
  config: Exclude<PublicAppConfig['features'], undefined>['onboarding'] = {
    cloudBackup: true,
    cloudBackupSetupInOnboarding: true,
    enableBiometry: true,
    protectWallet: true,
  }
) {
  const onboardingFeatures = []
  if (config.cloudBackup) {
    onboardingFeatures.push(ToggleableOnboardingFeatures.CloudBackup)
  }
  if (config.cloudBackupSetupInOnboarding) {
    onboardingFeatures.push(ToggleableOnboardingFeatures.CloudBackupSetupInOnboarding)
  }
  if (config.enableBiometry) {
    onboardingFeatures.push(ToggleableOnboardingFeatures.EnableBiometry)
  }
  if (config.protectWallet) {
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
  Config.APP_STORE_ID = config.iosAppStoreId
  Config.APP_DISPLAY_NAME = config.displayName
  Config.SENTRY_ENABLED = config.features?.sentry?.clientUrl ? 'true' : 'false'
  Config.AUTH0_DOMAIN = config.features?.cloudBackup?.auth0Domain ?? 'auth.valora.xyz'
  Config.ONBOARDING_FEATURES_ENABLED = getOnboardingFeatures(config.features?.onboarding)
  Config.DEEP_LINK_URL_SCHEME = config.deepLinkUrlScheme
  Config.APP_REGISTRY_NAME = config.registryName

  // TODO: map/handle the whole config

  const App = require('src/app/App').default
  return App
}
