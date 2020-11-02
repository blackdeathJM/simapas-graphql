import GMR from 'graphql-merge-resolvers';
import queryDocExt from "./global/docExt/docExt.query.resolver";
import queryDeptos from "./global/departamentos/departamento.query.resolver";
import queryUsuarios from "./usuarios/usuario.query.resolver";
import queryFolios from "./global/folios/folio.query.resolver";
import queryOrganismo from "./organismo/organismo.query.resolver.service";
import queryTelemetria from "./telemetria/instalacion/instalacion.query.resolver";
import queryOrdenTrabajo from "./global/ordenTrabajo/orden-trabajo-query.resolver";
import queryCliente from "./clientes/cliente-query-resolver";

const unionQueryResolver = GMR.merge(
    [
        queryDocExt,
        queryDeptos,
        queryUsuarios,
        queryFolios,
        queryOrganismo,
        queryTelemetria,
        queryOrdenTrabajo,
        queryCliente
    ]);

export default unionQueryResolver;
