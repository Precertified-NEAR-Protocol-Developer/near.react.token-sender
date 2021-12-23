import getConfig from './config'
import getNearWalletConnection from './near-wallet-connection-model'

export const nearWalletConnection = getNearWalletConnection(getConfig(process.env.NODE_ENV || 'development'))