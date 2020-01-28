import {IResolvers} from "graphql-tools";
import {subscripciones} from "../config/constants";
import {withFilter} from 'apollo-server';

const subscription: IResolvers =
    {
        Subscription:
            {
                cambioDepartamento:
                    {
                        subscribe: (_: void, __: any, {pubsub}) => {
                            return pubsub.asyncIterator(subscripciones.DEPARTAMENTO);
                        }
                    },
                cambioDocInterna:
                    {
                        subscribe: (_: void, __: any, {pubsub}) => {
                            return pubsub.asyncIterator([subscripciones.DOCINTERNA]);
                        }
                    },
                envNotUsuarioVisto:
                    {
                        subscribe: withFilter((pubsub) => pubsub.asyncIterator([subscripciones.NOT_DOC_INTERNA]), async (payload: any, variables: any) => {
                            return payload.NOT_DOC_INTERNA.usuarioDestino.usuario === variables.usuario
                        })
                    }
            }
    };
export default subscription;
