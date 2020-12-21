import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import {ApolloServer, PubSub} from "apollo-server-express";
import {createServer} from 'http';
import schema from './schema/schema';
import Database from "./config/database";
import path from "path";
import expressPlayground from 'graphql-playground-middleware-express';
import {router} from "./configMuter/docs.routes";
import {IContext} from "./interfaces/context-interface";
// import {graphqlHTTP} from "express-graphql";

// import cors from 'cors';

async function init()
{
    const app = express();
    const pubsub = new PubSub();
    const database = new Database();
    const db = await database.init();
    // app.use(cors());
    app.use(compression());
    app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next)
    {
        res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.169:5642");
        res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,');
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
        res.header('Allow', 'GET, POST, OPTIONS');
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });


    const context: any = async ({req, connection}: IContext) =>
    {
        const token = (req) ? req.headers.authorization : connection.authorization;
        const contexto = (req) ? req.headers.context : connection.context;
        return {db, token, pubsub, contexto};
    };
    const server = new ApolloServer({
        schema,
        context,
        introspection: true
    });
    server.applyMiddleware({app});
    app.get('/', expressPlayground({endpoint: '/graphql'}));
    // app.use('/', expressPlayground({endpoint: '/graphql',}));
    // app.use('/graphql', graphqlHTTP({schema}));

    app.use('/file', router);
    const httpServer = createServer(app);
    const PORT = process.env.PORT || 5003;
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(
        {
            port: 5002
        },
        () =>
        {
            console.log('env', process.env.BASEDATOS);
            console.log('==============================SERVIDOR============================');
            console.log(`Sistema comercial Graphql http://localhost:${PORT}${server.graphqlPath}`);
            console.log('==============================SOCKET============================');
            console.log(`Sistema comercial susbcripciones con Graphql ws://localhost:${PORT}${server.subscriptionsPath}`);
        }
    );
}

init().then();
