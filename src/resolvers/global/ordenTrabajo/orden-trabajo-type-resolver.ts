import {IResolvers} from "graphql-tools";
import {Db} from "mongodb";
import {COLECCION} from "../../../config/global";
import {ObjectId} from "bson"

const typeOrdenTrabajo: IResolvers =
    {
        OrdenTrabajoType:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    const baseDatos = db as Db;
                    return await baseDatos.collection(COLECCION.DEPARTAMENTOS).findOne({_id: new ObjectId(parent.deptoID)})
                }
            }
    }
export default typeOrdenTrabajo;
