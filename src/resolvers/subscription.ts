import {IResolvers} from "graphql-tools";
import {SUBSCRIPCIONES} from "../config/constants";
import {withFilter} from 'apollo-server'

const subscription: IResolvers =
    {
        Subscription:
            {
                cambioDepartamento:
                    {
                        subscribe: (_: void, __: any, {pubsub}) => {
                            return pubsub.asyncIterator(SUBSCRIPCIONES.DEPARTAMENTO);
                        }
                    },
                todosDocInterna:
                    {
                        subscribe: (_: void, __: any, {pubsub}) => {
                            return pubsub.asyncIterator(SUBSCRIPCIONES.NOT_DOC_INTERNA);
                        }
                    },
                todosDocsExt:
                    {
                        subscribe: withFilter((_: any, __: any, {pubsub}) => pubsub.asyncIterator([SUBSCRIPCIONES.NOT_DOC_EXTERNA]),
                            (payload, variables) => {
                                console.log('payload', payload);
                                console.log('variables', variables);
                                const valor = payload.todosDocsExt.role;
                                return valor === variables.role;
                            })
                    }
            }
    };

export default subscription;
