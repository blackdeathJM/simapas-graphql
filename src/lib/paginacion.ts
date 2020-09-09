import {Db} from "mongodb";

export async function paginacion(db: Db, coleccion: string, pagina: number = 1, elementosPorPagina: number = 20)
{
    // Comprobar el numero de elementos por pagina
    if (elementosPorPagina < 1 || elementosPorPagina > 20)
    {
        elementosPorPagina = 20;
    }
    if (pagina < 1)
    {
        pagina = 1;
    }

    const total = await db.collection(coleccion, {}).countDocuments();
    const paginas = Math.ceil(total / elementosPorPagina);
    return {
        pagina,
        saltar: (pagina - 1) * elementosPorPagina,
        elementosPorPagina,
        total,
        paginas
    }
}
