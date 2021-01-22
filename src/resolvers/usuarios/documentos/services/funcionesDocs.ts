import {COLECCION} from "../../../../config/global";
import {Db} from "mongodb";

export async function formatoFolio(centroGestor: string, tipoDoc: string, db: Db): Promise<string>
{

    const mes = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();

    return await db.collection(COLECCION.DOC_EXTERNA).countDocuments({folio: {$ne: null}, tipoDoc}, {}).then(
        res =>
        {
            return `SIMAPAS/${tipoDoc.substr(0, 3).toUpperCase()}/${centroGestor.toUpperCase()}/${res + 1}/${mes}-${ano}`;
        }
    )
}
