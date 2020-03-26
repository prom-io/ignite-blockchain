export class Command {
    readonly id: string;
    readonly userId: string;
    readonly data: object;

    constructor(id: string, userId: string, data: object) {
        this.id = id;
        this.userId = userId;
        this.data = data;
    }
}
