import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContrato} from "../models/cliente.interface";
import {COLECCION} from "../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../services/respuestas-return";
import {IContextData} from "../../../interfaces/context-data-interface";
import {randomUUID, randomInt} from "crypto";
import moment from "moment";

export class ContratoMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _regContrato(idCliente: string, contrato: IContrato, idSolicitud: string)
    {
        contrato.rpu = randomUUID().toUpperCase();
        contrato.fechaAlta = moment().toISOString();
        contrato.noContrato = randomInt(10000000).toString();
        contrato.activo = true;
        const regContrato = await this.buscarUnoYActualizar(COLECCION.CLIENTES, {_id: new ObjectId(idCliente)},
            {$addToSet: {contratos: contrato}}, {returnDocument: "after"});

        const eliminarSolicitud = await this.buscarUnoYEliminar(COLECCION.SOLICITUDES, {_id: new ObjectId(idSolicitud)}, {});


        return respDocumento(regContrato);
    }

    // async contratoAleatorio(num: number): Promise<string>
    // {
    //     const caracteres = '0123456789';
    //     let resultado = '';
    //     const longitud = caracteres.length;
    //
    //     for (let i = 0; i < num; i++)
    //     {
    //         resultado += caracteres.charAt(Math.floor(Math.random() * longitud));
    //     }
    //     return resultado;
    // }
}
