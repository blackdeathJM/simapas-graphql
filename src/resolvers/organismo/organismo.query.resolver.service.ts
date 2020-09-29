import {IResolvers} from "graphql-tools";
import OrganismoQueryService from "./services/organismo.query.service";

const queryOrganismo: IResolvers =
    {
        Query:
            {
                obtOrganismo(_, __, {db})
                {
                    return new OrganismoQueryService(_, __, {db})._obtenerOrganismo();
                }
            }
    }
export default queryOrganismo;
