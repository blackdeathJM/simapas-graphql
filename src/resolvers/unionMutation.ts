// import {merge} from 'lodash';
import GMR from 'graphql-merge-resolvers';
import mutationDeptos from "./departamentos/departamento.mutation.resolver";
import mutationDocExt from "./docExt/docExt.mutation.resolver";
import mutationUsuarios from "./usuarios/usuario.mutation.resolver";
import mutationFolios from "./folios/folio.mutation.resolver";
import mutationOrganismo from "./organismo/organismo.rmutation.resolver";

const unionMutationResolver = GMR.merge(
    [
        mutationDocExt,
        mutationDeptos,
        mutationUsuarios,
        mutationFolios,
        mutationOrganismo
    ]);

export default unionMutationResolver;
