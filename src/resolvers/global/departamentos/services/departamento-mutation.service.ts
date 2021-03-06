import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {ObjectId} from 'bson';
import {respDocumento} from "../../../../services/respuestas-return";
import {IDepartamento} from "../model/departamento.interface";

class DepartamentoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async _registrarElemento(departamento: IDepartamento)
    {
        return await this.agregarUnElemento(COLECCION.DEPARTAMENTOS, departamento, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            })
    }

    async _actualizarElemento(departamento: IDepartamento)
    {
        const resultado = await this.buscarUnoYActualizar(COLECCION.DEPARTAMENTOS, {_id: new ObjectId(departamento._id)},
            {$set: {nombre: departamento.nombre, centroGestor: departamento.centroGestor}}, {returnOriginal: false});
        return respDocumento(resultado);
    }
}

export default DepartamentoMutationService;
