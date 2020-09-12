import {IResolvers} from "graphql-tools";
import OrganismoQueryService from "./services/organismo.query.service";

const queryOrganismo: IResolvers =
    {
        Query:
            {
                obtOrganismo(_, {_id}, {db})
                {
                    return new OrganismoQueryService(_, {_id}, {db})._obtenerOrganismo();
                }
            }
    }
export default queryOrganismo;
