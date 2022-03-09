// import 'graphql-import-node';
import {makeExecutableSchema} from "@graphql-tools/schema";
import {GraphQLSchema} from "graphql";
import {resolvers} from "../resolvers/resolversMap";
import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeTypeDefs} from "@graphql-tools/merge";

const typeArray = loadFilesSync(`${__dirname}/**/*.graphql`, {recursive: true});
const typeDefs = mergeTypeDefs(typeArray);

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});
