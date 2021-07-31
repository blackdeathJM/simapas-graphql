// import {IResolvers} from "graphql-tools";
import unionMutationResolver from "./unionMutation";
import unionQueryResolver from "./unionQuery";
import unionSubscriptionResolver from "./unionSubscription";
import unionTypeResolver from "./unionTypes";
import {IResolvers} from "graphql-middleware/dist/types";

const resolvers: IResolvers =
    {
        ...unionQueryResolver,
        ...unionMutationResolver,
        ...unionTypeResolver,
        ...unionSubscriptionResolver
    };
export default resolvers;
