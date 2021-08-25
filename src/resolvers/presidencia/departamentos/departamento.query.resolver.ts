import DepartamentoQueryService from "./services/departamento-query.service";
import {Db} from "mongodb";

export const queryDeptos =
    {
        Query:
            {
                obtenerDeptos: async (_: object, __: object, param: { db: Db }) =>
                {
                    return new DepartamentoQueryService(_, {db: param.db})._obtenerDeptos()
                },

                departamentoID: async (_: object, args: { _id: string }, param: { db: Db }) =>
                {
                    return new DepartamentoQueryService(_, {db: param.db}).elementoDetalle(args._id);
                }
            }
    };
