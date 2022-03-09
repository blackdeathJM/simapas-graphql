import {unionMutationResolver} from "./unionMutation";
import {unionQueryResolver} from "./unionQuery";
import {unionSubscriptionResolver} from "./unionSubscription";
import {unionTypeResolver} from "./unionTypes";
import {mergeResolvers} from "@graphql-tools/merge";

export const resolversArray =
    [
        ...unionQueryResolver,
        ...unionMutationResolver,
        ...unionTypeResolver,
        ...unionSubscriptionResolver
    ];

export const resolvers = mergeResolvers(resolversArray);