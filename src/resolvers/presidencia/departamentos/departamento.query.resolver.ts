// import {IResolvers} from "graphql-tools";
import DepartamentoQueryService from "./services/departamento-query.service";
import {IResolvers} from "graphql-middleware/dist/types";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDeptos(_, {}, {db})
                {
                    return new DepartamentoQueryService(_, {db})._obtenerDeptos();
                },
                async departamentoID(_, {_id}, {db})
                {
                    return new DepartamentoQueryService(_, {db}).elementoDetalle(_id);
                }
            }
    };
export default queryDeptos;
