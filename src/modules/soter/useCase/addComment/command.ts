export class Command {
    public readonly commentId: string;
    public readonly postId: string;
    public readonly peerWallet: string;
    public readonly peerIp: string;
    public readonly data: object;

    constructor(commentId: string, postId: string, peerWallet: string, peerIp: string, data: object) {
        this.commentId = commentId;
        this.postId = postId;
        this.peerWallet = peerWallet;
        this.peerIp = peerIp;
        this.data = data;
    }
}
