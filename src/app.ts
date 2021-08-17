import compression from "compression";
import express, {Application} from "express";
import cors from "cors";
import {ApolloServer} from "apollo-server-express";

import {createServer, Server as HTTPServer} from "http";
import {execute, GraphQLSchema, subscribe} from "graphql";

import {SubscriptionServer} from "subscriptions-transport-ws";

import Database from "./config/database";
import {IContext} from "./interfaces/context-interface";
import {router} from "./configMuter/docs.routes";
import depthLimit from "graphql-depth-limit";
import {PubSub} from "graphql-subscriptions";


export class Server
{
    private app!: Application;
    private httpServer!: HTTPServer;
    private readonly puerto = process.env.PORT || 3003
    private pubsub = new PubSub();
    private database = new Database();
    private context: any;

    constructor(private schema: GraphQLSchema)
    {
        if (schema === undefined)
        {
            throw new Error("Necesitas un esquema para poder trabajar con graphql");
        }

        this.initialize();
    }

    private initialize()
    {
        this.configExpress();
        this.configApolloServer().then();
        this.createServer();
        this.configRoutes();
    }

    private configExpress()
    {
        this.app = express();
        this.app.use(cors());
        this.app.use(compression());

    }

    private async configApolloServer()
    {
        const {db, tr} = await this.database.init();

        this.context = ({req, connection}: IContext) =>
        {
            const token = (req) ? req.headers.authorization : connection.authorization;
            const contexto = (req) ? req.headers.context : connection.context;
            return {db, token, pubsub: this.pubsub, contexto, tr};
        }

        const server = new ApolloServer({
            schema: this.schema,
            introspection: true,
            validationRules: [depthLimit(4)],
            context: this.context
        });

        await server.start().then();
        server.applyMiddleware({app: this.app, cors: true});
    }

    private configRoutes()
    {
        this.app.use('/file', router);
        this.app.get('/', function (_, res)
        {
            res.redirect("/graphql");
        });
    }

    private createServer()
    {
        this.httpServer = createServer(this.app);
        const subscriptionServer = SubscriptionServer.create({
                schema: this.schema, execute, subscribe, onConnect()
                {
                    console.log("conectado");
                }, onDisconnect()
                {
                    console.log("Desconectado");
                }
            },
            {server: this.httpServer, path: '/graphql'});
        ['SIGINT', 'SIGTERM'].forEach(signal => {process.on(signal, () => subscriptionServer.close());});
    }

    listen(callback: (port: number) => void): void
    {
        this.httpServer.listen(this.puerto, () =>
        {
            callback(+this.puerto)
        });
    }
}
