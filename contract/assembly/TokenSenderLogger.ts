import { TokenSender } from './TokenSender';
import { logging } from 'near-sdk-as'

export class TokenSenderLogger {
    constructor(private tokenSender:TokenSender) {
    }

    add(recipient:string, amount:i32): void {
        logging.log(`Attempting to add { recipient: ${recipient}, amount: ${amount} }`);
        this.tokenSender.add(recipient, amount);
        logging.log("Successfully added");
    }
    
    names(user:string):string[] {
        logging.log(`Attempting to retrieve list of recipients of ${user}`);
        const recipientList = this.tokenSender.names(user);
        logging.log(`Successfully retrieved recipient list ${recipientList}`);
        return recipientList;
    }


    values(user:string):i32[] {
        logging.log(`Attempting to retrieve list of values of ${user}`);
        const valuesReceived = this.tokenSender.values(user);
        logging.log(`Successfully retrieved recipient list ${valuesReceived}`);
        return valuesReceived;
    }
}