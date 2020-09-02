import {IContextData} from "../../../interfaces/context-data-interface";
import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION, PUB_SUB} from "../../../config/global";
import bcryptjs from 'bcryptjs';
import {ObjectId} from 'bson';
import JWT from "../../../lib/jwt";

class UsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, varibles: object, context: IContextData)
    {
        super(root, varibles, context);
    }

    async agregarUsuario()
    {
        const comprobarUsuario = await this.buscarUnElemento('', COLECCION.USUARIOS,
            {usuario: this.variables.usuario!.usuario},
            {});
        if (!comprobarUsuario.estatus)
        {
            this.variables.usuario!.contrasena = bcryptjs.hashSync(this.variables.usuario!.contrasena, 10);
            return await this.agregarUnElemento('', COLECCION.USUARIOS, this.variables.usuario!).then(
                async respuesta =>
                {
                    return {estatus: respuesta.estatus, mensaje: respuesta.mensaje, usuario: respuesta.elemento}
                }
            )
        } else
        {
            return {estatus: comprobarUsuario.estatus, mensaje: comprobarUsuario.mensaje, elemento: comprobarUsuario.elemento}
        }
    }

    async actualizarRole()
    {
        const respMsj = 'EL rol se ha actualizado correctamente';
        const valores = Object.values(this.variables);
        const _id = valores[0];
        const role = valores[1];

        return await this.buscarUnoYActualizar(respMsj, COLECCION.USUARIOS,
            {_id: new ObjectId(_id)},
            {$set: {role}},
            {returnOrinal: false}).then(
            async res =>
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

    async actializarContrasena()
    {
        const resMsj = 'El password se actualizo con exito'
        const valores = Object.values(this.variables);
        const buscarUsuario = await this.buscarUnElemento('', COLECCION.USUARIOS, {usuario: valores[0]}, {});
        if (buscarUsuario.estatus)
        {
            if (bcryptjs.compareSync(valores[1], buscarUsuario.elemento.contrasena))
            {
                buscarUsuario.elemento.contrasena = bcryptjs.hashSync(valores[2], 10);
                return await this.buscarUnoYActualizar(resMsj, COLECCION.USUARIOS,
                    {usuario: valores[0]},
                    {$set: {contrasena: buscarUsuario.elemento.contrasena}},
                    {returnOriginal: false}).then(
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
        const resMsj = 'Se ha cambiado con exito tu imagen de avatar';
        const valores = Object.values(this.variables);
        return await this.buscarUnoYActualizar(resMsj, COLECCION.USUARIOS,
            {usuario: valores[0]},
            {$set: {img: valores[1]}},
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
        const resultado = await this.buscarUnoYEleminiar(COLECCION.USUARIOS,
            {_id: new ObjectId(this.variables._id)}, {});
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, usuario: resultado.elemento}
    }
}

export default UsuarioMutationService;
