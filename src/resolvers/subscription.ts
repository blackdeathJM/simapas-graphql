import {IResolvers} from "graphql-tools";
import {SUBSCRIPCIONES} from "../config/constants";

const subscription: IResolvers =
    {
        Subscription:
            {
                cambioDepartamento:
                    {
                        subscribe: (_: void, __: any, {pubsub}) =>
                        {
                            return pubsub.asyncIterator(SUBSCRIPCIONES.DEPARTAMENTO);
                        }
                    },
                cambioDocInterna:
                    {
                        subscribe: (_: void, __: any, {pubsub}) =>
                        {
                            return pubsub.asyncIterator([SUBSCRIPCIONES.DOCINTERNA]);
                        }
                    },
                envNotUsuarioVisto:
                    {
                        subscribe: (_: void, __: void, {pubsub}) =>
                        {
                            return pubsub.asyncIterator([SUBSCRIPCIONES.NOT_DOC_INTERNA])
                        }
                    },
                /*                envNotUsuarioVisto:
                 {
                 subscribe: withFilter((pubsub) => pubsub.asyncIterator([subscripciones.NOT_DOC_INTERNA]), async (payload: any, variables: any) => {
                 return payload.NOT_DOC_INTERNA.usuarioDestino.usuario === variables.usuario
                 })
                 }*/
                envNotDocExterna:
                    {
                        subscribe: (_: void, __: void, {pubsub}) =>
                        {
                            return pubsub.asyncIterator([SUBSCRIPCIONES.NOT_DOC_EXTERNA])
                        }
                    }
            }
    };
export default subscription;
