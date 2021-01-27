import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import bcryptjs from "bcryptjs";
import JWT from "../../../lib/jwt";
import {respArreglosPag, respDocumento} from "../../../services/respuestas-return";


class UsuarioQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async listarUsuarios()
    {
        const resultado = await this.buscar(COLECCION.USUARIOS, {}, {}, {});
        return respArreglosPag(resultado);
    }

    async buscarUno()
    {
        const resultado = await this.buscarUnElemento(COLECCION.USUARIOS, {usuario: this.variables.usuario}, {});
        return respDocumento(resultado);
    }

    async _login(usuario: string, contrasena: string)
    {
        return await this.buscarUnElemento(COLECCION.USUARIOS, {usuario}, {}).then(
            async res =>
            {
                if (!res.estatus)
                {
                    return {
                        estatus: false,
                        mensaje: `No se encotro un usuario con esos datos`,
                        token: null
                    }
                }
                if (!bcryptjs.compareSync(contrasena, res.elemento.contrasena))
                {
                    return {
                        estatus: false,
                        mensaje: `Login incorrecto intentalo nuevamente`,
                        token: null
                    }
                }
                delete res.elemento.contrasena
                return {
                    estatus: true,
                    mensaje: `Login correcto`,
                    token: new JWT().firmar({res})
                }
            }
        )
    }
}

export default UsuarioQueryService;
