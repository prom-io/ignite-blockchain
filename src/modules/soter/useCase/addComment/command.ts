export class Command {
    readonly id: string;
    readonly data: object;

    constructor(id: string, data: object) {
        this.id = id;
        this.data = data;
    }
}
