// import {merge} from 'lodash';
import GMR from 'graphql-merge-resolvers';
import mutationDeptos from "./departamentos/departamento.mutation.resolver";
import mutationDocExt from "./docExt/docExt.mutation.resolver";
import mutationUsuarios from "./usuarios/usuario.mutation.resolver";
import mutationFolios from "./folios/folio.mutation.resolver";
import mutationDocInterna from "./docInterna/docInterna.mutation.resolver";

const unionMutationResolver = GMR.merge([mutationDocExt, mutationDeptos, mutationUsuarios, mutationFolios, mutationDocInterna]);

export default unionMutationResolver;
