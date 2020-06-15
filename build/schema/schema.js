"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const resolversMap_1 = __importDefault(require("./../resolvers/resolversMap"));
const graphql_tools_1 = require("graphql-tools");
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const typeDefs = merge_graphql_schemas_1.mergeTypes(merge_graphql_schemas_1.fileLoader(`${__dirname}/**/*.graphql`), { all: true });
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers: resolversMap_1.default,
});
exports.default = schema;
