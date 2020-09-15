import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import moment from "moment";
import {respDocumento} from "../../../services/respuestas-return";
import {ObjectId} from 'bson';

class FolioMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object)
    {super(root, variables, context);}

    async registrarFolio()
    {
        return await this.agregarUnElemento(COLECCION.FOLIOS, this.variables.folio!, {}).then(
            async resultado =>
            {
                if (resultado.elemento.folioRespuesta !== "Independiente")
                {
                    let fechaActual = moment().format('DD/MM/YYYY');
                    await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
                        {
                            identificadorDoc: resultado.elemento.folioRespuesta,
                            usuarioDestino: {$elemMatch: {usuario: resultado.elemento.asigUsuario}}
                        },
                        {
                            $set: {
                                folio: resultado.elemento.folio, proceso: "TERMINADO",
                                "usuarioDestino.$.subproceso": "TERMINADO", "usuarioDestino.$.fechaEnvio": fechaActual
                            }
                        },
                        {}).then(
                        async () =>
                        {
                            return {estatus: true, mensaje: 'Se actualizo correctamente DocExt', folio: null}
                        }
                    );
                }
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, folio: resultado.elemento}
            }
        )
    }

    async _acUrlFolio()
    {
        const variables = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.FOLIOS, {_id: new ObjectId(variables[0])},
            {$set: {archivoUrl: variables[1], proceso: 'TERMINADO'}}, {returnOriginal: false}).then(
            async resultado =>
            {
                // actualizar la url de respuesta en doc externa

                return respDocumento(resultado);
            }
        )
    }
}

export default FolioMutationService;
