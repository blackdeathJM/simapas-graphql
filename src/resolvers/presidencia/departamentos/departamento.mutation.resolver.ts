// import {IResolvers} from "graphql-tools";
import DepartamentoMutationService from "./services/departamento-mutation.service";
import {IResolvers} from "graphql-middleware/dist/types";

const mutationDeptos: IResolvers =
    {
        Mutation:
            {
                async registroDepto(_, {departamento}, {db})
                {
                    return new DepartamentoMutationService(_, {db})._registroDepto(departamento);
                },
                async actualizarDepto(_, {departamento}, {db})
                {
                    return new DepartamentoMutationService(_, {db})._actualizarElemento(departamento);
                },
            }
    };
export default mutationDeptos;
