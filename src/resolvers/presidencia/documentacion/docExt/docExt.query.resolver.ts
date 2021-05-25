import {IResolvers} from "graphql-tools";
import DocExtQueryService from "./services/docExt-query.service";

const queryDocExt: IResolvers =
    {
        Query:
            {
                async todosDocsExt(_, {proceso}, {db})
                {
                    return new DocExtQueryService(_,  {db})._todosDocsExt(proceso);
                },
                // consultar documentos por usuarios sera usado por el admistrador
                async todosLosDocsPorUsuario(_, {usuario}, {db})
                {
                    return new DocExtQueryService(_,  {db})._todosLosDocsPorUsuario(usuario);
                },
                async docExtProceso(_, {proceso}, {db})
                {
                    return new DocExtQueryService(_,  {db})._docExtProceso(proceso);
                },
                async docsEntreFechas(_, {fechaRecepcionInicial, fechaRecepcionFinal}, {db})
                {
                    return new DocExtQueryService(_,  {db})._busquedaEntreFechas(fechaRecepcionInicial, fechaRecepcionFinal);
                },
                async busquedaGral(_, {consulta}, {db})
                {
                    return new DocExtQueryService(_,  {db})._busquedaGral(consulta);
                },
                async docPorTipo(_, {tipoDoc}, {db})
                {
                    return new DocExtQueryService(_,  {db})._docPorTipo(tipoDoc)
                },
                async todosLosDocs(_, __, {db})
                {
                    return new DocExtQueryService(_,  {db})._todosLosDocs();
                },
                async intOExt(_, {esInterno}, {db})
                {
                    return new DocExtQueryService(_,  {db})._intOExt(esInterno);
                },
                async ultimoFolio(_, __, {db})
                {
                    return new DocExtQueryService(_, {db})._ultimoFolio();
                }
            }
    };
export default queryDocExt;
