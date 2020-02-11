import {merge} from "lodash";
import type from "./type";
import typeDeptos from "./departamentos/departamento.type.resolver";

const unionTypeResolver = merge(type, typeDeptos);

export default unionTypeResolver;
