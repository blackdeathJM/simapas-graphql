import MongoClient from 'mongodb';
import chalk from 'chalk';

class Database {
    async init() {
        const MONGODB = String(process.env.BASEDATOS);
        const client = await MongoClient.connect(MONGODB, {useUnifiedTopology: true, useNewUrlParser: true});
        const db = await client.db();
        if (client.isConnected()) {
            console.log('====================DATABASE==================');
            console.log(`STATUS: ${chalk.cyanBright('En linea')}`);
            console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`);
        }
        return db;
    }
}

export default Database;

/*import MongoClient from 'mongodb';
import chalk from 'chalk';

class Database {
    async init() {
        const MONGODB = String(process.env.BASEDATOS);
        await MongoClient.connect(MONGODB, {useUnifiedTopology: true, useNewUrlParser: true}).then(
            async (cliente) => {
                const db = await cliente.db();
                if (cliente.isConnected()) {
                    console.log('====================DATABASE==================');
                    console.log(`STATUS: ${chalk.cyanBright('En linea')}`);
                    console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`);
                }
                return db;
            }
        ).catch(error => {
            console.log('Ocurrio un error al establecer conexion con el servidor', error);
            console.log('Ocurrio un error al establecer conexion con el servidor', error);
        });
    }
}

export default Database;*/
