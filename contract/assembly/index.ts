import { Context, PersistentMap, logging } from 'near-sdk-as'

export class TokenSender {
    constructor(
        public senderToRecipientMap:PersistentMap<string, string[]>,
        public recipientToAmountMap:PersistentMap<string, i32[]>) {
    }

    add(recipient:string, amount:i32): void {
        const sender = Context.sender;
        const doesNotContainSender = this.senderToRecipientMap.contains(sender);

        if(doesNotContainSender) {
            this.senderToRecipientMap.set(sender, [recipient]);
            this.recipientToAmountMap.set(sender, [amount]);
        } else {
            const allRecipients = this.senderToRecipientMap.getSome(sender);
            const recipientReceivedAmounts = this.recipientToAmountMap.getSome(sender);
            const hasCurrentRecipient = allRecipients.includes(recipient);            

            if(!hasCurrentRecipient) {
                recipientReceivedAmounts.push(amount);
                allRecipients.push(recipient);
                this.senderToRecipientMap.set(sender, allRecipients);
                this.recipientToAmountMap.set(sender, recipientReceivedAmounts);
            } else {
                const indexOfRecipient = allRecipients.indexOf(recipient);
                const oldRecipientTotalSent = recipientReceivedAmounts[indexOfRecipient];
                const newRecipientTotalSent = oldRecipientTotalSent + amount;
                recipientReceivedAmounts[indexOfRecipient] = newRecipientTotalSent;
                this.recipientToAmountMap.set(sender, recipientReceivedAmounts);
            }
        }
    }
}

const senderMap = new PersistentMap<string, string[]>('SenderToRecipientMap');
const receiverMap = new PersistentMap<string, i32[]>('RecipientToAmountMap');
const tokenSender = new TokenSender(senderMap, receiverMap) ;

export function getNames(user:string):string[] {
    return tokenSender.senderToRecipientMap.contains(user) ? tokenSender.senderToRecipientMap.getSome(user) : [];
}


export function getValues(user:string):i32[] {
    return tokenSender.recipientToAmountMap.contains(user) ? tokenSender.recipientToAmountMap.getSome(user) : [];
}

export function addFunds(recipient:string, amount:i32):void {
    tokenSender.add(recipient, amount);
}