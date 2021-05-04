import {IContextData} from "../../../interfaces/context-data-interface";
import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION, PUB_SUB} from "../../../config/global";
import bcryptjs from 'bcryptjs';
import {ObjectId} from 'bson';
import JWT from "../../../lib/jwt";
import {IUsuario} from "../models/usuario-interface";
import {respDocumento} from "../../../services/respuestas-return";

class UsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, varibles: object, context: IContextData)
    {
        super(root, varibles, context);
    }

    async _registroUsuario(usuario: IUsuario)
    {
        const comprobarUsuario = await this.buscarUnElemento(COLECCION.USUARIOS, {usuario: usuario.usuario}, {});
        if (!comprobarUsuario.estatus)
        {
            usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
            return await this.agregarUnElemento(COLECCION.USUARIOS, usuario, {}).then(
                async respuesta =>
                {
                    return respDocumento(respuesta);
                })
        } else
        {
            return {estatus: comprobarUsuario.estatus, mensaje: comprobarUsuario.mensaje, elemento: comprobarUsuario.elemento}
        }
    }

    async _actualizarRole(_id: string, role: string, esActualizar: boolean)
    {
        // cuando es verdadero se quiera el rol cuando es false se agrega
        const filtro = {_id: new ObjectId(_id)};
        if (esActualizar)
        {
            const res = await this.buscarUnoYActualizar(COLECCION.USUARIOS,
                filtro,
                {$pull: {role}}, {returnOriginal: false});
            await this.nvoRole(res.elemento);
            return respDocumento(res);
        } else
        {
            const res = await this.buscarUnoYActualizar(COLECCION.USUARIOS, filtro,
                {$addToSet: {role}}, {returnOriginal: false});
            await this.nvoRole(res.elemento);
            return respDocumento(res);
        }
    }

    async nvoRole(usuario: IUsuario)
    {
        usuario.contrasena = '******';

        await this.context.pubsub!.publish(PUB_SUB.NOT_CAMBIO_ROLE, {cambiarRoleUsuario: new JWT().firmar(usuario)});
        return {
            estatus: true,
            mensaje: 'Se ha actualizado role del usuario',
            usuario: usuario
        }
    }

    async _actializarContrasena(usuario: string, actualContrasena: string, nvaContrasena: string, esAdmin: boolean)
    {
        const buscarUsuario = await this.buscarUnElemento(COLECCION.USUARIOS, {usuario}, {});

        if (buscarUsuario.elemento)
        {
            if (bcryptjs.compareSync(actualContrasena, buscarUsuario.elemento.contrasena) || esAdmin)
            {
                buscarUsuario.elemento.contrasena = bcryptjs.hashSync(nvaContrasena, 10);

                return await this.buscarUnoYActualizar(COLECCION.USUARIOS,
                    {usuario}, {$set: {contrasena: buscarUsuario.elemento.contrasena}}, {returnOriginal: false}).then(
                    async respuesta =>
                    {
                        delete respuesta.elemento.contrasena;
                        const nvoToken = respuesta.elemento;
                        return {
                            estatus: respuesta.estatus,
                            mensaje: respuesta.mensaje,
                            token: new JWT().firmar({nvoToken})
                        }
                    }
                )
            } else
            {
                return {
                    estatus: false,
                    mensaje: `Las contrasenas no son iguales`,
                    token: null
                }
            }
        } else
        {
            return {
                estatus: false,
                mensaje: buscarUsuario.mensaje,
                token: null
            }
        }
    }

    async EliminarUsuario()
    {
        const resultado = await this.buscarUnoYEleminiar(COLECCION.USUARIOS, {_id: new ObjectId(this.variables._id)}, {});
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, usuario: resultado.elemento}
    }
}

export default UsuarioMutationService;
