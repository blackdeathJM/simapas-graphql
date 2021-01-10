import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../services/respuestas-return";
import {IContextData} from "../../../interfaces/context-data-interface";
import {notTodosDocsExt} from "../../presidencia/documentacion/docExt/services/docExt-subscription.service";

class DocUsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _acDocUrlEnUsuarioDestino(_id: string, usuario: string, docUrl: string, subproceso: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}},
            {
                $set: {
                    notificarAdministrador: true, "usuarioDestino.$.docUrl": docUrl, "usuarioDestino.$.subproceso": subproceso,
                    "usuarioDestino.$.notificarRespDelUsuario": true
                }
            },
            {returnOriginal: false}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                return respDocumento(resultado)
            }
        )
    }
}

export default DocUsuarioMutationService;
