import {IResolvers} from "graphql-tools";
import OrganismoMutationService from "./services/organismo.mutation.service";

const mutationOrganismo: IResolvers =
    {
        Mutation:
            {
                regOrganismo(_, {organismo, _id}, {db})
                {
                    return new OrganismoMutationService(_, {organismo, _id}, {db})._regOrganismo();
                }
            }
    }
export default mutationOrganismo;
