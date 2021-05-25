import {IResolvers} from "graphql-tools";
import DepartamentoQueryService from "./services/departamento-query.service";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDeptos(_, {}, {db})
                {
                    return new DepartamentoQueryService(_, {db}).listaElementos();
                },
                async departamentoID(_, {_id}, {db})
                {
                    return new DepartamentoQueryService(_, {db}).elementoDetalle(_id);
                }
            }
    };
export default queryDeptos;
