import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {IParametros} from "../../models/parametros-electricos.interface";
import {nvaProp} from "../../../../../services/definirPropiedades";
import {ObjectId} from "bson";
import {COLECCION} from "../../../../../config/global";
import {respDocumento} from "../../../../../services/respuestas-return";

export class LecturasParametrosMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _regParamElectricos(_id: string, parametrosElectricos: IParametros, parametro: string)
    {
        // Buscar
        // si existe el parametro electrico
        const idDocumento = {_id: new ObjectId(_id)}

        const consulta = nvaProp(`parametrosElectricos.${parametro}`, {
            $elemMatch: {ano: parametrosElectricos.ano, mes: parametrosElectricos.mes}
        });

        const actualizar = nvaProp(`parametrosElectricos.${parametro}`, parametrosElectricos);

        const existe = await this.buscarUnElemento(COLECCION.TELEMETRIA, Object.assign(idDocumento, consulta), {});


        if (existe.estatus)
        {
            return respDocumento(existe);
        } else
        {
            const resultado = await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(_id)},
                {$addToSet: actualizar}, {returnDocument: "after", upsert: true});

            return respDocumento(resultado);

        }
    }
}
