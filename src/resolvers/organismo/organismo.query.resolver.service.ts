import {IResolvers} from "graphql-tools";
import OrganismoQueryService from "./services/organismo.query.service";

const queryOrganismo: IResolvers =
    {
        Query:
            {
                obtOrganismo(_, {pagina, elementosPorPagina}, {db})
                {
                    return new OrganismoQueryService(_, {paginacion: {pagina, elementosPorPagina}}, {db})._obtenerOrganismo();
                }
            }
    }
export default queryOrganismo;
