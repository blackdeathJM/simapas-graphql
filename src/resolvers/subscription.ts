import {IResolvers} from "graphql-tools";

const subscription: IResolvers = {
    Subscription: {
        cambioDepartamento: {
            subscribe: (_: void, __: any, {pubsub}) =>
            {
                return pubsub.asyncIterator('cambioDepartamentos');
            }
        }
    }
};

export default subscription;
