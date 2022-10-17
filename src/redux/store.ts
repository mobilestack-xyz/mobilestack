import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { Middleware } from 'redux'
import { getStoredState, PersistConfig, persistReducer, persistStore } from 'redux-persist'
import FSStorage from 'redux-persist-fs-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createSagaMiddleware from 'redux-saga'
import { PerformanceEvents } from 'src/analytics/Events'
import ValoraAnalytics from 'src/analytics/ValoraAnalytics'
import { createMigrate } from 'src/redux/createMigrate'
import { migrations } from 'src/redux/migrations'
import rootReducer, { RootState } from 'src/redux/reducers'
import { rootSaga } from 'src/redux/sagas'
import { resetStateOnInvalidStoredAccount } from 'src/utils/accountChecker'
import Logger from 'src/utils/Logger'
import { ONE_DAY_IN_MILLIS } from 'src/utils/time'

const timeBetweenStoreSizeEvents = ONE_DAY_IN_MILLIS
let lastEventTime = Date.now()

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  // default is -1, increment as we make migrations
  // See https://github.com/valora-inc/wallet/tree/main/WALLET.md#redux-state-migration
  version: 85,
  keyPrefix: `reduxStore-`, // the redux-persist default is `persist:` which doesn't work with some file systems.
  storage: FSStorage(),
  blacklist: ['networkInfo', 'alert', 'imports', 'supercharge', 'swap'],
  stateReconciler: autoMergeLevel2,
  migrate: async (...args) => {
    const migrate = createMigrate(migrations)
    const state: any = await migrate(...args)

    // Do this check here once migrations have occurred, to ensure we have a RootState
    return resetStateOnInvalidStoredAccount(state) as any
  },
  // @ts-ignore the types are currently wrong
  serialize: (data: any) => {
    // We're using this to send the size of the store to analytics while using the default implementation of JSON.stringify.
    const stringifiedData = JSON.stringify(data)
    // if data._persist or any other key is present the whole state is present (the content of the keys are
    // sometimes serialized independently).
    if (data._persist && Date.now() > lastEventTime + timeBetweenStoreSizeEvents) {
      lastEventTime = Date.now()
      ValoraAnalytics.track(PerformanceEvents.redux_store_size, {
        size: stringifiedData.length,
      })
    }
    return stringifiedData
  },
  deserialize: (data: string) => {
    // This is the default implementation, but overriding to maintain compatibility with the serialize function
    // in case the library changes.
    return JSON.parse(data)
  },
  // @ts-ignore
  timeout: null,
}

// We used to use AsyncStorage to save the state, but moved to file system storage because of problems with Android
// maximum size limits. To keep backwards compatibility, we first try to read from the file system but if nothing is found
// it means it's an old version so we read the state from AsyncStorage.
// @ts-ignore
persistConfig.getStoredState = async (config: any) => {
  Logger.info('redux/store', 'persistConfig.getStoredState')
  try {
    // throw new Error("testing exception in getStoredState")
    const state = await getStoredState(config)
    if (state) {
      return state
    }

    const oldState = await getStoredState({
      ...config,
      storage: AsyncStorage,
      keyPrefix: 'persist:',
    })
    if (oldState) {
      return oldState
    }

    return null
  } catch (error) {
    Logger.error('redux/store', 'Failed to retrieve redux state.', error)
  }
}

// For testing only!
export const _persistConfig = persistConfig

// eslint-disable-next-line no-var
declare var window: any

export const setupStore = (initialState = {}, config = persistConfig) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares: Middleware[] = [sagaMiddleware]

  if (__DEV__) {
    const createDebugger = require('redux-flipper').default
    // Sending the whole state makes the redux debugger in flipper super slow!!
    // I suspect it's the exchange rates causing this!
    // For now exclude the `exchange` & `tokens` reducer.
    middlewares.push(
      createDebugger({
        stateWhitelist: [
          'app',
          'dapps',
          'i18n',
          'networkInfo',
          'alert',
          'goldToken',
          'stableToken',
          'send',
          'home',
          // "exchange",
          // "tokens",
          'transactions',
          'web3',
          'identity',
          'account',
          'invite',
          'escrow',
          'fees',
          'recipients',
          'localCurrency',
          'imports',
          'paymentRequest',
          'verify',
          'fiatConnect',
        ],
      })
    )
  }

  const enhancers = []

  if (__DEV__) {
    const Reactotron = require('src/reactotronConfig').default
    enhancers.push(Reactotron.createEnhancer())
  }

  const persistedReducer = persistReducer(config, rootReducer)

  const createdStore = configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(...middlewares),
    enhancers,
  })
  const createdPersistor = persistStore(createdStore)
  sagaMiddleware.run(rootSaga)

  return { store: createdStore, persistor: createdPersistor }
}

const { store, persistor } = setupStore()
setupListeners(store.dispatch)
export { store, persistor }
