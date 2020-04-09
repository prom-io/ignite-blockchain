export class Command {
    readonly id: string;
    readonly peerWallet: string;
    readonly peerIp: string;
    readonly file: any;

    constructor(id: string, peerWallet: string, peerIp: string, file: any) {
        this.id = id;
        this.peerWallet = peerWallet;
        this.peerIp = peerIp;
        this.file = file;
    }
}
