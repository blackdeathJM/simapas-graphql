import GMR from 'graphql-merge-resolvers';
import typeDepto from "./global/departamentos/departamento.type.resolver";
import typeOrdenTrabajo from "./global/ordenTrabajo/orden-trabajo-type-resolver";

const unionTypeResolver = GMR.merge(
    [
        typeDepto,
        typeOrdenTrabajo
    ]);

export default unionTypeResolver;
