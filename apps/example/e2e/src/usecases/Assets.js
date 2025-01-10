import { E2E_WALLET_MNEMONIC } from 'react-native-dotenv'
import { english, generateMnemonic } from 'viem/accounts'
import { DEFAULT_RECIPIENT_ADDRESS } from '../utils/consts'
import { launchApp } from '../utils/retries'
import {
  getDisplayAddress,
  quickOnboarding,
  scrollIntoViewByTestId,
  waitForElementById,
} from '../utils/utils'

async function validateSendFlow(tokenSymbol) {
  const recipientAddressDisplay = getDisplayAddress(DEFAULT_RECIPIENT_ADDRESS)
  // navigate to send amount screen to ensure the expected token symbol is pre-selected
  await waitForElementById('SendSelectRecipientSearchInput', { tap: true })
  await element(by.id('SendSelectRecipientSearchInput')).replaceText(DEFAULT_RECIPIENT_ADDRESS)
  await element(by.id('SendSelectRecipientSearchInput')).tapReturnKey()
  await expect(element(by.text(recipientAddressDisplay)).atIndex(0)).toBeVisible()
  await element(by.text(recipientAddressDisplay)).atIndex(0).tap()
  await waitForElementById('SendOrInviteButton', { tap: true })
  await expect(
    element(by.text(`${tokenSymbol} on Celo`).withAncestor(by.id('SendEnterAmount/TokenSelect')))
  ).toBeVisible()
  await element(by.id('BackChevron')).tap()
  await element(by.id('BackChevron')).tap()
}

async function validateAddFlow(tokenSymbol) {
  // check the header includes the appropriate token symbol
  await waitFor(element(by.id('HeaderTitle')))
    .toHaveText(`Add ${tokenSymbol}`)
    .withTimeout(10 * 1000)
  await element(by.id('BackChevron')).tap()
}

export default Assets = () => {
  describe.each([
    {
      balance: 'non zero',
      tokens: [
        {
          tokenId: 'celo-mainnet:native',
          symbol: 'CELO',
          actions: ['Send', 'Add'],
          moreActions: ['Send', 'Add', 'Withdraw'],
          learnMore: true,
        },
        {
          tokenId: 'celo-mainnet:0x32a9fe697a32135bfd313a6ac28792dae4d9979d',
          symbol: 'cMCO2',
          actions: ['Send'],
          moreActions: [],
          learnMore: false,
        },
      ],
    },
    {
      balance: 'zero',
      tokens: [
        {
          tokenId: 'celo-mainnet:native',
          symbol: 'CELO',
          actions: ['Add'],
          moreActions: [],
          learnMore: true,
        },
        {
          tokenId: 'celo-mainnet:0x765de816845861e75a25fca122bb6898b8b1282a',
          symbol: 'cUSD',
          actions: ['Add'],
          moreActions: [],
          learnMore: true,
        },
      ],
    },
  ])('For wallet with $balance balance', ({ balance, tokens }) => {
    beforeAll(async () => {
      // Start with either a new account or the usual e2e account
      await launchApp({
        delete: true,
        permissions: { notifications: 'YES', contacts: 'YES', camera: 'YES' },
      })
      let mnemonic = E2E_WALLET_MNEMONIC
      if (balance === 'zero') {
        mnemonic = generateMnemonic(english)
      }
      await quickOnboarding({ mnemonic })
    })

    it('navigates to wallet tab from home', async () => {
      await waitForElementById('Tab/Wallet', { tap: true })
      await waitForElementById('Assets/TabBar')
    })

    it('switching tabs displays corresponding assets', async () => {
      await expect(element(by.id('TokenBalanceItem')).atIndex(0)).toBeVisible()
      await element(by.id('Assets/TabBarItem')).atIndex(1).tap()
      await waitForElementById('Assets/NoNfts')
      await element(by.id('Assets/TabBarItem')).atIndex(0).tap()
      await expect(element(by.id('TokenBalanceItem')).atIndex(0)).toBeVisible()
    })

    describe.each(tokens)('For $symbol', ({ symbol, tokenId, learnMore, actions, moreActions }) => {
      it('navigates to asset details on tapping asset', async () => {
        await waitForElementById(`TokenBalanceItemTouchable/${tokenId}`, { tap: true })
        await waitForElementById('TokenDetails/AssetValue')
      })

      if (actions.includes('Send')) {
        it('send action navigates to send flow', async () => {
          await element(by.id('TokenDetails/Action/Send')).tap()
          await validateSendFlow(symbol)
          await waitForElementById('TokenDetails/AssetValue')
        })
      }

      if (actions.includes('Add')) {
        it('add action navigates to add cico flow', async () => {
          await element(by.id('TokenDetails/Action/Add')).tap()
          await validateAddFlow(symbol)
          await waitForElementById('TokenDetails/AssetValue')
        })
      }

      if (moreActions.includes('Send')) {
        it('send action under more actions navigates to send flow', async () => {
          await element(by.id('TokenDetails/Action/More')).tap()
          await waitForElementById('TokenDetailsMoreActions/Send', { tap: true })
          await validateSendFlow(symbol)
          await waitForElementById('TokenDetails/AssetValue')
        })
      }

      if (moreActions.includes('Add')) {
        it('add action under more actions navigates to add cico flow', async () => {
          await element(by.id('TokenDetails/Action/More')).tap()
          await waitForElementById('TokenDetailsMoreActions/Add', { tap: true })
          await validateAddFlow(symbol)
          await waitForElementById('TokenDetails/AssetValue')
        })
      }

      if (moreActions.includes('Withdraw')) {
        it('withdraw action under more actions navigates to withdraw spend screen', async () => {
          await element(by.id('TokenDetails/Action/More')).tap()
          await waitForElementById('TokenDetailsMoreActions/Withdraw', { tap: true })
          await waitForElementById('FiatExchangeTokenBalance')
          await element(by.id('BackChevron')).tap()
          await waitForElementById('TokenDetails/AssetValue')
        })
      }

      if (learnMore) {
        it('learn more navigates to coingecko page', async () => {
          await scrollIntoViewByTestId('TokenDetails/LearnMore', 'TokenDetailsScrollView')
          await waitForElementById('TokenDetails/LearnMore', { tap: true })
          await waitForElementById('RNWebView')
          await waitFor(element(by.text('www.coingecko.com')))
            .toBeVisible()
            .withTimeout(10 * 1000)
          await element(by.id('WebViewScreen/CloseButton')).tap()
          await waitForElementById('TokenBalanceItem')
        })
      }

      it('navigates back to Assets page', async () => {
        await element(by.id('BackChevron')).tap()
        await waitForElementById('Assets/TabBar')
      })
    })
  })
}