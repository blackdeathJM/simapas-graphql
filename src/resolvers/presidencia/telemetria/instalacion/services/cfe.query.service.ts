import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";

export class CfeQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _recibosCfePorAno(_id: string, medidor: string, ano: number)
    {
        const agrupRecibos = await this.agregacion(COLECCION.TELEMETRIA, [
            {$match: {_id: new ObjectId(_id)}},
            {$project: {medidores: true}},
            {$unwind: "$medidores"},
            {$match: {"medidores.medidor": medidor}},
            {$unwind: "$medidores.recibos"},
            {$group: {_id: "$medidores.recibos.ano"}}
            // {$group: {_id: {"medidores.recibos.ano": "$medidores.recibos.ano"}}}
        ]);

        console.log(agrupRecibos)
    }
}
