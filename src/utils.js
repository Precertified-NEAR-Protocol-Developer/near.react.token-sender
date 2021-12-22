import { nearWalletConnection } from './near-wallet-connection'

export async function initContract() {
  await nearWalletConnection.getWalletConnection();
  await nearWalletConnection.getAccountId();
  await nearWalletConnection.getAccount();
  await nearWalletConnection.getContract();
}

export async function logout() {
  (await nearWalletConnection.getWalletConnection()).signOut();
  window.location.replace(window.location.origin + window.location.pathname)
}

export async function login() {
  (await nearWalletConnection.getWalletConnection()).requestSignIn('');
}
