import {merge} from "lodash";
import query from "./query";
import queryDeptos from "./departamentos/departamento.query.resolver";

const unionQueryResolver = merge(query, queryDeptos);

export default unionQueryResolver;
