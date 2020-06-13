"use strict";
var __importDefault = (this && this.__importDefault) || function(mod)
{
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const docExt_query_resolver_1 = __importDefault(require("./docExt/docExt.query.resolver"));
const departamento_query_resolver_1 = __importDefault(require("./departamentos/departamento.query.resolver"));
const usuario_query_resolver_1 = __importDefault(require("./usuarios/usuario.query.resolver"));
const folio_query_resolver_1 = __importDefault(require("./folios/folio.query.resolver"));
const docInterna_query_Resolver_1 = __importDefault(require("./docInterna/docInterna.query.Resolver"));
const unionQueryResolver = graphql_merge_resolvers_1.default.merge([docExt_query_resolver_1.default, departamento_query_resolver_1.default, usuario_query_resolver_1.default, folio_query_resolver_1.default, docInterna_query_Resolver_1.default]);
exports.default = unionQueryResolver;
