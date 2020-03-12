import {IResolvers} from "graphql-tools";
import {COLECCIONES} from "../../config/constants";
import {ObjectId} from "bson";

const mutationDeptos: IResolvers =
    {
        Mutation:
            {
                // DEPARTAMENTO
                async registroDepto(_: void, {departamento}, {db})
                {

                    return await db.collection(COLECCIONES.DEPARTAMENTOS).insertOne(departamento).then(
                        async (departamento: any) =>
                        {
                            return {
                                estatus: true,
                                mensaje: 'Departamento insertado satisfactoriamente',
                                departamento: departamento.value
                            }
                        }
                    ).catch(
                        async (error: any) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Ocurrio un error al tratar de registrar el departamento', error,
                                departamento: null
                            }

                        });
                },
                async actualizarDepto(_: void, {deptoInput}, {db})
                {
                    return await db.collection(COLECCIONES.DEPARTAMENTOS).findOneAndUpdate({_id: new ObjectId(deptoInput._id)},
                        {$set: {nombre: deptoInput.nombre}}).then(
                        async (departamento: any) =>
                        {
                            return {
                                estatus: true,
                                mensaje: 'Departamento actualizado correctamente',
                                departamento: departamento.value
                            }
                        }
                    ).catch(
                        async (error: any) =>
                        {
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
