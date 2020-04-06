export class Command {
    readonly id: string;
    readonly userId: string;
    readonly peerWallet: string;
    readonly peerIp: string;
    readonly data: object;

    constructor(id: string, userId: string, peerWallet: string, peerIp: string, data: object) {
        this.id = id;
        this.userId = userId;
        this.peerWallet = peerWallet;
        this.peerIp = peerIp;
        this.data = data;
    }
}
