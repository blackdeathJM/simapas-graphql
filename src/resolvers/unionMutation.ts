// import {merge} from 'lodash';
import GMR from 'graphql-merge-resolvers';
import mutationDeptos from "./global/departamentos/departamento.mutation.resolver";
import mutationDocExt from "./presidencia/documentacion/docExt/docExt.mutation.resolver";
import mutationUsuarios from "./usuarios/usuario.mutation.resolver";
import mutationTelemetria from "./telemetria/instalacion/instalacion.mutation.resolver";

const unionMutationResolver = GMR.merge(
    [
        mutationDocExt,
        mutationDeptos,
        mutationUsuarios,
        mutationTelemetria,
    ]);

export default unionMutationResolver;
