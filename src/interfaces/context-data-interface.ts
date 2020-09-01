import {Db} from "mongodb";
import {PubSub} from "apollo-server-express";

export interface IContextData
{
    db?: Db;
    pubsub?: PubSub;
    token?: string;
    contexto?: object
}
