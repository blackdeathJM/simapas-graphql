import {Db, MongoClient} from 'mongodb';
export interface IConexionMongo
{
    db: Db;
    tr: MongoClient
}

export class Database
{
    async init()
    {
        const client = new MongoClient(String(process.env.BASEDATOS));
        await client.connect();


        const mongo: IConexionMongo =
            {
                db: client.db(),
                tr: client
            }
        return mongo;
    }
}

