import {IResolvers} from "graphql-tools";
import {SUBSCRIPCIONES} from "../../config/global";

const docInternaSubscription: IResolvers =
    {
        Subscription:
            {
                todosDocInterna:
                    {
                        subscribe: (_: void, __: any, {pubsub}) =>
                        {
                            return pubsub.asyncIterator([SUBSCRIPCIONES.NOT_DOC_INTERNA]);
                        }
                    }
            }
    };
export default docInternaSubscription;
/*
 subscribe: withFilter((_: any, __: any, {pubsub}) => pubsub.asyncIterator([SUBSCRIPCIONES.NOT_DOC_EXTERNA]),
 (payload, variables) => {
 console.log('payload', payload);
 console.log('variables', variables);
 const valor = payload.todosDocsExt.role;
 return valor === variables.role;
 })*/
