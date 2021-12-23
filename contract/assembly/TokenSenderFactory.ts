import { TokenSender } from './TokenSender';
import { TokenSenderLogger } from './TokenSenderLogger';
import { TokenSenderInterface } from './TokenSenderInterface';
import { PersistentMap } from 'near-sdk-as'

export class TokenSenderFactory {

    static getNew(senderMap:PersistentMap<string, string[]>, receiverMap:PersistentMap<string, i32[]>): TokenSenderInterface {
        return new TokenSender(senderMap, receiverMap);
    }

    static getDefault(): TokenSenderInterface {
        return TokenSenderFactory.getNew(
            new PersistentMap<string, string[]>('SenderToRecipientMap'),
            new PersistentMap<string, i32[]>('RecipientToAmountMap'));
    }

    static getLogged(): TokenSenderInterface {
        return new TokenSenderLogger(TokenSenderFactory.getDefault());
    }
}