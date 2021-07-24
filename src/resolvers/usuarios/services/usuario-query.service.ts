import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import bcryptjs from "bcryptjs";
import JWT from "../../../lib/jwt";
import {respArreglosSPag, respDocumento} from "../../../services/respuestas-return";


class UsuarioQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _listarUsuarios()
    {
        const resultado = await this.buscarSinPaginacion(COLECCION.USUARIOS, {}, {}, {});
        return respArreglosSPag(resultado);
    }

    async _buscarUsuario(usuario: string)
    {
        const resultado = await this.buscarUnElemento(COLECCION.USUARIOS, {usuario}, {});
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
                if (!bcryptjs.compareSync(contrasena, res.elemento?.contrasena))
                {
                    return {
                        estatus: false,
                        mensaje: `Login incorrecto intentalo nuevamente`,
                        token: null
                    }
                }
                delete res.elemento?.contrasena
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
