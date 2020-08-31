import ResolversOperacionesService from "../resolver-operaciones";
import {IContextData} from "../../interfaces/context-data-interface";
import ValidacionesService from "../validaciones.service";
import {COLECCION} from "../../config/global";
import {ObjectId} from 'bson';

class DepartamentoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async registrarElemento()
    {
        if (ValidacionesService.checarDato(this.variables.departamento?.nombre || ''))
        {
            const resultado = await this.agregarUnElemento(COLECCION.DEPARTAMENTOS, this.variables.departamento!, 'departamentos');
            return {estatus: resultado.estatus, mensaje: resultado.mensaje, departamento: resultado.elemento}
        }
    }

    async actualizarElemento()
    {
        const resultado = await this.actualizarUnElemento(COLECCION.DEPARTAMENTOS,
            {_id: new ObjectId(this.variables.departamento!._id)},
            {$set: {nombre: this.variables.departamento!.nombre}},
            {returnOriginal: false}, 'departamentos');
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, departamento: resultado.elemento}
    }
}

export default DepartamentoMutationService;
