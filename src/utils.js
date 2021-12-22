import { nearWalletConnection } from './near-wallet-connection'

export async function initContract() {
  window.walletConnection = await nearWalletConnection.getWalletConnection();
  window.accountId = await nearWalletConnection.getAccountId();
  window.account = await nearWalletConnection.getAccount();
  window.contract = await nearWalletConnection.getContract();
}

export async function logout() {
  (await nearWalletConnection.getWalletConnection()).signOut();
  window.location.replace(window.location.origin + window.location.pathname)
}

export async function login() {
  (await nearWalletConnection.getWalletConnection()).requestSignIn('');
}
