import {IResolvers} from "graphql-tools";
import {ObjectId} from "bson";
import {COLECCIONES} from "../../config/constants";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDepartamentos(_: void, __: any, {db}) {
                    return await db.collection('departamentos').find().toArray();
                },
                async departamentoID(_: void, {_id}: any, {db}) {
                    return await db.collection('departamentos').findOne({_id: new ObjectId(_id)}).then(
                        async (result: any) => {
                            return {
                                estatus: true,
                                mensaje: 'Busqueda de departamento por _id',
                                departamento: result
                            }
                        }
                    ).catch(
                        async () => {
                            return {
                                estatus: false,
                                mensaje: 'Fallo la consulta del departamento por _id',
                                departamento: null
                            }
                        }
                    );
                },

                async buscarDeptoRelacion(id: ObjectId, db: any) {
                    return await db.collection(COLECCIONES.DEPARTAMENTOS).findOne({_id: new ObjectId(id)});
                }
            }
    };
export default queryDeptos;
