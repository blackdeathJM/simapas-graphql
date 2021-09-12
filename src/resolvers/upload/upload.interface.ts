export interface IFileStream
{
    createReadStream: any;
    filename: string;
    mimetype: string;
    encoding: string;
}

export interface IFile
{
    id: string;
    filepath: string;
    mimetype: string;
    encoding: string;
    filename: string;
}
