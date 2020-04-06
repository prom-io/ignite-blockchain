export class Command {
    readonly id: string;
    readonly commentId: string;
    readonly peerWallet: string;
    readonly peerIp: string;
    readonly data: object;

    constructor(id: string, commentId: string, peerWallet: string, peerIp: string, data: object) {
        this.id = id;
        this.commentId = commentId;
        this.peerWallet = peerWallet;
        this.peerIp = peerIp;
        this.data = data;
    }
}
