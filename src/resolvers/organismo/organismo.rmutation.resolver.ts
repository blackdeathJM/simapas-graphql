import {IResolvers} from "graphql-tools";
import OrganismoMutationService from "./services/organismo.mutation.service";

const mutationOrganismo: IResolvers =
    {
        Mutation:
            {
                regOrganismo(_, {organismo}, {db})
                {
                    return new OrganismoMutationService(_, {organismo}, {db})._regOrganismo();
                },
                actOrganismo(_, {organismo}, {db})
                {
                    return new OrganismoMutationService(_, {organismo}, {db})._actOrganismo();
                }
            }
    }
export default mutationOrganismo;
