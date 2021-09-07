import {unionMutationResolver} from "./unionMutation";
import {unionQueryResolver} from "./unionQuery";
import {unionSubscriptionResolver} from "./unionSubscription";
import {unionTypeResolver} from "./unionTypes";

export const resolvers =
    {
        ...unionQueryResolver,
        ...unionMutationResolver,
        ...unionTypeResolver,
        ...unionSubscriptionResolver
    };
