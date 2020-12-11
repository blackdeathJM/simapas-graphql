import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import ValidacionesService from "../../../../services/validaciones.service";
import {COLECCION} from "../../../../config/global";
import {ObjectId} from 'bson';
import {respDocumento} from "../../../../services/respuestas-return";

class DepartamentoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async registrarElemento()
    {
        if (ValidacionesService.checarDato(this.variables.departamento!.nombre || ''))
        {
            const resultado = await this.agregarUnElemento(COLECCION.DEPARTAMENTOS, this.variables.departamento!, {});
            return respDocumento(resultado);
        }
    }

    async actualizarElemento()
    {
        const resultado = await this.buscarUnoYActualizar(COLECCION.DEPARTAMENTOS,
            {_id: new ObjectId(this.variables.departamento!._id)},
            {$set: {nombre: this.variables.departamento!.nombre}},
            {returnOriginal: false});
        return respDocumento(resultado);
    }
}

export default DepartamentoMutationService;
