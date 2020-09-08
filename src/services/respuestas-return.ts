export function respArreglosPag(resultado: {
        estatus: boolean; elementos: object; mensaje: string;
        info: { pagina: number; saltar: number; paginas: number; total: number; elementosPorPagina: number }
    }
    | { estatus: boolean; elementos: null; mensaje: string; info: { pagina: number; paginas: number; total: number; elementosPorPagina: number } })
{
    return {
        info: {
            pagina: resultado!.info.pagina, paginas: resultado!.info.paginas, elementosPorPagina: resultado!.info.elementosPorPagina,
            total: resultado!.info.total
        },
        estatus: resultado!.estatus, mensaje: resultado!.mensaje, documentos: resultado!.elementos
    }
}

export function respDocumento(resultado: { elemento: object; estatus: boolean; mensaje: string } | { elemento: null; estatus: boolean; mensaje: string })
{
    return {estatus: resultado!.estatus, mensaje: resultado!.mensaje, documento: resultado!.elemento};
}
