import {IResolvers} from "graphql-tools";
import {ObjectId} from "bson";
import {IDepartamento} from "./model/departamento.interface";
import {Db} from 'mongodb';
import {COLECCION} from "../../config/global";
import DepartamentoServices from "../../services/departamento.services";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDeptos(_, __, {db})
                {
                    return new DepartamentoServices(_, __, {db}).listaElementos();
                },
                async departamentoID(_, {_id}, {db})
                {
                    const database = db as Db;
                    return await database.collection(COLECCION.DEPARTAMENTOS).findOne({_id: new ObjectId(_id)}).then(
                        async (departamento: IDepartamento) =>
                        {
                            if (departamento === null)
                            {
                                return {
                                    estatus: true,
                                    mensaje: 'No se encontro un registro con ese Id',
                                    departamento: null
                                }
                            } else
                            {
                                return {
                                    estatus: true,
                                    mensaje: 'Busqueda realizada con exito',
                                    departamento: departamento
                                }
                            }
                        }
                    ).catch(
                        async () =>
                        {
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
