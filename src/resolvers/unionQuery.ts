import GMR from 'graphql-merge-resolvers';
import queryDocExt from "./docExt/docExt.query.resolver";
import queryDeptos from "./departamentos/departamento.query.resolver";
import queryUsuarios from "./usuarios/usuario.query.resolver";
import queryFolios from "./folios/folio.query.resolver";
import queryOrganismo from "./organismo/organismo.query.resolver.service";
import queryTelemetria from "./telemetria/instalacion/instalacion.query.resolver";

const unionQueryResolver = GMR.merge(
    [
        queryDocExt,
        queryDeptos,
        queryUsuarios,
        queryFolios,
        queryOrganismo,
        queryTelemetria
    ]);

export default unionQueryResolver;
