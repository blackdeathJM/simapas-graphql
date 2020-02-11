import {IResolvers} from "graphql-tools";
import subscription from "./subscription";
import unionMutationResolver from "./unionMutation";
import unionQueryResolver from "./unionQuery";
import unionTypeResolver from "./unionTypes";

const resolvers: IResolvers =
    {
        ...unionQueryResolver,
        ...unionMutationResolver,
        ...subscription,
        ...unionTypeResolver
    };
export default resolvers;
