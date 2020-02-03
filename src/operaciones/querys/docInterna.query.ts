import {COLECCIONES} from "../../config/constants";

const modeloDocInterna =
    {
        "fechaCreacion": 1,
        "asunto": 1,
        "contenido": 1,
        "atte": 1,
        "folioInterno": 1,
        "num": 1,
        "usuarioDestino.$": 1
    };

export async function todasNotificacionesDocInterna(db: any)
{
    return await db.collection(COLECCIONES.DOC_INTERNA).find().toArray();
}

export async function todasNotificacionesUsuario(usuario: string, db: any)
{
    return await db.collection(COLECCIONES.DOC_INTERNA).find({"usuarioDestino.usuario": usuario}).toArray();
}

export async function docInternaUsuarioVisto(usuario: string, visto: boolean, db: any)
{
    return await db.collection(COLECCIONES.DOC_INTERNA).find({usuarioDestino: {$elemMatch: {usuario, visto}}}, {projection: modeloDocInterna}).toArray();

}
