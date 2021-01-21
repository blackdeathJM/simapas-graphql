import {COLECCION} from "../../../../config/global";
import {Db} from "mongodb";

export async function formatoFolio(centroGestor: string, tipoDoc: string, db: Db): Promise<void | string>
{

    const mes = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();

    let filtro: object = {};
    Object.defineProperty(filtro, tipoDoc, {value: {$ne: null}, writable: true, configurable: true, enumerable: true})

    console.log('filtro', filtro);

    return await db.collection(COLECCION.DOC_EXTERNA).countDocuments(filtro, {}).then(
        res =>
        {
            return `SIMAPAS/${tipoDoc.substr(0, 3).toUpperCase()}/${centroGestor.toUpperCase()}/${res + 1}/${mes}-${ano}`;
        }
    )
}
