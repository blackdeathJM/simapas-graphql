import {PubSub} from "apollo-server";
import {Db} from "mongodb";
import {COLECCION, PUB_SUB} from "../../../config/global";

export async function cambioRol(pubsub: PubSub, db: Db, usuario: string)
{
    const buscarUsuario = await db.collection(COLECCION.USUARIOS).findOne({usuario});

    return await pubsub.publish(PUB_SUB.NOT_CAMBIO_ROLE, {cambiarRoleUsuario: buscarUsuario})
}
