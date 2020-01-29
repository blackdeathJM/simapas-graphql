import {IResolvers} from 'graphql-tools';
import {buscarDeptoRelacion} from "../operaciones/querys/departamento.query";
import {buscarDocExternaRleacion} from "../operaciones/querys/docExterna.query";
import {decodeBase64} from "bcryptjs";

const type: IResolvers =
    {
        Usuario: // este es el tipo que se encuentra en type-objects
            {
                departamento: async (parent: any, __: any, {db}) => {
                    return await buscarDeptoRelacion(parent.departamentoID, db);
                }
            },
        DocumentoExterno:
            {
                usuarioDestino: async (parent: any, __: any, {db}) => {
                    console.log('El parent', parent.usuarioDestino[0].usuario);
                    for (const i of parent.usuarioDestino) {
                        return await buscarDocExternaRleacion(parent.usuarioDestino[0].usuario, db);
                    }
                }
            }
    };
export default type;
