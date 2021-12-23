import { TokenSenderInterface } from './TokenSenderInterface';
import { TokenSender } from './TokenSender';
import { TokenSenderLogger } from './TokenSenderLogger';
import { PersistentMap, logging } from 'near-sdk-as'

const senderMap = new PersistentMap<string, string[]>('SenderToRecipientMap');
const receiverMap = new PersistentMap<string, i32[]>('RecipientToAmountMap');
const tokenSender: TokenSenderInterface = new TokenSenderLogger(new TokenSender(senderMap, receiverMap));



export function getNames(user:string):string[] {
    return tokenSender.names(user);
}

export function getValues(user:string):i32[] {
    return  tokenSender.values(user);
}

export function addFunds(recipient:string, amount:i32):void {
    tokenSender.add(recipient, amount);
}

export function getTotalSent(sender:string, recipient:string):i32 {
    return tokenSender.totalSent(sender, recipient);
}