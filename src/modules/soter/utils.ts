export const uuidv4 = (): string => {
    // tslint:disable-next-line:only-arrow-functions
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:no-bitwise one-variable-per-declaration
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const ts = (): number => {
    return Date.now();
};

export const objectToBuffer = (data: object): Buffer => {
    return Buffer.from(JSON.stringify(data));
};

export const fileNameGenerate = (fileName: string, ext: string): string => {
    return fileName + '.' + ext;
};
