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
                nvaNotInterna:
                    {
                        /*               subscribe: withFilter((_: any, __: any, {pubsub}) => pubsub.asyncIterator([SUBSCRIPCIONES.NEW_DOC_INTERNA]),
                         (payload, variables) =>
                         {
                         const valor = payload.nvaNotInterna.usuarioDestino.filter((filtroSubDoc: any) => filtroSubDoc.usuario === variables.usuario)

                         return valor[0].usuario === variables.usuario;
                         })*/
                        subscribe: (_: void, __: void, {pubsub}) => {
                            return pubsub.asyncIterator(SUBSCRIPCIONES.NEW_DOC_INTERNA);
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
