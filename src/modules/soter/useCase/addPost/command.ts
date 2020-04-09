export class Command {
    readonly id: string;
    readonly peerWallet: string;
    readonly peerIp: string;
    readonly data: object;

    constructor(id: string, peerWallet: string, peerIp: string, data: object) {
        this.id = id;
        this.peerWallet = peerWallet;
        this.peerIp = peerIp;
        this.data = data;
    }
}
