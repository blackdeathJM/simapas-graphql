import {IResolvers} from "graphql-tools";
import DocQueryService from "../services/doc.query.service";

const queryDocUsuario: IResolvers =
    {
        Query:
            {
                // Consultar documento que sera enviado al usuarios el subproceso es un array
                async usuarioSubproceso(_, {usuario, subprocesos}, {db})
                {
                    return new DocQueryService(_, {}, {db})._doscUsuarioSubproceso(usuario, subprocesos);
                },
                async docsAprobadosPorUsuario(_, {usuario, subproceso}, {db})
                {
                    return new DocQueryService(_, {}, {db})._docsAprobadosUsuario(usuario, subproceso);
                },
            }
    }
export default queryDocUsuario;
