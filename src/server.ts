import express from 'express';
import graphqlHTTP from 'express-graphql'
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServer, PubSub} from "apollo-server-express";
import {createServer} from 'http';
import environments from "./config/environments";
import schema from './schema/schema';
import Database from "./config/database";
import expressPlayground from 'graphql-playground-middleware-express';
import path from "path";
import multer from "multer";
import uuidv4 from "uuidv4";

if (process.env.NODE_ENV !== 'production')
{
    const envs = environments;
}

async function init()
{
    const app = express();
    const storage = multer.diskStorage({
        destination: path.join(__dirname, 'public/uploads'),
        filename: (req, file, cb) =>
        {
            cb(null, uuidv4() + path.extname(file.originalname));
        }
    });
    app.use(multer({
        storage,
        dest: path.join(__dirname, 'public/uploads'),
        fileFilter: function (req, file, cb)
        {

            const filetypes = /jpeg|jpg|png|.pdf/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

            if (mimetype && extname)
            {
                return cb(null, true);
            }
            cb(null, false);
        },
        limits: {fileSize: 1000000},
    }).single('archivo'));

    const pubsub = new PubSub();
    app.use('*', cors());
    app.use(compression());
    app.use(bodyParser.json());
// importar rutas
//     const archivosRoutes = require('./operaciones/mutations/upload.mutation');
    const database = new Database();
    const db = await database.init();

    const context: any = async ({req, connection}: any) =>
    {
        const token = req ? req.headers.authorization : connection.authorization;
        // const params = req ? req.headers.params : connection.params;
        return {db, token, pubsub};
    };
    const server = new ApolloServer({
        schema,
        context,
        introspection: true
    });
    server.applyMiddleware({app});

    // app.use(require('./operaciones/mutations/upload.mutation'));
    app.use('/', expressPlayground({
            endpoint: '/graphql',
        }),
        graphqlHTTP({schema})
    );
    // ruta estatica para el uso de multer
    app.use(express.static(path.join(__dirname, 'public')));

    const PORT = process.env.PORT || 5300;
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(
        {
            port: PORT
        },
        () =>
        {
            console.log('==============================SERVIDOR============================');
            console.log(`Sistema comercial Graphql http://localhost:${PORT}${server.graphqlPath}`);
            console.log(`Sistema comercial susbcripciones con Graphql ws://localhost:${PORT}${server.subscriptionsPath}`);
        }
    );
}

init().then();
