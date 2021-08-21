import {PUB_SUB} from "../../../../config/global";
import {withFilter} from 'graphql-subscriptions';
import {IDocExt} from "./models/docExt.interface";
import {IResolvers} from "graphql-middleware/dist/types";
import {pubsub} from "../../../../app";

let filtro: boolean = false;

export const docExtSubscription: IResolvers =
    {
        Subscription:
            {
                todosDocsExtSub:
                    {
                        subscribe: () =>
                        {
                            return pubsub.asyncIterator([PUB_SUB.DOC_EXT]);
                        }
                    },
                docSubProceso:
                    {
                        subscribe: withFilter(( ) => pubsub.asyncIterator(PUB_SUB.DOC_EXT_SUB_PROCESO),
                            (payload, variables) =>
                            {
                                console.log(payload, variables);
                                payload.docSubProceso.forEach((d: IDocExt) =>
                                {
                                    d.usuarioDestino.forEach(value =>
                                    {
                                        return filtro = value.usuario === variables.usuario;
                                    })
                                });
                                return filtro;
                            })
                    }
            }
    };
