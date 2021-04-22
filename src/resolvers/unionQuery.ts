import GMR from 'graphql-merge-resolvers';
import queryDocExt from "./presidencia/documentacion/docExt/docExt.query.resolver";
import queryDeptos from "./global/departamentos/departamento.query.resolver";
import queryUsuarios from "./usuarios/usuario.query.resolver";
import queryTelemetria from "./presidencia/telemetria/instalacion/instalacion.query.resolver";
import queryDocUsuario from "./usuarios/documentos/doc.query.resolver";
import queryNotificacion from "./global/notificaciones/notificacion.query.resolver";
import {queryOrdenesTrabajo} from "./global/ordenes-trabajo/ordenes-trabajo.query.resolver";
import {queryCliente} from "./dir-comercial/resolvers/cliente.query.resolver";

const unionQueryResolver = GMR.merge(
    [
        queryDocExt,
        queryDocUsuario,
        queryDeptos,
        queryUsuarios,
        queryNotificacion,
        queryTelemetria,
        queryOrdenesTrabajo,
        queryCliente
    ]);

export default unionQueryResolver;
