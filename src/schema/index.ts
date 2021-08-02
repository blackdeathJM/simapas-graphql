import 'graphql-import-node';
import {makeExecutableSchema} from "graphql-tools";
import {GraphQLSchema} from "graphql";
import path from 'path';
import {fileLoader, mergeTypes} from "merge-graphql-schemas";
import resolvers from "../resolvers/resolversMap";

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypes(typesArray, {all: true});

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

