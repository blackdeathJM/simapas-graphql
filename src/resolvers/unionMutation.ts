// import {merge} from 'lodash';
import GMR from 'graphql-merge-resolvers';
import mutationDeptos from "./global/departamentos/departamento.mutation.resolver";
import mutationDocExt from "./direccion/documentacion/docExt/docExt.mutation.resolver";
import mutationUsuarios from "./usuarios/usuario.mutation.resolver";
import mutationFolios from "./usuarios/documentos/folios/folio.mutation.resolver";
import mutationOrganismo from "./organismo/organismo.rmutation.resolver";
import mutationTelemetria from "./telemetria/instalacion/instalacion.mutation.resolver";
import mutationOrdenTrabajo from "./global/ordenTrabajo/orden-trabajo-mutation.resolver";
import mutationClientes from "./clientes/cliente-mutation-resolver";

const unionMutationResolver = GMR.merge(
    [
            mutationDocExt,
            mutationDeptos,
            mutationUsuarios,
            mutationFolios,
            mutationOrganismo,
            mutationTelemetria,
            mutationOrdenTrabajo,
            mutationClientes
    ]);

export default unionMutationResolver;
