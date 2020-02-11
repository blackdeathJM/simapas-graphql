import {IResolvers} from "graphql-tools";
import {COLECCIONES} from "../../config/constants";

const queryFolios: IResolvers =
    {
        Query:
            {
                async obtenerFoliosTodos(_: void, __: void, {db})
                {
                    return await db.collection(COLECCIONES.FOLIOS).find().toArray().then((res: any) =>
                    {
                        return res;
                    });
                },
                async ultimoFolio(_: any, __: any, {db})
                {
                    return await db.collection(COLECCIONES.FOLIOS).countDocuments().then(
                        async (ultimoFolio: number) =>
                        {
                            return {
                                estatus: true,
                                mensaje: 'Consulta realizada correctamente',
                                ultimoFolio
                            }
                        }
                    ).catch(
                        async () =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar extraer el ultimo folio registrado',
                                ultimoFolio: 0
                            }
                        }
                    )
                },
                async folioUsuario(_: void, {asigUsuario}, {db})
                {
                    return await db.collection(COLECCIONES.FOLIOS).find({asigUsuario}).toArray();
                },
            }
    };
export default queryFolios;
