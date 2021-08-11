import {Db} from "mongodb";
import {PubSub} from 'graphql-subscriptions';

export interface IContextData
{
    db?: Db;
    pubsub?: PubSub;
    token?: string;
    contexto?: any;
}
