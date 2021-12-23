import { TokenSender } from './TokenSender';
import { TokenSenderLoggerImpl } from './TokenSenderLoggerImpl';
import { TokenSenderInterface } from './TokenSenderInterface';
import { PersistentMap } from 'near-sdk-as'

export class TokenSenderFactory {

    static getNew(senderMap:PersistentMap<string, string[]>, receiverMap:PersistentMap<string, i32[]>): TokenSenderInterface {
        return new TokenSender(senderMap, receiverMap);
    }

    static getLogged(tokenSender:TokenSenderInterface):TokenSenderInterface {
        return new TokenSenderLoggerImpl(tokenSender);
    }
    
    static getDefault(): TokenSenderInterface {
        return TokenSenderFactory.getNew(
            new PersistentMap<string, string[]>('SenderToRecipientMap'),
            new PersistentMap<string, i32[]>('SenderToAmountMap'));
    }

    static getDefaultLogged(): TokenSenderInterface {
        return TokenSenderFactory.getLogged(TokenSenderFactory.getDefault());
    }
}