import ResolversOperacionesService from "../../../services/resolver-operaciones";

class FolioMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, contexto: object)
    {super(root, variables, contexto);}

    registrarFolio()
    {
        console.log('valores recibidos', this.variables);
        // const resultado = this.agregarUnElemento(COLECCION.FOLIOS, this.variables, {});
    }
}
export default FolioMutationService;
