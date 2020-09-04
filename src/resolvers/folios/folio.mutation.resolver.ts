import {IResolvers} from "graphql-tools";
import {ObjectId} from "bson";
import {COLECCION} from "../../config/global";
import {Db} from "mongodb";
import FolioMutationService from "./services/folio.mutation.service";

const mutationFolios: IResolvers =
    {
        Mutation:
            {
                async registroFolio(_, {folio}, {db})
                {
                    return new FolioMutationService(_, {folio}, {db}).registrarFolio();
                },
                async acUrlFolio(_: void, {id, archivoUrl}, {db})
                {
                    const database = db as Db;
                    return await database.collection(COLECCION.FOLIOS).findOneAndUpdate({_id: new ObjectId(id)},
                        {$set: {archivoUrl}}).then(
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
