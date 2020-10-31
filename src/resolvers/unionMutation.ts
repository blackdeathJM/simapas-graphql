// import {merge} from 'lodash';
import GMR from 'graphql-merge-resolvers';
import mutationDeptos from "./global/departamentos/departamento.mutation.resolver";
import mutationDocExt from "./global/docExt/docExt.mutation.resolver";
import mutationUsuarios from "./usuarios/usuario.mutation.resolver";
import mutationFolios from "./global/folios/folio.mutation.resolver";
import mutationOrganismo from "./organismo/organismo.rmutation.resolver";
import mutationTelemetria from "./telemetria/instalacion/instalacion.mutation.resolver";
import mutationOrdenTrabajo from "./global/ordenTrabajo/orden-trabajo-mutation.resolver";

const unionMutationResolver = GMR.merge(
    [
            mutationDocExt,
            mutationDeptos,
            mutationUsuarios,
            mutationFolios,
            mutationOrganismo,
            mutationTelemetria,
            mutationOrdenTrabajo
    ]);

export default unionMutationResolver;
