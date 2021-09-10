import DocExtQueryService from "./services/docExt-query.service";
import {Db} from "mongodb";

const queryDocExt =
    {
        Query:
            {
                criterio: async (_: object, a: { consulta: string }, p: { db: Db }) =>
                {
                    return await new DocExtQueryService(_, {db: p.db})._criterio(a.consulta);
                },
                porUsuario: async (_: object, a: { usuario: string }, p: { db: Db }) =>
                {
                    return await new DocExtQueryService(_, {db: p.db})._porUsuario(a.usuario);
                },
                entreFechas: async (_: object, a: { fechaI: string, fechaF: string }, p: { db: Db }) =>
                {
                    return await new DocExtQueryService(_, {db: p.db})._entreFechas(a.fechaI, a.fechaF);
                },
                porTipo: (_: object, a: { tipoDoc: string, oficio: string, interno: boolean }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._porTipo(a.tipoDoc, a.oficio, a.interno)
                },


                docExtProceso: (_: object, a: { proceso: string }, p: { db: Db }) =>
                {
                    return new DocExtQueryService(_, {db: p.db})._docExtProceso(a.proceso);
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
