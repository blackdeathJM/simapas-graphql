import {IContextData} from "../../../interfaces/context-data-interface";
import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import bcryptjs from 'bcryptjs';
import {ObjectId} from 'bson';

class UsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, varibles: object, context: IContextData)
    {
        super(root, varibles, context);
    }

    async agregarUsuario()
    {

        return await this.buscarUnElemento('', COLECCION.USUARIOS, {usuario: this.variables.usuario?.usuario}, {}).then(
            async (res) =>
            {
                if (res)
                {
                    return {
                        estatus: false,
                        mensaje: `El usuario ya existe, no se puede completar el registro`,
                        usuario: null
                    }
                }
                this.variables.usuario!.contrasena = bcryptjs.hashSync(this.variables.usuario!.contrasena, 10);
                const resultado = await this.agregarUnElemento('', COLECCION.USUARIOS, this.variables.usuario!);
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, usuario: resultado.elemento}
            }
        )
    }

    async actualizarRole()
    {
        const respMsj = 'EL rol se ha actualizado correctamente';
        const valores = Object.values(this.variables);
        const _id = valores[0];
        const role = valores[1];

        const resultado = await this.buscarUnoYActualizar(respMsj, COLECCION.USUARIOS,
            {_id: new ObjectId(_id)},
            {$set: {role}},
            {returnOrinal: false}).then(
            res =>
            {
                console.log('respuesat', res.elemento.contrasena);
            }
        );
    }
}

export default UsuarioMutationService;
