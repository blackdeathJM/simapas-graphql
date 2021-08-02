import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {ObjectId} from 'bson';
import {IDepartamento} from "../model/departamento.interface";

export class DepartamentoMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {super(root, context);}

    async _registroDepto(departamento: IDepartamento)
    {
        const res = await this.agregarUnDocumento(COLECCION.DEPARTAMENTOS, departamento, {});
        return {
            ...res
        }
    }

    async _actualizarElemento(departamento: IDepartamento)
    {
        const res = await this.buscarUnoYActualizar(COLECCION.DEPARTAMENTOS, {_id: new ObjectId(departamento._id)},
            {$set: {nombre: departamento.nombre, centroGestor: departamento.centroGestor}}, {returnDocument: "after"});
        return {
            ...res
        }
    }

}
