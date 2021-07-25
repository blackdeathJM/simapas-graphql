import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContrato} from "../models/cliente.interface";
import {COLECCION} from "../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../services/respuestas-return";
import {IContextData} from "../../../interfaces/context-data-interface";
import {randomUUID, randomInt} from "crypto";
import moment from "moment";
import {MongoClient, ReadConcern, ReadPreference, TransactionOptions} from "mongodb";

export class ContratoMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _regContrato(idCliente: string, contrato: IContrato, idSolicitud: string, tr: MongoClient)
    {
        contrato.fechaAlta = moment().toISOString();
        contrato.activo = true;


        let bucle = true;
        do
        {
            contrato.rpu = await randomUUID().toUpperCase();
            contrato.noContrato = await randomInt(10000000).toString();

            let res = await this.buscarUnDocumento(COLECCION.CLIENTES, {contratos: {$elemMatch: {$or: [{rpu: contrato.rpu, noContrato: contrato.noContrato}]}}}, {});
            bucle = res.estatus;
        } while (bucle);


        const session = tr.startSession();

        // const opcionesTran: TransactionOptions =
        //     {
        //         readPreference: ReadPreference.fromString('primary'),
        //         readConcern: {level: "available"},
        //         writeConcern: {w: "majority"}
        //
        //         readPreference: 'primary',
        //             readConcern: {level: 'local'},
        //         writeConcern: {w: 'majority'}
        //     };

        try
        {
            session.startTransaction();

            const eliminarSolicitud = await this.buscarUnoYEliminar(COLECCION.SOLICITUDES, {_id: new ObjectId(idSolicitud)}, {session});

            if (eliminarSolicitud.documento)
            {
                const regContrato = await this.buscarUnoYActualizar(COLECCION.CLIENTES, {_id: new ObjectId(idCliente)},
                    {$addToSet: {contratos: contrato}}, {returnDocument: "after", session});

                if (regContrato.documento)
                {
                    await session.commitTransaction();
                    return respDocumento(regContrato);
                } else
                {
                    await session.abortTransaction();
                }
            } else
            {
                return {
                    estatus: false,
                    mensaje: 'No se encontro solicitud de servicio, para generar el contrato',
                    elemento: null
                }
            }

        } catch (e)
        {
            return {
                estatus: false,
                mensaje: e,
                elemento: null
            }
        } finally
        {
            await session.endSession();
        }

    }
}
