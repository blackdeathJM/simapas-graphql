import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import {ApolloServer, PubSub} from "apollo-server-express";
import {createServer} from 'http';
import schema from './schema/schema';
import Database from "./config/database";
import path from "path";
import cors from 'cors';
import expressPlayGround from 'graphql-playground-middleware-express';

if (process.env.NODE_ENV !== 'production') {
}

async function init() {
    const docsGral = require('./configMuter/docs.routes');
    const app = express();
    app.use('*', cors());
    app.use(compression());
    // app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        // res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

    const pubsub = new PubSub();
    const database = new Database();
    const db = await database.init();

    const context: any = async ({req, connection}: any) => {
        const token = req ? req.headers.authorization : connection.authorization;
        const cadena = req ? req.headers.cadena : connection.cadena;
        return {db, token, cadena, pubsub};
    };

    const server = new ApolloServer({
        schema,
        context,
        introspection: true
    });

    server.applyMiddleware({app});

    app.use('/file', docsGral);
        app.use('/', expressPlayGround({
     endpoint: '/graphql'
     }));
    // app.use('/graphql', graphqlHTTP({schema}));

    const PORT = process.env.PORT || 5300;
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(
        {
            port: PORT
        },
        () => {
            console.log('==============================SERVIDOR============================');
            console.log(`Sistema comercial Graphql http://localhost:${PORT}${server.graphqlPath}`);
            console.log(`Sistema comercial susbcripciones con Graphql ws://localhost:${PORT}${server.subscriptionsPath}`);
        }
    );
}

init().then();
