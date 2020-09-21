import GMR from 'graphql-merge-resolvers';
import queryDocExt from "./docExt/docExt.query.resolver";
import queryDeptos from "./departamentos/departamento.query.resolver";
import queryUsuarios from "./usuarios/usuario.query.resolver";
import queryFolios from "./folios/folio.query.resolver";
import queryOrganismo from "./organismo/organismo.query.resolver.service";

const unionQueryResolver = GMR.merge(
    [
        queryDocExt,
        queryDeptos,
        queryUsuarios,
        queryFolios,
        queryOrganismo
    ]);

export default unionQueryResolver;
