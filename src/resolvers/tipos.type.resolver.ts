import {IResolvers} from "graphql-tools";
import {COLECCION} from "../config/global";
import {ObjectId} from "bson";

const typesRelacionar: IResolvers =
    {
        UsuarioType:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    return await db.collection(COLECCION.DEPARTAMENTOS).findOne({_id: new ObjectId(parent.departamentoID)});
                }
            },
        OrdenesTrabajoType:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    return await db.collection(COLECCION.DEPARTAMENTOS).findOne({_id: new ObjectId(parent.departamentoId)});
                }
            },
        SolicitudServType:
            {
                cliente: async (parent: any, __: any, {db}) =>
                {
                    return await db.collection(COLECCION.CLIENTES).findOne({_id: new ObjectId(parent.idCliente)});
                }
            }
    };
export default typesRelacionar;
