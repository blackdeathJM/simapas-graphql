import {IResolvers} from 'graphql-tools';
import {obtenerDeptos} from "../operaciones/querys/departamento.query";

const type: IResolvers =
    {
        Departamento:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    return await obtenerDeptos(db)
                }
            }
    };
export default type;
