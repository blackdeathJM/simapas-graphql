import {COLECCIONES} from "../../config/constants";

export async function todasNotificacionesDocInterna(db: any)
{
    return await db.collection(COLECCIONES.DOCINTERNA).find().toArray();
}

export async function todasNotificacionesUsuario(usuario: string, db: any)
{
    return await db.collection(COLECCIONES.DOCINTERNA).find({"usuarioDestino.usuario": usuario}).toArray();
}

export async function docInternaUsuarioVisto(usuario: string, visto: boolean, db: any)
{
    return await db.collection(COLECCIONES.DOCINTERNA).find({usuarioDestino: {$elemMatch: {usuario, visto}}}).toArray();
    // return await db.collection(COLECCIONES.DOCINTERNA).find({$query: {usuarioDestino: {$elemMatch: {usuario, visto}}}}, {}).toArray();
}
