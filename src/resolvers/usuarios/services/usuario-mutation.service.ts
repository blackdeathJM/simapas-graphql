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

    async _actualizarRole(_id: string, role: string[])
    {
        return await this.buscarUnoYActualizar(COLECCION.USUARIOS, {_id: new ObjectId(_id)}, {$set: {role}}, {returnOrinal: false})
            .then(async res =>
                {
                    delete res.elemento.contrasena;
                    res.elemento.contrasena = '*******';
                    const nvoToken = res.elemento;
                    await this.context.pubsub!.publish(PUB_SUB.NOT_CAMBIO_ROLE, {cambiarRoleUsuario: new JWT().firmar(nvoToken)});
                    return {
                        estatus: true,
                        mensaje: 'Se ha actualizado role del usuario',
                        usuario: res.elemento
                    }
                }
            );
    }

    async _actializarContrasena(usuario: string, actualContrasena: string, nvaContrasena: string)
    {
        const buscarUsuario = await this.buscarUnElemento(COLECCION.USUARIOS, {usuario}, {});
        if (buscarUsuario.estatus)
        {
            if (bcryptjs.compareSync(actualContrasena, buscarUsuario.elemento.contrasena))
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

    async actualizarImgAvatar()
    {
        const valores = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.USUARIOS, {usuario: valores[0]}, {$set: {img: valores[1]}},
            {returnOriginal: false}).then(
            async res =>
            {
                const usuarioPerfil = res.elemento;
                delete usuarioPerfil.contrasena;
                return {estatus: res.estatus, mensaje: res.mensaje, token: new JWT().firmar(usuarioPerfil)}
            }
        )
    }

    async EliminarUsuario()
    {
        const resultado = await this.buscarUnoYEleminiar(COLECCION.USUARIOS, {_id: new ObjectId(this.variables._id)}, {});
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, usuario: resultado.elemento}
    }
}

export default UsuarioMutationService;
