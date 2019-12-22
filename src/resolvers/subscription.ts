import {IResolvers} from "graphql-tools";
import {subscripciones} from "../config/constants";

const subscription: IResolvers =
    {
        Subscription:
            {
                cambioDepartamento:
                    {
                        subscribe: (_: void, __: any, {pubsub}) =>
                        {
                            return pubsub.asyncIterator(subscripciones.DEPARTAMENTO);
                        }
                    }
            }
    };
export default subscription;
