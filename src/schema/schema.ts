import path from 'path';
import {GraphQLSchema} from "graphql";
import {makeExecutableSchema} from "graphql-tools";
import resolvers from './../resolvers/resolversMap';
import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeTypeDefs} from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypeDefs(typesArray);

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
export default schema;
