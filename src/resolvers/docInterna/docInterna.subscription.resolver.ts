import {IResolvers} from "graphql-tools";
import {SUBSCRIPCIONES} from "../../config/constants";

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
                    },
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
/*
 notAgDocInterna:
 {
 subscribe: withFilter((_: any, __: any, {pubsub}) => pubsub.asyncIterator([SUBSCRIPCIONES.NOT_DOC_INTERNA_AG]),
 (payload, variables) => {
 console.log('payload', payload);
 console.log('variables', variables);
 return true
 })
 },*/
