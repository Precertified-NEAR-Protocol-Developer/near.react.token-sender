import {utils, connect, Contract, keyStores, WalletConnection, } from 'near-api-js';

export function initConnection(config) {
    return connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, config))
}
/**
 * Class used to couple a `Near` object and `WalletConnection`
 */
export class NearWalletConnection {
  constructor(nearConfig) {
    this.account = null;
    this.contract = null;
    this.nearConnection = null;
    this.walletConnection = null;
    this.nearConfig = nearConfig;
  }

  async getAccount() {
    return (await this.getWalletConnection()).account();
  }

  async getAccountState() {
    return (await this.getAccount()).state();
  }

  async getAccountId() {
    return (await this.getWalletConnection()).getAccountId();
  }

  async getNearConnection() {
    if(this.nearConnection === null) {
        console.log(`Initializing connection to NEAR api`);
        this.nearConnection = await initConnection(this.nearConfig);
        console.log(`Connection initialized ↓`);
        console.log(this.nearConnection)
    }
    return this.nearConnection;
  }
 
  async getWalletConnection() {
    if(this.walletConnection === null) {
        console.log(`Creating new WalletConnection`);        
        this.walletConnection = new WalletConnection(await this.getNearConnection());
        console.log(`WalletConnection created ↓`);
        console.log(this.walletConnection);
    }
    return this.walletConnection;
  }

  async getContract() {
    if(this.contract === null) {
        console.log(`Creating new Contract with contract name of '${this.nearConfig.contractName}'`);
        this.contract = new Contract(await this.getAccount(), this.nearConfig.contractName, {
          viewMethods: ['getNames', 'getValues', 'getTotalSent'],
          changeMethods: ['addFunds'],
        });
        console.log(`Contract created ↓`);
        console.log(this.contract);
    }
    return this.contract;
  }

  async isUserLoggedIn() {
    const currentAccountId = await this.getAccountId();
    const isAccountIdUndefined = 'undefined' === typeof currentAccountId;
    const isAccountIdEmpty = '' === currentAccountId;
    const isAccountIdNull = null === currentAccountId;
    const isNotLoggedIn = isAccountIdUndefined || isAccountIdEmpty || isAccountIdNull;
    return !isNotLoggedIn;
  }

  async formatNearAmount(amount) {
    return await utils.format.formatNearAmount(amount);
  }

  async parseNearAmount(amount) {
    return await utils.format.parseNearAmount(amount);
  }

  async sendMoney(recipient, amount) {
    (await this.getAccount()).sendMoney(recipient, amount);
  }

  async addFunds(recipientAndAmountObject) {
    await (await this.getContract()).addFunds(recipientAndAmountObject);
  }
}

export default function getNearWalletConnection(nearConfig) {
    return new NearWalletConnection(nearConfig);
}
