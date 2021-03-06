import {IResolvers} from "graphql-tools";
import {PUB_SUB} from "../../../../config/global";
import {PubSub, withFilter} from "apollo-server-express";
import {IDocExt} from "./models/docExt.interface";

let filtro: boolean = false;
const docExtSubscription: IResolvers =
    {
        Subscription:
            {
                todosDocsExtSub:
                    {
                        subscribe: (_, __, {pubsub}) =>
                        {
                            const subscripcion = pubsub as PubSub;
                            return subscripcion.asyncIterator([PUB_SUB.DOC_EXT]);
                        }
                    },
                docSubProceso:
                    {
                        subscribe: withFilter((_: void, __: void, {pubsub}) => pubsub.asyncIterator(PUB_SUB.DOC_EXT_USUSUBPROCESO),
                            (payload, variables) =>
                            {
                                payload.docSubProceso.forEach((d: IDocExt) =>
                                {
                                    d.usuarioDestino.forEach(value =>
                                    {
                                        filtro = value.usuario === variables.usuario;
                                    })
                                });
                                return filtro;
                            })
                    }
            }
    };
export default docExtSubscription;
