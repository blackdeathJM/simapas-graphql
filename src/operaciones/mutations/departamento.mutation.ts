import {ObjectId} from "bson";
import {COLECCIONES} from "../../config/constants";

// import {enviarNotificacionDepto} from "../subscriptions/departamento.subcription";

export async function regDepto(depto: any, pubsub: any, db: any) {
    console.log("Depto", depto);
    return await db.collection(COLECCIONES.DEPARTAMENTOS).insertOne(depto).then(
        async (departamento: any) => {
            return {
                estatus: true,
                mensaje: 'Departamento insertado satisfactoriamente',
                departamento: departamento.value
            }
        }
    ).catch(
        async (error: any) => {
            return {
                estatus: false,
                mensaje: 'Ocurrio un error al tratar de registrar el departamento', error,
                departamento: null
            }

        }
    );
}

export async function acDepto(_id: ObjectId, nombre: string, db: any) {
    return await db.collection(COLECCIONES.DEPARTAMENTOS).findOneAndUpdate({_id: new ObjectId(_id)}, {$set: {nombre}}).then(
        async (departamento: any) => {
            return {
                estatus: true,
                mensaje: 'Datos actualizados',
                departamento: departamento.value
            }
        }
    ).catch(
        async (error: any) => {
            return {
                estatus: false,
                mensaje: 'Error al intentar actualizar el departamento', error,
                departamento: null
            }
        }
    );
}
