import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB} from "../../config/global";
import {ObjectId} from "bson";

const typeDepto: IResolvers =
    {
        Usuario:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    return await db.collection(ENTIDAD_DB.DEPARTAMENTOS).findOne({_id: new ObjectId(parent.departamentoID)});
                }
            },
    };

export default typeDepto;
