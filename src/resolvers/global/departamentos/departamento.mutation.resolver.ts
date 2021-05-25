import {IResolvers} from "graphql-tools";
import DepartamentoMutationService from "./services/departamento-mutation.service";

const mutationDeptos: IResolvers =
    {
        Mutation:
            {
                async registroDepto(_, {departamento}, {db})
                {
                    return new DepartamentoMutationService(_, {db})._registrarElemento(departamento);
                },
                async actualizarDepto(_, {departamento}, {db})
                {
                    return new DepartamentoMutationService(_, {db})._actualizarElemento(departamento);
                },
            }
    };
export default mutationDeptos;
