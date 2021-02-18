import {IResolvers} from "graphql-tools";
import DocExtQueryService from "./services/docExt-query.service";

const queryDocExt: IResolvers =
    {
        Query:
            {
                async todosDocsExt(_, {proceso}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._todosDocsExt(proceso);
                },
                // consultar documentos por usuarios sera usado por el admistrador
                async todosLosDocsPorUsuario(_, {usuario}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._todosLosDocsPorUsuario(usuario);
                },
                async docExtProceso(_, {proceso}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._docExtProceso(proceso);
                },
                docsEntreFechas(_, {fechaRecepcionInicial, fechaRecepcionFinal}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._busquedaEntreFechas(fechaRecepcionInicial, fechaRecepcionFinal);
                },
                busquedaGral(_, {consulta}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._busquedaGral(consulta);
                },
                docPorTipo(_, {tipoDoc}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._docPorTipo(tipoDoc)
                },
                todosLosDocs(_, __, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._todosLosDocs();
                },
                intOExt(_, {esInterno}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._intOExt(esInterno);
                }
            }
    };
export default queryDocExt;
