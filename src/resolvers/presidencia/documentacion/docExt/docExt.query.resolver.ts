import DocExtQueryService from "./services/docExt-query.service";
import {Db} from "mongodb";

const queryDocExt =
    {
        Query:
            {
                todosDocsExt: (_: object, a: { proceso: string }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._todosDocsExt(a.proceso);
                },
                // consultar documentos por usuarios sera usado por el admistrador
                todosLosDocsPorUsuario: (_: object, a: { usuario: string }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._todosLosDocsPorUsuario(a.usuario);
                },
                docExtProceso: (_: object, a: { proceso: string }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._docExtProceso(a.proceso);
                },
                docsEntreFechas: (_: object, a: { fechaRecepcionInicial: string, fechaRecepcionFinal: string }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._busquedaEntreFechas(a.fechaRecepcionInicial, a.fechaRecepcionFinal);
                },
                busquedaGral: (_: object, a: { consulta: string }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._busquedaGral(a.consulta);
                },
                docPorTipo: (_: object, a: { tipoDoc: string }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._docPorTipo(a.tipoDoc)
                },
                todosLosDocs: (_: object, __: object, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._todosLosDocs();
                },
                intOExt: (_: object, a: { esInterno: boolean }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._intOExt(a.esInterno);
                },
                ultimoFolio: (_: object, __: object, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._ultimoFolio();
                }
            }
    };
export default queryDocExt;
