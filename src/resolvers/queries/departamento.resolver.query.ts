import {IResolvers} from "graphql-tools";
import {obtenerDeptos} from "../../operaciones/querys/departamento.query";

const queryDepartamento: IResolvers =
    {
        Query:
            {
                async departamentos(_: void, __: any, {db}): Promise<any>
                {
                    return await obtenerDeptos(db)
                }
            }
    };
export default queryDepartamento;
