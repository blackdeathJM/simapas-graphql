import {IResolvers} from "graphql-tools";
import {ObjectId} from "bson";
import {IDepartamento} from "./model/departamento.interface";
import {Db} from 'mongodb';
import {ENTIDAD_DB} from "../../config/global";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDepartamentos(_, __, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DEPARTAMENTOS).find().toArray().then().catch(
                        async () => {
                            return null
                        }
                    );
                },
                async departamentoID(_, {_id}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DEPARTAMENTOS).findOne({_id: new ObjectId(_id)}).then(
                        async (departamento: IDepartamento) => {
                            if (departamento === null) {
                                return {
                                    estatus: true,
                                    mensaje: 'No se encontro un registro con ese Id',
                                    departamento: null
                                }
                            } else {
                                return {
                                    estatus: true,
                                    mensaje: 'Busqueda realizada con exito',
                                    departamento: departamento
                                }
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
