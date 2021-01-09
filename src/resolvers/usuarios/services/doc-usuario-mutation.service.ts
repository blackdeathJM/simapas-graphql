import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../services/respuestas-return";
import {IContextData} from "../../../interfaces/context-data-interface";

class DocUsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _acDocUrlEnUsuarioDestino(_id: string, usuario: string, docUrl: string, subproceso: string)
    {
        // Aumentamos na notificacion del administrador en 1
        const notificacionesAdminitrador = await this.buscarUnElemento(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)}, {});
        let totalNotificaciones = notificacionesAdminitrador.elemento.notificarAdministrador + 1;
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}},
            {
                $set: {
                    notificarAdministrador: totalNotificaciones, "usuarioDestino.$.docUrl": docUrl, "usuarioDestino.$.subproceso": subproceso,
                    "usuarioDestino.$.notificarRespDelUsuario": true
                }
            },
            {returnOriginal: false}).then(
            async resultado =>
            {
                console.log('resultado', resultado);
                return respDocumento(resultado)
            }
        )
    }
}

export default DocUsuarioMutationService;
