import {IResolvers} from 'graphql-tools';
import {buscarDeptoRelacion} from "../operaciones/querys/departamento.query";

const type: IResolvers =
    {
        Usuario:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    return await buscarDeptoRelacion(parent.departamentoID, db);
                }
            }
    };
export default type;
