import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import moment from "moment";

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
                    console.log('usuario', resultado.elemento.asigUsuario);
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
                        async res =>
                        {
                            console.log('si entro', res);
                            return {estatus: true, mensaje: 'Se actualizo correctamente DocExt', folio: null}
                        }
                    );
                }
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, folio: resultado.elemento}
            }
        )
    }
}

export default FolioMutationService;
