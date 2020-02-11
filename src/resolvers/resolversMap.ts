import {IResolvers} from "graphql-tools";
import unionMutationResolver from "./unionMutation";
import unionQueryResolver from "./unionQuery";
import unionTypeResolver from "./unionTypes";
import unionSubscriptionResolver from "./unionSubscription";

const resolvers: IResolvers =
    {
        ...unionQueryResolver,
        ...unionMutationResolver,
        ...unionTypeResolver,
        ...unionSubscriptionResolver
    };
export default resolvers;
