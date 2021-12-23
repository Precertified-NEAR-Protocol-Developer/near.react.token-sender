import { TokenSender } from './TokenSender';
import { TokenSenderLogger } from './TokenSenderLogger';
import { PersistentMap, logging } from 'near-sdk-as'

const senderMap = new PersistentMap<string, string[]>('SenderToRecipientMap');
const receiverMap = new PersistentMap<string, i32[]>('RecipientToAmountMap');
const tokenSender = new TokenSender(senderMap, receiverMap) ;
const tokenSenderLogger = new TokenSenderLogger(tokenSender);



export function getNames(user:string):string[] {
    return tokenSenderLogger.names(user);
}

export function getValues(user:string):i32[] {
    return  tokenSenderLogger.values(user);
}

export function addFunds(recipient:string, amount:i32):void {
    tokenSenderLogger.add(recipient, amount);
}