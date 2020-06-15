"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const docExt_subscription_resolver_1 = __importDefault(require("./docExt/docExt.subscription.resolver"));
const docInterna_subscription_resolver_1 = __importDefault(require("./docInterna/docInterna.subscription.resolver"));
const unionSubscriptionResolver = graphql_merge_resolvers_1.default.merge([docExt_subscription_resolver_1.default, docInterna_subscription_resolver_1.default]);
exports.default = unionSubscriptionResolver;
