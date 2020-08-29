import {IResolvers} from "graphql-tools";
import {COLECCION} from "../../config/global";
import {Db} from "mongodb";

const queryFolios: IResolvers =
    {
        Query:
            {
                async obtenerFoliosTodos(_: void, __: void, {db}) {
                    const database = db as Db;
                    return await database.collection(COLECCION.FOLIOS).find().toArray().then((res: any) => {
                        return res;
                    });
                },
                async ultimoFolio(_: any, __: any, {db}) {
                    const database = db as Db;
                    return await database.collection(COLECCION.FOLIOS).countDocuments().then(
                        async (ultimoFolio: number) => {
                            return ultimoFolio
                        }
                    ).catch(
                        async () => {
                            return 0
                        }
                    )
                },
                async folioUsuario(_: void, {asigUsuario}, {db}) {
                    const database = db as Db;
                    return await database.collection(COLECCION.FOLIOS).find({asigUsuario}).toArray();
                },
            }
    };
export default queryFolios;
