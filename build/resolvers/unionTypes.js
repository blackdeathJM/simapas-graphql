"use strict";
var __importDefault = (this && this.__importDefault) || function(mod)
{
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const departamento_type_resolver_1 = __importDefault(require("./departamentos/departamento.type.resolver"));
const unionTypeResolver = graphql_merge_resolvers_1.default.merge([departamento_type_resolver_1.default]);
exports.default = unionTypeResolver;
