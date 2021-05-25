// import {merge} from 'lodash';
import GMR from 'graphql-merge-resolvers';
import mutationDeptos from "./global/departamentos/departamento.mutation.resolver";
import mutationDocExt from "./presidencia/documentacion/docExt/docExt.mutation.resolver";
import mutationUsuarios from "./usuarios/usuario.mutation.resolver";
import mutationTelemetria from "./presidencia/telemetria/instalacion/instalacion.mutation.resolver";
import mutationDocUsuario from "./usuarios/documentos/doc.mutation.resolver";
import mutationNotificacion from "./global/notificaciones/notificaciones.mutation.resolver";
import {mutationOrdenTrabajo} from "./global/ordenes-trabajo/ordenes-trabajo.mutation.resolver";
import {mutationCliente} from "./dir-comercial/resolvers/cliente.mutation.resolver";
import {mutationColeIndividuales} from "./dir-comercial/resolvers/coleIndividuales.mutation.resolver";

const unionMutationResolver = GMR.merge(
    [
        mutationDocExt,
        mutationDocUsuario,
        mutationDeptos,
        mutationUsuarios,
        mutationNotificacion,
        mutationTelemetria,
        mutationOrdenTrabajo,
        mutationCliente,
        mutationColeIndividuales
    ]);

export default unionMutationResolver;
