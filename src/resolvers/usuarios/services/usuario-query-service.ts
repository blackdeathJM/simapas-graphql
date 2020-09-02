import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import bcryptjs from "bcryptjs";
import JWT from "../../../lib/jwt";

class UsuarioQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async listarUsuarios()
    {
        const resMsj = 'Lista de usuarios cargada correctamente';
        const resultado = await this.buscar(resMsj, COLECCION.USUARIOS, {});
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, usuarios: resultado.elementos}
    }

    async buscarUno()
    {
        const respMsj = 'Consulta realizada con exito'
        const resultado = await this.buscarUnElemento(respMsj, COLECCION.USUARIOS, {usuario: this.variables.usuario}, {});
        return {estatus: resultado!.estatus, mensaje: resultado!.mensaje, usuario: resultado!.elemento};
    }

    async loginUsuario()
    {
        const valores = Object.values(this.variables);
        const usuario = valores[0];
        const contrasena = valores[1];
        const respMensaje = 'Consulta realizada con exito'
        // en el filtro solo coloco las this.variables ya que tiene la misma estructura que debe llevar elfiltro
        return await this.buscarUnElemento(respMensaje, COLECCION.USUARIOS, {usuario}, {}).then(
            async (res: any) =>
            {
                if (res === null)
                {
                    return {
                        estatus: false,
                        mensaje: `No se encotro un usuario con esos datos`,
                        token: null
                    }
                }
                if (!bcryptjs.compareSync(contrasena, res!.elemento.contrasena))
                {
                    return {
                        estatus: false,
                        mensaje: `Login incorrecto`,
                        token: null
                    }
                }
                delete res!.elemento.contrasena
                console.log(res!.elemento);
                return {
                    estatus: true,
                    mensaje: `Login correcto`,
                    token: new JWT().firmar({res})
                }
            }
        ).catch();
    }
}

export default UsuarioQueryService;
