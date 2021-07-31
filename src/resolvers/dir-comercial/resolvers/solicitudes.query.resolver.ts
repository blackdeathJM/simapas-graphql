// import {IResolvers} from "graphql-tools";
import {SolicitudesQueryService} from "../services/solicitudes.query.service";
import {IResolvers} from "graphql-middleware/dist/types";

export const querySolicitudes: IResolvers=
    {
        Query:
            {
                async solPorCliente(_, {idCliente}, {db})
                {
                    return new SolicitudesQueryService(_, {db})._solPorCliente(idCliente);
                }
            }
    }
