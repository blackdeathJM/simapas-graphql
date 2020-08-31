import {IResolvers} from "graphql-tools";
import DepartamentoMutationService from "../../services/departamentos/departamento-mutation.service";

const mutationDeptos: IResolvers =
    {
        Mutation:
            {
                async registroDepto(_, {departamento}, {db})
                {
                    return new DepartamentoMutationService(_, {departamento}, {db}).registrarElemento();
                },
                async actualizarDepto(_, {departamento}, {db})
                {
                    return new DepartamentoMutationService(_, {departamento}, {db}).actualizarElemento();
                },
            }
    };
export default mutationDeptos;
