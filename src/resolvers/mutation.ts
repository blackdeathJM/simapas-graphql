import {IResolvers} from "graphql-tools";
import {registroDepto} from "../operaciones/mutations/departamento.mutation";
import {regUsuario} from "../operaciones/mutations/usuario.mutation";

const mutation: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {db}): Promise<any>
                {
                    return await registroDepto(departamento, db);
                },

                async registroUsuario(_: void, {usuario}, {db}): Promise<any>
                {
                    return await regUsuario(usuario, db);
                }
            }
    };
export default mutation;
