import { connect, Contract, keyStores, WalletConnection, Account } from 'near-api-js';

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

  async getNearConnection() {
      if(this.nearConnection === null) {
          this.nearConnection = await initConnection(this.nearConfig);
      }
      return this.nearConnection;
  }
  

  async getWalletConnection() {
    if(this.walletConnection === null) {
        this.walletConnection = new WalletConnection(await this.getNearConnection());
    }
    return this.walletConnection;
  }

  async getContract() {
    if(this.contract === null) {
        this.contract = await new Contract(await this.getAccount(), this.nearConfig.contractName, {
          viewMethods: [],
          changeMethods: [],
        });
    }
    return this.contract;
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
}

export default function getNearWalletConnection(nearConfig) {
    return new NearWalletConnection(nearConfig);
}
