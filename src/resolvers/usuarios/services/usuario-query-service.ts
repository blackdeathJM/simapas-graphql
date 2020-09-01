import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";

class UsuarioQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async listarUsuarios()
    {
        const resultado = await this.lista(COLECCION.USUARIOS, 'usuarios');
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, usuarios: resultado.elementos}
    }

    async buscarUsuarioPorUsuario()
    {
        const resultado = await this.buscarElementoPersonalizadoFiltro(COLECCION.USUARIOS, {usuario: this.variables.usuario});
        return {estatus: resultado!.estatus, mensaje: resultado!.mensaje, usuario: resultado!.elemento};
    }

}

export default UsuarioQueryService;
