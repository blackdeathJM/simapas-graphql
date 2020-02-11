import {merge} from "lodash";
import typeDeptos from "./departamentos/departamento.type.resolver";

const unionTypeResolver = merge(typeDeptos);

export default unionTypeResolver;
