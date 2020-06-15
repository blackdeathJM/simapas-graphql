"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const departamento_mutation_resolver_1 = __importDefault(require("./departamentos/departamento.mutation.resolver"));
const docExt_mutation_resolver_1 = __importDefault(require("./docExt/docExt.mutation.resolver"));
const usuario_mutation_resolver_1 = __importDefault(require("./usuarios/usuario.mutation.resolver"));
const folio_mutation_resolver_1 = __importDefault(require("./folios/folio.mutation.resolver"));
const docInterna_mutation_resolver_1 = __importDefault(require("./docInterna/docInterna.mutation.resolver"));
const unionMutationResolver = graphql_merge_resolvers_1.default.merge([docExt_mutation_resolver_1.default, departamento_mutation_resolver_1.default, usuario_mutation_resolver_1.default, folio_mutation_resolver_1.default, docInterna_mutation_resolver_1.default]);
exports.default = unionMutationResolver;
