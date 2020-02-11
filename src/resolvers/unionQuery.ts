import {merge} from "lodash";
import queryDocExt from "./docExt/docExt.query.resolver";
import queryDeptos from "./departamentos/departamento.query.resolver";
import queryUsuarios from "./usuarios/usuario.query.resolver";
import queryFolios from "./folios/folio.query.resolver";
import queryDocInterna from "./docInterna/docInterna.query.Resolver";

const unionQueryResolver = merge(queryDocExt, queryDeptos, queryUsuarios, queryFolios, queryDocInterna);

export default unionQueryResolver;
