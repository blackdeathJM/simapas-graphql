import {IResolvers} from "graphql-tools";
import DocUsuarioQueryService from "./services/doc-usuario-query.service";

const queryDocUsuario: IResolvers =
    {
        Query:
            {
                // Consultar documento que sera enviado al usuarios el subproceso es un array
                async usuarioSubproceso(_, {usuario, subprocesos}, {db})
                {
                    return new DocUsuarioQueryService(_, {}, {db})._doscUsuarioSubproceso(usuario, subprocesos);
                },
                async docsPendFolIntExt(_, {usuarioFolio}, {db})
                {
                    return new DocUsuarioQueryService(_, {}, {db})._docsPendFolIntExt(usuarioFolio);
                }
            }
    }
export default queryDocUsuario;
