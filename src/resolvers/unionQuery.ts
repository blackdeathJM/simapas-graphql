import GMR from 'graphql-merge-resolvers';
import queryDocExt from "./presidencia/documentacion/docExt/docExt.query.resolver";
import queryDeptos from "./global/departamentos/departamento.query.resolver";
import queryUsuarios from "./usuarios/usuario.query.resolver";
import queryTelemetria from "./telemetria/instalacion/instalacion.query.resolver";

const unionQueryResolver = GMR.merge(
    [
        queryDocExt,
        queryDeptos,
        queryUsuarios,
        queryTelemetria,
    ]);

export default unionQueryResolver;
