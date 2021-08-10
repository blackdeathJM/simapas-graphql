import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import bcryptjs from "bcryptjs";
import JWT from "../../../lib/jwt";
import {respArreglosSPag, respDocumento} from "../../../services/respuestas-return";
import {ObjectId} from "bson";


export class UsuarioQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _obtenerUsuarios()
    {
        const res = await this.buscarSinPaginacion(COLECCION.USUARIOS, {}, {}, {nombre: -1});
        return {
            ...res
        }
    }

    async _obtenerUsuario(_id: string)
    {
        const res = await this.buscarUnDocumento(COLECCION.USUARIOS, {_id: new ObjectId(_id)}, {});
        return {
            ...res
        }
    }

    async _login(usuario: string, contrasena: string)
    {
        try
        {
            const res = await this.buscarUnDocumento(COLECCION.USUARIOS, {usuario}, {});

            if (res.documento)
            {
                if (!bcryptjs.compareSync(contrasena, res.documento?.contrasena))
                {
                    return {
                        estatus: false,
                        mensaje: `Login incorrecto intentalo nuevamente`,
                        token: null
                    }
                }
                delete res.documento.contrasena
                return {
                    estatus: true,
                    mensaje: `Login correcto`,
                    token: new JWT().firmar({res})
                }


            } else
            {
                return {
                    estatus: false,
                    mensaje: `No se encotro un usuario con esos datos`,
                    token: null
                }
            }
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Ocurrio un error inesperado: ${e}`,
                token: null
            }
        }
    }
}
