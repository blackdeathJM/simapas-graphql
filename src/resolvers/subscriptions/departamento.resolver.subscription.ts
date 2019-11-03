import {IResolvers} from "graphql-tools";

const Subscriptiondepartamento: IResolvers =
    {
        Subscription:
            {
                cambioDepartamento:
                    {
                        subscribe: (_: void, __: any, {pubsub}) =>
                        {
                            return pubsub.asyncIterator('cambioDepartamentos');
                        }
                    }
            }
    };

export default Subscriptiondepartamento;
