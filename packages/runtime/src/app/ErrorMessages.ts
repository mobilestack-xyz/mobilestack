export enum ErrorMessages {
  TRANSACTION_TIMEOUT = 'transactionTimeout',
  INCORRECT_PIN = 'incorrectPin',
  PIN_INPUT_CANCELED = 'pinInputCanceled',
  INVALID_BACKUP_PHRASE = 'invalidBackupPhrase',
  INVALID_WORDS_IN_BACKUP_PHRASE = 'invalidWordsInBackupPhrase',
  IMPORT_BACKUP_FAILED = 'importBackupFailed',
  FAILED_FETCH_MNEMONIC = 'failedFetchMnemonic',
  MISSING_FULL_NAME = 'missingFullName',
  PHONE_NUMBER_VERIFICATION_FAILURE = 'phoneVerificationInput.verificationFailure',
  PHONE_NUMBER_REVOKE_FAILED = 'revokePhoneNumber.revokeError',
  ADDRESS_LOOKUP_FAILURE = 'addressLookupFailure',
  ACCOUNT_UNLOCK_FAILED = 'accountUnlockFailed',
  SEND_PAYMENT_FAILED = 'sendPaymentFailed',
  ACCOUNT_SETUP_FAILED = 'accountSetupFailed',
  FIREBASE_DISABLED = 'firebaseDisabled',
  FIREBASE_FAILED = 'firebaseFailed',
  IMPORT_CONTACTS_FAILED = 'importContactsFailed',
  QR_FAILED_INVALID_ADDRESS = 'qrFailedInvalidAddress',
  QR_FAILED_INVALID_RECIPIENT = 'qrFailedInvalidRecipient',
  ADDRESS_VALIDATION_ERROR = 'addressValidationError',
  ADDRESS_VALIDATION_NO_MATCH = 'addressValidationNoMatch',
  ADDRESS_VALIDATION_FULL_POORLY_FORMATTED = 'addressValidationFullPoorlyFormatted',
  ADDRESS_VALIDATION_PARTIAL_POORLY_FORMATTED = 'addressValidationPartialPoorlyFormatted',
  ADDRESS_VALIDATION_FULL_OWN_ADDRESS = 'addressValidationFullOwnAddress',
  ADDRESS_VALIDATION_PARTIAL_OWN_ADDRESS = 'addressValidationPartialOwnAddress',
  ACCOUNT_CLEAR_FAILED = 'accountClearFailed',
  KEYCHAIN_FETCH_ACCOUNTS = 'keychainFetchAccounts',
  KEYCHAIN_ACCOUNT_ALREADY_EXISTS = 'keychainAccountAlreadyExists',
  FETCH_FAILED = 'fetchFailed',
  SIMPLEX_PURCHASE_FETCH_FAILED = 'simplexPurchaseFetchFailed',
  PROVIDER_FETCH_FAILED = 'providerFetchFailed',
  CASH_OUT_LIMIT_EXCEEDED = 'cashOutLimitExceeded',
  PERSONA_ACCOUNT_ENDPOINT_FAIL = 'personaAccountEndpointFail',
  FETCH_SWAP_QUOTE_FAILED = 'swapScreen.fetchSwapQuoteFailed',
  FIATCONNECT_ADD_ACCOUNT_EXISTS = 'fiatDetailsScreen.addFiatAccountResourceExist',
  FIATCONNECT_ADD_ACCOUNT_FAILED = 'fiatDetailsScreen.addFiatAccountFailed',
  KYC_TRY_AGAIN_FAILED = 'fiatConnectKycStatusScreen.tryAgainFailed',
  HOOKS_INVALID_PREVIEW_API_URL = 'hooksPreview.invalidApiUrl',
  SHORTCUT_CLAIM_REWARD_FAILED = 'dappShortcuts.claimRewardFailure',
  INVITE_WITH_URL_FAILED = 'inviteWithUrl.error',
}