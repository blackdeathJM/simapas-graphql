import express from 'express';
import graphqlHTTP from 'express-graphql'
import {graphqlUploadExpress} from 'graphql-upload'
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServer, PubSub} from "apollo-server-express";
import {createServer} from 'http';
import environments from "./config/environments";
import schema from './schema/schema';
import Database from "./config/database";
import expressPlayground from 'graphql-playground-middleware-express';

if (process.env.NODE_ENV !== 'production')
{
    const envs = environments;
}

async function init()
{
    const app = express();
    const pubsub = new PubSub();
    app.use('*', cors());
    app.use(compression());

    const database = new Database();
    const db = await database.init();

    const context: any = async ({req, connection}: any) =>
    {
        const token = req ? req.headers.authorization : connection.authorization;
        const params = req ? req.headers.params : connection.params;
        return {db, token, pubsub};
    };
    const server = new ApolloServer({
        schema,
        context,
        introspection: true
    });
    server.applyMiddleware({app});
    app.use('/', expressPlayground({
            endpoint: '/graphql',
        }),
        //==================================================================
        bodyParser.json(),
        graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}),
        graphqlHTTP({schema})
        //====================================================================
    );

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
