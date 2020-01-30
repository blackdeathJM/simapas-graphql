import {IResolvers} from 'graphql-tools';
import {buscarDeptoRelacion} from "../operaciones/querys/departamento.query";
import {buscarDocExternaRleacion} from "../operaciones/querys/docExterna.query";

const type: IResolvers =
    {
        Usuario: // este es el tipo que se encuentra en type-objects
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    return await buscarDeptoRelacion(parent.departamentoID, db);
                }
            },
        DocumentoExterno:
            {
                usuarioDestino: async (parent: any, __: any, {db}) =>
                {
                    return await buscarDocExternaRleacion(parent.usuarioDestino, db);
                }
            }
    };
export default type;
