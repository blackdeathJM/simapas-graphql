import {IResolvers} from "graphql-tools";
import {ObjectId} from "bson";
import {IDepartamento} from "./model/departamento.interface";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDepartamentos(_: void, __: any, {db}) {
                    return await db.collection('departamentos').find().toArray();
                },
                async departamentoID(_: void, {_id}: any, {db}) {
                    return await db.collection('departamentos').findOne({_id: new ObjectId(_id)}).then(
                        async (departamento: IDepartamento) => {
                            if (departamento === null) {
                                return {
                                    estatus: true,
                                    mensaje: 'No se encontro un registro con ese Id',
                                    departamento
                                }
                            }
                            return {
                                estatus: true,
                                mensaje: 'Busqueda realizada con exito',
                                departamento
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
                }
            }
    };
export default queryDeptos;
