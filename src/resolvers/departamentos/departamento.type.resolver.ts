import {IResolvers} from "graphql-tools";
import {COLECCIONES} from "../../config/constants";
import {ObjectId} from "bson";

const typeDeptos: IResolvers =
    {
        Type:
            {
                Usuario:
                    {
                        departamento: async (parent: any, __: any, {db}) => {
                            return await db.collection(COLECCIONES.DEPARTAMENTOS).findOne({_id: new ObjectId(parent._id)});
                        }
                    },
            }
    };
export default typeDeptos;
