import GMR from 'graphql-merge-resolvers';
import typeDepto from "./departamentos/departamento.type.resolver";

const unionTypeResolver = GMR.merge([typeDepto]);

export default unionTypeResolver;
