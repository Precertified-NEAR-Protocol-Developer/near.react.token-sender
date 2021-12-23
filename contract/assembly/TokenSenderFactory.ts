import { TokenSenderImpl } from './TokenSenderImpl';
import { TokenSenderLogger } from './TokenSenderLogger';
import { TokenSenderInterface } from './TokenSenderInterface';
import { PersistentMap } from 'near-sdk-as'

export class TokenSenderFactory {

    static getNew(senderMap:PersistentMap<string, string[]>, receiverMap:PersistentMap<string, i32[]>): TokenSenderInterface {
        return new TokenSenderImpl(senderMap, receiverMap);
    }

    static getLogged(tokenSender:TokenSenderInterface):TokenSenderInterface {
        return new TokenSenderLogger(tokenSender);
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