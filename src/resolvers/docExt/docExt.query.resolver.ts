import {IResolvers} from "graphql-tools";
import DocExtQueryService from "./services/docExt-query-service";

const queryDocExt: IResolvers =
    {
        Query:
            {
                // Obtenermos todos los documentos externos
                async todosDocsExt(_, __, {db})
                {
                    return new DocExtQueryService(_, __, {db}).docExtLista();
                },
                // consultar documentos por usuarios sera usado por el admistrador
                async todosLosDocsPorUsuario(_, {usuario}, {db})
                {
                    return new DocExtQueryService(_, {usuario}, {db}).docExtListaPorUsuario();
                },
                // Consultar documento que sera enviado al usuarios el subproceso es un array
                async usuarioSubproceso(_, {usuario, subprocesos}, {db})
                {
                    return new DocExtQueryService(_, {usuario, subprocesos}, {db}).doscUsuarioSubproceso();
                    // return await database.collection(ENTIDAD_DB.DOC_EXTERNA).aggregate([
                    //     {
                    //         $project:
                    //             {
                    //                 usuarioDestino:
                    //                     {
                    //                         $filter:
                    //                             {
                    //                                 input: "$usuarioDestino",
                    //                                 as: 'sub',
                    //                                 cond: {$eq: ["$$sub.subproceso", subproceso]}
                    //                             }
                    //                     }
                    //             }
                    //     }
                    // ]).toArray().then(async (resultado) => resultado).catch(error => console.log('Error: ' + error));
                },
                async docsAprobadosPorUsuario(_, {usuario, autorizado}, {db})
                {
                    return new DocExtQueryService(_, {usuario, autorizado}, {db}).docsAprobadosUsuario();
                }
            }
    };
export default queryDocExt;
