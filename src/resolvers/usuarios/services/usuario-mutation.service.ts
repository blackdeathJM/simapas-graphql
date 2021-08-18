import {IContextData} from "../../../interfaces/context-data-interface";
import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION, PUB_SUB} from "../../../config/global";
import bcryptjs from 'bcryptjs';
import {ObjectId} from 'bson';
import JWT from "../../../lib/jwt";
import {IUsuario} from "../models/usuario-interface";

export class UsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _registroUsuario(usuario: IUsuario)
    {
        const comprobarUsuario = await this.buscarUnDocumento(COLECCION.USUARIOS, {usuario: usuario.usuario}, {});
        if (!comprobarUsuario.estatus)
        {
            usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
            const res = await this.agregarUnDocumento(COLECCION.USUARIOS, usuario, {});
            return {
                ...res
            }
        } else
        {
            return {
                ...comprobarUsuario
            }
        }
    }

    async _actualizarRole(_id: string, role: string, esActualizar: boolean)
    {
        let usuario: IUsuario;
        const filtro = {_id: new ObjectId(_id)};
        if (esActualizar)
        {
            const res = await this.buscarUnoYActualizar(COLECCION.USUARIOS,
                filtro,
                {$pull: {role}}, {returnDocument: "after"});
            usuario = res.documento as IUsuario;
            await this.nvoRole(usuario);
            return {
                ...res
            };
        } else
        {
            const res = await this.buscarUnoYActualizar(COLECCION.USUARIOS, filtro,
                {$addToSet: {role}}, {returnDocument: "after"});
            usuario = res.documento as IUsuario;
            await this.nvoRole(usuario);
            return {
                ...res
            };
        }
    }

    async nvoRole(usuario: IUsuario)
    {
        usuario.contrasena = '******';

        const nvoRol = {usuario: usuario.usuario, token: new JWT().firmar(usuario)};

        return await this.context.pubsub!.publish(PUB_SUB.NOT_CAMBIO_ROLE,
            {
                cambiarRoleUsuario: nvoRol
            });
    }

    async _actializarContrasena(usuario: string, actualContrasena: string, nvaContrasena: string, esAdmin: boolean)
    {
        const buscarUsuario = await this.buscarUnDocumento(COLECCION.USUARIOS, {usuario}, {});

        if (buscarUsuario.documento)
        {
            if (bcryptjs.compareSync(actualContrasena, buscarUsuario.documento.contrasena) || esAdmin)
            {
                buscarUsuario.documento.contrasena = bcryptjs.hashSync(nvaContrasena, 10);

                const res = await this.buscarUnoYActualizar(COLECCION.USUARIOS,
                    {usuario}, {$set: {contrasena: buscarUsuario.documento.contrasena}}, {returnDocument: "after"});


                delete res.documento?.contrasena;
                return {
                    estatus: res.estatus,
                    mensaje: res.mensaje,
                    documento: null
                }

            } else
            {
                return {
                    estatus: false,
                    mensaje: `Las contrasenas no son iguales`,
                    documento: null
                }
            }
        } else
        {
            return {
                estatus: false,
                mensaje: 'Documento vacio',
                documento: null
            }
        }
    }

    async _eliminarUsuario(_id: string)
    {
        const resultado = await this.buscarUnoYEliminar(COLECCION.USUARIOS, {_id: new ObjectId(_id)}, {});
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, usuario: resultado.documento}
    }
}

