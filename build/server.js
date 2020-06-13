"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator)
{
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }

    return new (P || (P = Promise))(function(resolve, reject)
    {
        function fulfilled(value)
        {
            try
            {
                step(generator.next(value));
            } catch(e)
            {
                reject(e);
            }
        }

        function rejected(value)
        {
            try
            {
                step(generator["throw"](value));
            } catch(e)
            {
                reject(e);
            }
        }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function(mod)
{
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const environments_1 = __importDefault(require("./config/environments"));
const schema_1 = __importDefault(require("./schema/schema"));
const database_1 = __importDefault(require("./config/database"));
const path_1 = __importDefault(require("path"));
if(process.env.NODE_ENV !== 'production')
{
    const envs = environments_1.default;
}

function init()
{
    return __awaiter(this, void 0, void 0, function* ()
    {
        const docsGral = require('./configMuter/docs.routes');
        const app = express_1.default();
        const pubsub = new apollo_server_express_1.PubSub();
        app.use(body_parser_1.default.urlencoded({extended: false}));
        app.use(body_parser_1.default.json());
        app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        app.use(compression_1.default());
        app.use(function(req, res, next)
        {
            res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
        const database = new database_1.default();
        const db = yield database.init();
        const context = ({req, connection}) => __awaiter(this, void 0, void 0, function* ()
        {
            const token = req ? req.headers.authorization : connection.authorization;
            const cadena = req ? req.headers.cadena : connection.cadena;
            return {db, token, cadena, pubsub};
        });
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.default,
            context,
            introspection: true
        });
        server.applyMiddleware({app});
        app.use('/file', docsGral);
        app.use('/graphql', express_graphql_1.default({schema: schema_1.default}));
        const PORT = process.env.PORT || 5300;
        const httpServer = http_1.createServer(app);
        server.installSubscriptionHandlers(httpServer);
        httpServer.listen({
            port: PORT
        }, () =>
        {
            console.log('==============================SERVIDOR============================');
            console.log(`Sistema comercial Graphql http://localhost:${PORT}${server.graphqlPath}`);
            console.log(`Sistema comercial susbcripciones con Graphql ws://localhost:${PORT}${server.subscriptionsPath}`);
        });
    });
}

init().then();
