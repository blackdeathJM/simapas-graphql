import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {ILecturas} from "../../models/lecturas-interface";

export class LectMedMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _regLecturas(_id: string, tipo: string, lecturas: ILecturas)
    {
        // const idDoc = {_id: new ObjectId(_id)};
        // const l = 'lecturas';
        //
        // const agregarSubDoc = nvaProp(`${l}.${tipo}`, lecturas);
        // const consultaAno = nvaProp(`${l}.${tipo}.ano`, lecturas.ano);
        // const consultaMes = nvaProp(`${l}.${tipo}.${mes?.toLowerCase()}`, {$exists: true});
        //
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
        //     const registro =
        //     const nvoReg = await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(_id)}, agregarSubDoc, {returnNew: false, upsert: true});
        //
        //     return respDocumento(nvoReg);
        // }
    }
}
