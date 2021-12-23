import { Context, PersistentMap, logging } from 'near-sdk-as'

export class TokenSender {
    constructor(
        private senderToRecipientMap:PersistentMap<string, string[]>,
        private recipientToAmountMap:PersistentMap<string, i32[]>) {
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
    
    names(user:string):string[] {
        return this.senderToRecipientMap.contains(user) ? this.senderToRecipientMap.getSome(user) : [];
    }


    values(user:string):i32[] {
        return this.recipientToAmountMap.contains(user) ? this.recipientToAmountMap.getSome(user) : [];
    }
}