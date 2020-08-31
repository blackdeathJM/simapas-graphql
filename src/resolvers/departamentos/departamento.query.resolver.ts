import {IResolvers} from "graphql-tools";
import DepartamentoQueryServices from "../../services/departamentos/departamento-query.services";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDeptos(_, __, {db})
                {
                    return new DepartamentoQueryServices(_, __, {db}).listaElementos();
                },
                async departamentoID(_, {_id}, {db})
                {
                    return new DepartamentoQueryServices(_, {_id}, {db}).elementoDetalle();
                }
            }
    };
export default queryDeptos;
