import { TokenSenderInterface } from './TokenSenderInterface';
import { TokenSenderFactory } from './TokenSenderFactory';
import { PersistentMap, logging } from 'near-sdk-as'

const senderMap = new PersistentMap<string, string[]>('SenderToRecipientMap');
const receiverMap = new PersistentMap<string, i32[]>('RecipientToAmountMap');
const tokenSender: TokenSenderInterface = TokenSenderFactory.getDefault();

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