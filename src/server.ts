import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import {ApolloServer, PubSub} from "apollo-server-express";
import {createServer} from 'http';
import Database from "./config/database";
import path from "path";
import {router} from "./configMuter/docs.routes";
import {IContext} from "./interfaces/context-interface";
import schema from "./schema";
import expressPlayground from 'graphql-playground-middleware-express';
import {graphqlHTTP} from "express-graphql";

async function init()
{
    const app = express();
    // const emitirEvento = new EventEmitter();
    // emitirEvento.setMaxListeners(1000);
    // const pubsub = new PubSub({eventEmitter: emitirEvento});

    const pubsub = new PubSub();
    const database = new Database();
    const db = await database.init();
    // const corsOpts = cors({origin: '*', credentials: false});
    //
    // app.use(corsOpts);
    app.use(compression());
    app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next)
    {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        // res.setHeader("Access-Control-Allow-Origin", "https://26.62.148.73:5642");
        // res.setHeader("Access-Control-Allow-Origin", "https://192.168.1.189:5642");
        res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, " +
            "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,');
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
        res.header('Allow', 'GET, POST, OPTIONS');
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });


    const context = async ({req, connection}: IContext) =>
    {
        const token = (req) ? req.headers.authorization : connection.authorization;
        const contexto = (req) ? req.headers.context : connection.context;
        return {db, token, pubsub, contexto};
    };
    const server = new ApolloServer({
        schema,
        context,
        playground: true,
        introspection: true
    });

    server.applyMiddleware({app});

    // app.get('/', expressPlayground({endpoint: '/graphql'}));
    // app.use('/', expressPlayground({endpoint: '/graphql',}));
    app.use('/graphql', graphqlHTTP({schema}));
    app.use('/file', router);

    const httpServer = createServer(app);
    const PORT = process.env.PORT || 5003;
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen({port: 5002}, () =>
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
