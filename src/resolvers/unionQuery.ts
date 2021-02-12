import GMR from 'graphql-merge-resolvers';
import queryDocExt from "./presidencia/documentacion/docExt/docExt.query.resolver";
import queryDeptos from "./global/departamentos/departamento.query.resolver";
import queryUsuarios from "./usuarios/usuario.query.resolver";
import queryTelemetria from "./presidencia/telemetria/instalacion/instalacion.query.resolver";
import queryDocUsuario from "./usuarios/documentos/doc.query.resolver";
import queryNotificacion from "./global/notificaciones/notificacion.query.resolver";

const unionQueryResolver = GMR.merge(
    [
        queryDocExt,
        queryDocUsuario,
        queryDeptos,
        queryUsuarios,
        queryNotificacion,
        queryTelemetria,
    ]);

export default unionQueryResolver;
