import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import ValidacionesService from "../../../services/validaciones.service";
import {COLECCION} from "../../../config/global";
import {ObjectId} from 'bson';

class DepartamentoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async registrarElemento()
    {
        const respMsj = 'Departamento agregado correctamente';
        if (ValidacionesService.checarDato(this.variables.departamento?.nombre || ''))
        {
            const resultado = await this.agregarUnElemento(respMsj, COLECCION.DEPARTAMENTOS, this.variables.departamento!);
            return {estatus: resultado!.estatus, mensaje: resultado!.mensaje, departamento: resultado!.elemento}
        }
    }

    async actualizarElemento()
    {
        const respMensaje = 'Los datos fueron actualizados con exito';
        const resultado = await this.buscarUnoYActualizar(respMensaje, COLECCION.DEPARTAMENTOS,
            {_id: new ObjectId(this.variables.departamento!._id)},
            {$set: {nombre: this.variables.departamento!.nombre}},
            {returnOriginal: false});
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, departamento: resultado.elemento}
    }
}

export default DepartamentoMutationService;
