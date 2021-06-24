import {Db, MongoClient} from 'mongodb';
import chalk from 'chalk';

export interface IConexionMongo
{
    db: Db;
    tr: MongoClient
}

class Database
{
    async init()
    {
        const client = await MongoClient.connect(String(process.env.BASEDATOS), {useUnifiedTopology: true, useNewUrlParser: true});
        if (client.isConnected())
        {
            console.log('====================DATABASE==================');
            console.log(`STATUS: ${chalk.cyanBright('En linea')}`);
            console.log(`DATABASE: ${chalk.greenBright(client.db().databaseName)}`);
        }

        const mongo: IConexionMongo =
            {
                db: client.db(),
                tr: client
            }
        return mongo;
    }
}

export default Database;
