import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContrato} from "../models/cliente.interface";
import {COLECCION} from "../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../services/respuestas-return";
import {IContextData} from "../../../interfaces/context-data-interface";
import {randomUUID} from "crypto";

export class ContratoMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _regContrato(idCliente: string, contrato: IContrato)
    {
        contrato.rpu = randomUUID().toUpperCase();

        const regContrato = await this.buscarUnoYActualizar(COLECCION.CLIENTES, {_id: new ObjectId(idCliente)},
            {$addToSet: {contratos: contrato}}, {returnDocument: "after"});
        return respDocumento(regContrato);
    }
}
