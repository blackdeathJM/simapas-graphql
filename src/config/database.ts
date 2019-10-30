import MongoClient from 'mongodb'
import chalk from 'chalk';

class Database
{
    async init()
    {
        const MONGODB = String(process.env.DATABASE);
        const client = await MongoClient.connect(MONGODB, {useUnifiedTopology: true, useNewUrlParser: true});
        const db = await client.db();
        if (client.isConnected())
        {
            console.log('====================DATABASE==================');
            console.log(`STATUS: ${chalk.greenBright('En linea')}`);
            console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`);
        }
        return db;
    }
}

export default Database;
