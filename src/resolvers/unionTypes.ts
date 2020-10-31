import GMR from 'graphql-merge-resolvers';
import typeDepto from "./global/departamentos/departamento.type.resolver";

const unionTypeResolver = GMR.merge([typeDepto]);

export default unionTypeResolver;
