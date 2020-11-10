import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {COLECCION} from "../../../../config/global";
import * as _ from "lodash";
import {respArreglosSPag} from "../../../../services/respuestas-return";
import {ObjectId} from 'bson';

class InstalacionQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _todasInstalaciones()
    {
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resultado => respArreglosSPag(resultado)
        )
    }

    async _ipDuplicada()
    {
        let valoresDb: any[] = [];
        let valoresRecibidos = _.flattenDeep(_.toArray(this.variables.telemetria));
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resul =>
            {
                resul.elementos?.forEach(value =>
                {
                    if (value.telemetria !== undefined)
                    {
                        valoresDb.push(_.toArray(value.telemetria));
                    }
                });
                return _.differenceWith(valoresRecibidos, _.flattenDeep(valoresDb));
            }
        )
    }

    async _reciboCfeDuplicado(ano: number, mes: number, medidor: string)
    {
        return await this.buscarUnElemento(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id), recibosCfe: {$elemMatch: {ano, mes, medidor}}}, {}).then(
            resulado =>
            {
                return resulado.estatus
            }
        )
    }
}

export default InstalacionQueryService
