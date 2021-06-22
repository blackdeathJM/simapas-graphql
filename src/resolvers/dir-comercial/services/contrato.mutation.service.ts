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
        contrato.fechaAlta = moment().toISOString();
        contrato.activo = true;

        let bucle = true;
        do
        {
            contrato.rpu = await randomUUID().toUpperCase();
            contrato.noContrato = await randomInt(10000000).toString();

            let res = await this.buscarUnElemento(COLECCION.CLIENTES, {contratos: {$elemMatch: {$or: [{rpu: contrato.rpu, noContrato: contrato.noContrato}]}}}, {});
            console.log(res);
            bucle = res.estatus
        } while (bucle);


        const eliminarSolicitud = await this.buscarUnoYEliminar(COLECCION.SOLICITUDES, {_id: new ObjectId(idSolicitud)}, {});
        console.log('Eliminar', eliminarSolicitud);

        if (eliminarSolicitud.estatus)
        {
            const regContrato = await this.buscarUnoYActualizar(COLECCION.CLIENTES, {_id: new ObjectId(idCliente)},
                {$addToSet: {contratos: contrato}}, {returnDocument: "after"});

            return respDocumento(regContrato);

        } else
        {
            return {
                estatus: false,
                mensaje: 'No se pudo eliminar la solicitud',
                documento: null
            }
        }
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
