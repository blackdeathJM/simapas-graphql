import {merge} from 'lodash'
import mutationDeptos from "./departamentos/departamento.mutation.resolver";
import mutationDocExt from "./docExt/docExt.mutation.resolver";
import mutationUsuarios from "./usuarios/usuario.mutation.resolver";
import mutationFolios from "./folios/folio.mutation.resolver";
import mutationDocInterna from "./docInterna/docInterna.mutation.resolver";

const unionMutationResolver = merge(mutationDocExt, mutationDeptos, mutationUsuarios, mutationFolios, mutationDocInterna);

export default unionMutationResolver;
