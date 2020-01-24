import {obtenerDeptos} from "../querys/departamento.query";

export async function enviarNotificacionDepto(pubsub: any, db: any)
{
    await pubsub.publish('cambioDepartamentos', {cambioDepartamento: await obtenerDeptos(db)});
}
