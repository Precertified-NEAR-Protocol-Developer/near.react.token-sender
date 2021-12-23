export interface TokenSenderInterface {
    add(recipient:string, amount:i32): void;
    names(sender:string):string[];
    values(sender:string):i32[];
    totalSent(sender:string, recipient:string):i32;
}