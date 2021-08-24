import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import {ApolloServer} from "apollo-server-express";
import {PubSub} from 'graphql-subscriptions';
import {createServer} from 'http';
import path from "path";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {execute, subscribe} from "graphql";
import {IContext} from "./interfaces/context-interface";
import {schema} from "./schema";
import Database from "./config/database";
import {router} from "./configMuter/docs.routes";
import depthLimit from "graphql-depth-limit";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";

async function init()
{
    const app = express();

    const pubsub = new PubSub();
    const database = new Database();
    const {db, tr} = await database.init();
    app.use(compression());

    // app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next)
    {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        // res.setHeader("Access-Control-Allow-Origin", "https://26.62.148.73:5642");
        // res.setHeader("Access-Control-Allow-Origin", "http://26.84.127.13:5642");
        res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, " +
            "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,');
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
        res.header('Allow', 'GET, POST, OPTIONS');
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });


    const context = ({req, connection}: IContext) =>
    {
        const token = (req) ? req.headers.authorization : connection.authorization;
        const contexto = (req) ? req.headers.context : connection.context;
        return {db, token, pubsub, contexto, tr};
    };

    const server = new ApolloServer({
        schema,
        context,
        introspection: true,
        validationRules: [depthLimit(4)]
    });

    await server.start();
    server.applyMiddleware({app});

    app.get('/', function (_, res)
    {
        res.redirect("/graphql");
    });
    app.use('/file', router);

    const httpServer = createServer(app);
    const subscriptionServer = SubscriptionServer.create({schema, execute, subscribe}, {server: httpServer, path: server.graphqlPath});

    ['SIGINT', 'SIGTERM'].forEach(signal => {process.on(signal, () => subscriptionServer.close())});

    const PORT = process.env.PORT || 5003;

    httpServer.listen({port: PORT}, () =>
        {
            console.log('env', process.env.BASEDATOS);
            console.log('==============================SERVIDOR============================');
            console.log(`Sistema comercial Graphql http://localhost:${PORT}${server.graphqlPath}`);
            console.log('==============================SOCKET============================');
            console.log(`Sistema comercial susbcripciones con Graphql ws://localhost:${PORT}${server}`);
        }
    );
}

init().catch(e => console.log(e));
