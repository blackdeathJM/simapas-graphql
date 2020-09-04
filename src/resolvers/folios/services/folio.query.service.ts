import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";

class FolioQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, contexto: IContextData)
    {super(root, variables, contexto);}

}
