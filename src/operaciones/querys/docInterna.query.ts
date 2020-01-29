import {COLECCIONES} from "../../config/constants";

export async function todasNotificacionesDocInterna(db: any) {
    return await db.collection(COLECCIONES.DOCINTERNA).find().toArray();
}

export async function todasNotificacionesUsuario(usuario: string, db: any) {
    // return await db.collection("docInterna").find({"usuarioDestino.usuario": usuario}).toArray();
    return await db.collection(COLECCIONES.DOCINTERNA).find({
        "usuarioDestino": {
            $elemMatch: {
                usuario,
                visto: true
            }
        }
    }).toArray();
}

export async function docInternaUsuarioVisto(usuario: string, visto: boolean, db: any) {
    return await db.collection(COLECCIONES.DOCINTERNA).find({
        "usuarioDestino": {
            $elemMatch: {
                usuario,
                visto
            }
        }
    }).toArray();
}
