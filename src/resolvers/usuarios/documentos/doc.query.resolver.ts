// import {IResolvers} from "graphql-tools";
import DocUsuarioQueryService from "./services/doc-usuario-query.service";
import {IResolvers} from "graphql-middleware/dist/types";

const queryDocUsuario: IResolvers =
    {
        Query:
            {
                // Consultar documento que sera enviado al usuarios el subproceso es un array
                async usuarioSubproceso(_, {usuario, subprocesos}, {db})
                {
                    return new DocUsuarioQueryService(_, {db})._doscUsuarioSubproceso(usuario, subprocesos);
                },
                async docsPendFolIntExt(_, {usuarioFolio}, {db})
                {
                    return new DocUsuarioQueryService(_, {db})._docsPendFolIntExt(usuarioFolio);
                },
                async busquedaGralUsuario(_, {usuario, consulta}, {db})
                {
                    return new DocUsuarioQueryService(_, {db})._busquedaGralUsuario(usuario, consulta);
                },
                async docUsuarioTipoDoc(_, {usuarioFolio, tipoDoc}, {db})
                {
                    return new DocUsuarioQueryService(_, {db})._docUsuarioTipoDoc(usuarioFolio, tipoDoc);
                },
                async docUsuarioExtEntregado(_, {usuarioFolio}, {db})
                {
                    return new DocUsuarioQueryService(_, {db})._docUsuarioExtEntregado(usuarioFolio);
                }
            }
    }
export default queryDocUsuario;
