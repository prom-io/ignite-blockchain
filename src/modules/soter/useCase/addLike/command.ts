export class Command {
    readonly id: string;
    readonly commentId: string;
    readonly data: object;

    constructor(id: string, commentId: string, data: object) {
        this.id = id;
        this.commentId = commentId;
        this.data = data;
    }
}
