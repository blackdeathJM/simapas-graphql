import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import {respDocumento} from "../../../services/respuestas-return";
import {ObjectId} from 'bson';
import {notTodosDocsExt} from "../../docExt/services/docExt-subscription";

class FolioMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object)
    {super(root, variables, context);}

    async _registrarFolio()
    {

        return await this.agregarUnElemento(COLECCION.FOLIOS, this.variables.folio!, {}).then(
            async resultado =>
            {
                if (resultado.elemento.folioRespuesta !== 'Independiente')
                {
                    await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(this.variables._id)},
                        {
                            $set: {
                                proceso: 'TERMINADO', fechaTerminado: resultado.elemento.fechaCreacion, folio: resultado.elemento.folio,
                                "usuarioDestino.$[].subproceso": 'TERMINADO'
                            }
                        }, {});
                }
                return respDocumento(resultado)
            }
        )
    }

    async _acUrlFolio()
    {
        // Actualiar el archivo subido en la coleccion de folios y DocsExt
        const variables = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.FOLIOS, {_id: new ObjectId(variables[0])},
            {$set: {archivoUrl: variables[1], proceso: 'TERMINADO'}}, {returnOriginal: false}).then(
            async resultado =>
            {
                if (resultado.elemento.folioRespuesta !== 'Independiente')
                {
                    await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {folio: resultado.elemento.folio},
                        {
                            $set: {
                                docRespUrl: resultado.elemento.archivoUrl, proceso: 'ACUSE', "usuarioDestino.$[].subproceso": 'ACUSE'
                            }
                        },
                        {}).then(
                        async () =>
                        {
                            await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                        }
                    );
                }
                return respDocumento(resultado);
            }
        )
    }
}

export default FolioMutationService;
