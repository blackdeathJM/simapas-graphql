import {Server} from "./app";
import {schema} from "./schema";


const server = new Server(schema);


server.listen((port: number) =>
{
    console.log(`servidor graphql funcionando correctamente: http://localhost:${port}`);
});
