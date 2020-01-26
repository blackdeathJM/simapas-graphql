import {IResolvers} from 'graphql-tools';
import {buscarDeptoRelacion} from "../operaciones/querys/departamento.query";

const type: IResolvers =
    {
        Usuario: // este es el tipo que se encuentra en type-objects
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    return await buscarDeptoRelacion(parent.departamentoID, db);
                }
            }
    };
export default type;
