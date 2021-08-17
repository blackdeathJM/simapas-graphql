import GMR from 'graphql-merge-resolvers';
import {typesRelacionar} from "./tipos.type.resolver";

export const unionTypeResolver = GMR.merge(
    [
        typesRelacionar,
    ]);
