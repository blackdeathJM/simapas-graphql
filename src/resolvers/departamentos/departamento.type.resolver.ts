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
                    const resultado = await db.collection(COLECCIONES.DEPARTAMENTOS).findOne({_id: new ObjectId(parent.departamentoID)});
                    console.log('resultado', resultado);
                    return resultado;
                }
            },
    };
export default typeDepto;
