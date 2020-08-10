import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB} from "../../config/global";
import {Db} from "mongodb";

const queryFolios: IResolvers =
    {
        Query:
            {
                async obtenerFoliosTodos(_: void, __: void, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.FOLIOS).find().toArray().then((res: any) => {
                        return res;
                    });
                },
                async ultimoFolio(_: any, __: any, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.FOLIOS).countDocuments().then(
                        async (ultimoFolio: number) => {
                            return {
                                estatus: true,
                                mensaje: 'Consulta realizada correctamente',
                                ultimoFolio
                            }
                        }
                    ).catch(
                        async () => {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar extraer el ultimo folio registrado',
                                ultimoFolio: 0
                            }
                        }
                    )
                },
                async folioUsuario(_: void, {asigUsuario}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.FOLIOS).find({asigUsuario}).toArray();
                },
            }
    };
export default queryFolios;
