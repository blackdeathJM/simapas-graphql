import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {ILecturas} from "../../models/lecturas-interface";
import {ObjectId} from "bson";
import {COLECCION} from "../../../../../config/global";
import {nvaProp} from "../../../../../services/definirPropiedades";
import {respDocumento} from "../../../../../services/respuestas-return";

export class LectMedMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _regLecturas(_id: string, tipo: string, lecturas: ILecturas, mes: string)
    {
        const idDoc = {_id: new ObjectId(_id)};
        const l = 'lecturas';

        const agregarSubDoc = nvaProp(`${l}.${tipo}`, lecturas);
        const consultaAno = nvaProp(`${l}.${tipo}.ano`, lecturas.ano);
        const consultaMes = nvaProp(`${l}.${tipo}.${mes.toLowerCase()}`, {$exists: true});

        const result = await this.context.db?.collection(COLECCION.TELEMETRIA).aggregate(
            [
                {
                    $match: {_id: new ObjectId(_id)}
                },
                {
                    $match: consultaAno
                },
                {
                    $project: {_id}
                }
            ]
        ).toArray();
        console.log('resrs', result);
        // // Buscar que existe el subDocumento
        // const subDocExiste = await this.buscarUnElemento(COLECCION.TELEMETRIA, Object.assign(idDoc, consultaAno), {});
        //
        // if (subDocExiste.estatus)
        // {
        //     const resultado = await this.buscarUnElemento(COLECCION.TELEMETRIA, Object.assign(idDoc, consultaAno, consultaMes), {});
        //
        //     if (resultado.estatus)
        //     {
        //         return respDocumento(resultado);
        //     } else
        //     {
        //         const filtro = nvaProp(`${l}.${tipo}.ano`, lecturas.ano);
        //         const actualizar = nvaProp(`${l}.${tipo}.${mes}`, lecturas)
        //
        //         const respuesta = await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, Object.assign(idDoc, filtro),
        //             {}, {});
        //     }
        // } else
        // {
        //     const nvoReg = await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(_id)}, agregarSubDoc, {returnNew: false, upsert: true});
        //
        //     const renombrar = await this.buscarUnoYActualizar()
        //     return respDocumento(nvoReg);
        // }
    }
}
