import {IResolvers} from "graphql-tools";
import {COLECCIONES} from "../../config/constants";
import {ObjectId} from "bson";

const typeDepto: IResolvers =
    {
        Usuario:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    console.log('Parent', parent);
                    return await db.collection(COLECCIONES.DEPARTAMENTOS).findOne({_id: new ObjectId(parent.departamentoID)});
                }
            },
    };
export default typeDepto;
