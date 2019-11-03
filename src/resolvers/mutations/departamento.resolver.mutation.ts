import {IResolvers} from "graphql-tools";
import {registroDepto} from "../../operaciones/mutations/departamento.mutation";

const mutationDepartamento: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {pubsub, db})
                {
                    return await registroDepto(departamento, pubsub, db);
                },
            }
    };
export default mutationDepartamento;
