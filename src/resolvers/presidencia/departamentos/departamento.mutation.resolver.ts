import {DepartamentoMutationService} from "./services/departamento-mutation.service";
import {IResolvers} from "graphql-middleware/dist/types";
import {IDepartamento} from "./model/departamento.interface";
import {Db} from "mongodb";

export const mutationDeptos =
    {
        Mutation:
            {
                registroDepto: async (_: object, a: { departamento: IDepartamento }, p: { db: Db }) =>
                {
                    return await new DepartamentoMutationService(_, {db: p.db})._registroDepto(a.departamento);
                },
                actualizarDepto: async (_: object, a: { departamento: IDepartamento }, p: { db: Db }) =>
                {
                    return await new DepartamentoMutationService(_, {db: p.db})._actualizarElemento(a.departamento);
                },
            }
    };
