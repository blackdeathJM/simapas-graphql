import {merge} from 'lodash'
import mutationDeptos from "./departamentos/departamento.mutation.resolver";
import mutation from "./mutation";

const unionMutationResolver = merge(mutation, mutationDeptos);

export default unionMutationResolver;
