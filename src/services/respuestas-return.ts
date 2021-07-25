import {Document} from "bson";

export function respArreglosPag(resultado: {
        estatus: boolean; documentos: object; mensaje: string;
        info: { pagina: number; saltar: number; paginas: number; total: number; documentosPorPagina: number }
    }
    | { estatus: boolean; documentos: null; mensaje: string; info: { pagina: number; paginas: number; total: number; documentosPorPagina: number } })
{
    return {
        info: {
            pagina: resultado!.info.pagina, paginas: resultado!.info.paginas, documentosPorPagina: resultado!.info.documentosPorPagina,
            total: resultado!.info.total
        },
        estatus: resultado!.estatus, mensaje: resultado!.mensaje, documentos: resultado!.documentos
    }
}

export function respArreglosSPag(resultado: {
        estatus: boolean; documentos: object; mensaje: string;
    }
    | { estatus: boolean; documentos: null; mensaje: string; })
{
    return {
        estatus: resultado!.estatus, mensaje: resultado!.mensaje, documentos: resultado!.documentos
    }
}

export function respDocumento(resultado: { documento: Document | undefined; estatus: boolean; mensaje: string } |
    { documento: null; estatus: boolean; mensaje: string })
{
    return {resultado};
}
