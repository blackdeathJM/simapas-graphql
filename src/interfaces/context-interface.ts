export interface IContext
{
    req: IRequest;
    connection: IConnection;
}

interface IRequest
{
    headers: {
        authorization: string;
        context: object;
    };
}

interface IConnection
{
    authorization: string;
    context: object;
}
