import {IResolvers} from "graphql-tools";
import {withFilter} from 'graphql-subscriptions';
import {PUB_SUB} from "../../../config/global";
import {INotificacion} from "./model/notificacion.interface";

let filtro: boolean = false;
const notSubscription: IResolvers =
    {
        Subscription:
            {
                notificar:
                    {
                        subscribe: withFilter((_: void, __: void, {pubsub}) => pubsub.asyncIterator(PUB_SUB.NOT_NOTIFICACION),
                            (payload, variables) =>
                            {
                                payload.notificar.forEach((noti: INotificacion) =>
                                {
                                    noti.receptor.forEach((rec: string) =>
                                    {
                                        filtro = rec === variables.receptor
                                    });
                                });
                                return filtro;
                            })
                    }
            }
    }
export default notSubscription
