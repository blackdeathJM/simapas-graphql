import {Db, MongoClient} from 'mongodb';
import assert from 'assert';
export interface IConexionMongo
{
    db: Db;
    tr: MongoClient
}

class Database
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

export default Database;
