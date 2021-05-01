import GMR from 'graphql-merge-resolvers';
import typesRelacionar from "./tipos.type.resolver";

const unionTypeResolver = GMR.merge(
    [
        typesRelacionar,
    ]);

export default unionTypeResolver;
