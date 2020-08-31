import {IResolvers} from "graphql-tools";
import DepartamentoServices from "../../services/departamento.services";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDeptos(_, __, {db})
                {
                    return new DepartamentoServices(_, __, {db}).listaElementos();
                },
                async departamentoID(_, {_id}, {db})
                {
                    return new DepartamentoServices(_, {_id}, {db}).elementoDetalle();
                }
            }
    };
export default queryDeptos;
