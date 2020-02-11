import {IResolvers} from "graphql-tools";
import {ObjectId} from "bson";
import {COLECCIONES} from "../../config/constants";

const mutationFolios: IResolvers =
    {
        Mutation:
            {
                async registroFolio(_: void, {folio}, {db})
                {
                    return await db.collection(COLECCIONES.FOLIOS).findOne({numFolio: folio.numFolio}).then(
                        async (rest: any) =>
                        {
                            if (rest) {
                                return {
                                    estatus: false,
                                    mensaje: 'Este numero de folio se acaba de utilizar en otro departamento por favor cierra la ventana y vuelve abrirla para generar uno nuevo',
                                    folio: null
                                }
                            } else {
                                return await db.collection('folios').insertOne(folio).then(
                                    async () =>
                                    {
                                        return {
                                            estatus: true,
                                            mensaje: 'Se ha registrado de manera correcta el folio',
                                            folio
                                        }
                                    }
                                ).catch(
                                    async () =>
                                    {
                                        return {
                                            estatus: false,
                                            mensaje: 'Ocurrio un error al tratar de registrar el nuevo folio: ',
                                            folio: null
                                        }
                                    }
                                )
                            }
                        }
                    )
                },
                async acUrlFolio(_: void, {id, archivoUrl}, {db})
                {

                    return await db.collection(COLECCIONES.FOLIOS).findOneAndUpdate({_id: new ObjectId(id)}, {$set: {archivoUrl}}).then(
                        async () =>
                        {
                            return {
                                _id: id,
                                archivoUrl
                            }
                        }
                    ).catch(
                        async () =>
                        {
                            return {
                                _id: 'Error no se registro'
                            }
                        }
                    );
                },
            }
    };
export default mutationFolios;
