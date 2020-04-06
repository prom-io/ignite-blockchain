export class Command {
    readonly userId: string;
    readonly peerWallet: string;
    readonly peerIp: string;
    readonly data: object;

    constructor(userId: string, peerWallet: string, peerIp: string, data: object) {
        this.userId = userId;
        this.peerWallet = peerWallet;
        this.peerIp = peerIp;
        this.data = data;
    }
}
