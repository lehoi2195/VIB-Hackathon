const DEV = true;

const API_URL = DEV ? 'http://206.189.37.223' : 'http://128.199.109.81';
//http://206.189.37.223/
const API_AUTH = {
  LOGIN: API_URL + '/auth/local',
  REGISTER: API_URL + '/auth/local/register',
  FORGOT_PASSWORD: API_URL + '/auth/forgot-password',
  RESET_PASSWORD: API_URL + '/auth/reset-password',
  PROFILE_ME: API_URL + '/users/me',
  MY_ACCOUNT: ID => API_URL + `/users/${ID}`,
};

const API_PAYMENT = {
  TRANSFER: API_URL + '/transactions/transfer',
  TRANSACTIONS: ID => API_URL + `/transactions?from_account_id=${ID}`,
  TRANSACTIONS_DETAIL: (API_URL, ID) => API_URL + `/transactions/${ID}`,
  TRANSACTIONS_DELETE: (API_URL, ID) => API_URL + `/transactions/${ID}`,
  TRANSACTIONS_UPDATE: (API_URL, ID) => API_URL + `/transactions/${ID}`,
};

const API_BANK_ACCOUNT = {
  BANK_ACCOUNTS_LIST: API_URL + '/bank-accounts',
  BANK_ACCOUNTS_DETAIL: ID => API_URL + `/bank-accounts?id=${ID}`,
  BANK_ACCOUNTS_DELETE: ID => API_URL + `/bank-accounts/${ID}`,
  BANK_ACCOUNTS_UPDATE: ID => API_URL + `/bank-accounts/${ID}`,
};

const API_HOME = {
  GET_INFO_CART: API_URL + '/users/me',
  GET_HISTORY: API_URL + '',
};

export {API_AUTH, API_PAYMENT, API_BANK_ACCOUNT, API_HOME};
