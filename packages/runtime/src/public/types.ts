// Types for tab configuration
export interface TabOptions {
  icon: (props: { focused: boolean; color: string; size: number }) => React.ReactNode
  label: (t: (key: string) => string) => string
  testID?: string
}

export interface TabScreenConfig {
  name: string // Just a unique identifier for the screen
  component: React.ComponentType<any>
  options: TabOptions
}

// This will evolve. We should be mindful of breaking changes.
// This structure should scale well as we add more features
// and makes it clear what's core configuration vs optional features.
//
// Guidelines:
// - We should only have a few core configuration options, and the rest should be optional features and/or with default values
// - We should only add new configuration options that we want to support long term, and not just for a specific app
// - Configuration options should be well documented and have clear purposes
// - Breaking changes to configuration should be avoided when possible
// - Configuration should be type-safe. In some cases we can consider runtime validation.
export interface PublicAppConfig {
  registryName: string
  displayName: string
  deepLinkUrlScheme: string

  // Platform specific configuration
  ios?: {
    appStoreId?: string
  }

  // Theme configuration
  themes?: {
    // Rough example of what we might want to support
    default: {
      // To adjust status bar style, keyboard appearance, etc
      isDark?: boolean
      colors?: {
        // Core brand colors
        primary?: string
        secondary?: string
        background?: string

        // Semantic colors
        error?: string
        success?: string
        warning?: string

        // Text colors
        text?: {
          primary?: string
          secondary?: string
          disabled?: string
        }
      }
    }
  }

  // Screen overrides
  screens?: {
    // Tab navigation configuration
    tabs?: {
      screens?: Array<'wallet' | 'activity' | 'discover' | 'earn' | TabScreenConfig>
      initialScreen?: 'wallet' | 'activity' | 'discover' | 'earn' | number // index
    } // Later we could allow passing in a component for advanced cases
  }

  // Optional features/capabilities
  features?: {
    firebase?: boolean
    sentry?: {
      clientUrl: string
    }
    // TODO: what's the marketing name for this?
    cloudBackup?: boolean
    onboarding?: {
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
