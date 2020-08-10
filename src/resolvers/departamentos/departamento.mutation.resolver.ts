import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB} from "../../config/global";
import {ObjectId} from "bson";
import {Db} from "mongodb";

const mutationDeptos: IResolvers =
    {
        Mutation:
            {
                async registroDepto(_: void, {departamento}, {db}) {
                    return await db.collection(ENTIDAD_DB.DEPARTAMENTOS).insertOne(departamento).then(
                        async (depto: any) => {
                            return {
                                estatus: true,
                                mensaje: 'Departamento insertado satisfactoriamente',
                                //En la respuesta obtenemos el primer elemento del array de objectos que regresa el then
                                departamento: depto.ops[0]
                            }
                        }
                    ).catch(
                        async (error: any) => {
                            return {
                                estatus: false,
                                mensaje: 'Ocurrio un error al tratar de registrar el departamento', error,
                                departamento: null
                            }
                        });
                },
                async actualizarDepto(_: void, {deptoInput}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DEPARTAMENTOS).findOneAndUpdate({_id: new ObjectId(deptoInput._id)},
                        {$set: {nombre: deptoInput.nombre}}, {returnOriginal: false}).then(
                        async (departamento: any) => {
                            return {
                                estatus: true,
                                mensaje: 'Departamento actualizado correctamente',
                                departamento: departamento.value
                            }
                        }
                    ).catch(
                        async (error: any) => {
                            return {
                                estatus: false,
                                mensaje: 'Error al intentar actualizar el departamento', error,
                                departamento: null
                            }
                        });
                },
            }
    };
export default mutationDeptos;
