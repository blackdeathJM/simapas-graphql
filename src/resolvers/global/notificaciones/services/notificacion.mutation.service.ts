import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {INotificacion} from "../model/notificacion.interface";
import {COLECCION} from "../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../services/respuestas-return";
import {notNotificacion} from "./notificacion.subscription.service";

export class NotificacionMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _regNotificacion(notificacion: INotificacion)
    {
        return await this.agregarUnElemento(COLECCION.NOT, notificacion, {}).then(
            async resultado =>
            {
                await notNotificacion(this.context.pubsub!, this.context.db!, notificacion.receptor);
                return respDocumento(resultado);
            });
    }

    async _eliminarNotificacion(_id: string)
    {
        return await this.buscarUnoYEleminiar(COLECCION.NOT, {_id: new ObjectId(_id)}, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            })
    }
}
