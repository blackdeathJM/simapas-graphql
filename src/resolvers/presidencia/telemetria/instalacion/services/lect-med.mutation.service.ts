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

    async _regLecturas(_id: string, tipo: string, lecturas: ILecturas)
    {
        const idDoc = {_id: new ObjectId(_id)};
        const lect = 'lecturas';
        const consultaAno = nvaProp(`${lect}.${tipo}.ano`, lecturas.ano);
        const agregarSubDoc = nvaProp(`${lect}.${tipo}`, lecturas);


        const existeDocumento = await this.buscarUnElemento(COLECCION.TELEMETRIA, Object.assign(idDoc, consultaAno), {});

        // Verificamos que la lectura exista tomando el ano como id principal del subdocumento
        if (existeDocumento.estatus)
        {
            return respDocumento(existeDocumento);
        } else
        {
            // Registramos las lecturas con valores iniciales de cero
            const agregar = await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(_id)},
                {$addToSet: agregarSubDoc}, {returnDocument: "after", upsert: true});
            return respDocumento(agregar);
        }
    }

    async _editarLectura(_id: string, ano: number, mes: string, tipoLect: string, valorMes: number, totalMes: number)
    {

        const id = {_id: new ObjectId(_id)}
        const consulta = nvaProp(`lecturas.${tipoLect}.ano`, ano);

        const actualizar = nvaProp(`lecturas.${tipoLect}.$.${mes}`, valorMes);
        const actualizarTotal = nvaProp(`lecturas.${tipoLect}.$.total`, totalMes);

        const resultado = await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            Object.assign(id, consulta),
            {$set: Object.assign(actualizar, actualizarTotal)}, {returnDocument: "after"});
        return respDocumento(resultado);
    }
}
