import { TokenSenderInterface } from './TokenSenderInterface';
import { Context, PersistentMap } from 'near-sdk-as'

export class TokenSenderImpl implements TokenSenderInterface {
    constructor(
        private senderToRecipientMap:PersistentMap<string, string[]>,
        private recipientToAmountMap:PersistentMap<string, i32[]>) {
    }

    add(recipient:string, amount:i32): void {
        const sender = Context.sender;
        const hasSender = this.senderToRecipientMap.contains(sender);

        if(!hasSender) {
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
    
    names(sender:string):string[] {
        return this.senderToRecipientMap.contains(sender) ? this.senderToRecipientMap.getSome(sender) : [];
    }


    values(sender:string):i32[] {
        return this.recipientToAmountMap.contains(sender) ? this.recipientToAmountMap.getSome(sender) : [];
    }

    totalSent(sender:string, recipient:string):i32 {
        return this.recipientToAmountMap.getSome(sender)[this.names(sender).indexOf(recipient)]
    }
}