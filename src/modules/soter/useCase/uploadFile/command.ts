export class Command {
    readonly id: string;

    readonly file: any;

    constructor(file: any, id: string) {
        this.file = file;
        this.id = id;
    }
}
