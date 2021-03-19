import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";
import {nvaProp} from "../../../../../services/definirPropiedades";

export class LecturasParametrosMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _regParamElectricos(parametrosElectricos: any, _id: string, parametro: string)
    {
        // Buscar si existe el parametro electrico
        const idDocumento = {_id: new ObjectId(_id)}

        const consulta = nvaProp(`parametrosElectricos.${parametro}`, {
            $elemMatch: {
                ano: parametrosElectricos[parametro]['ano'],
                mes: parametrosElectricos[parametro]['mes']

        }});

        const existe = await this.buscarUnElemento(COLECCION.TELEMETRIA, Object.assign(idDocumento, consulta), {});

        console.log('Parametro consulta', consulta);

        //     const existe = await this.buscarUnElemento(COLECCION.TELEMETRIA,
        //         {
        //             _id: new ObjectId(this.variables._id), $or: [{
        //                 "parametrosElectricos.voltajes": {
        //                     $elemMatch: {
        //                         ano: this.variables.parametrosElectricos?.voltajes.ano,
        //                         mes: this.variables.parametrosElectricos?.voltajes.mes
        //                     }
        //                 }
        //             }, {
        //                 "parametrosElectricos.amperajes": {
        //                     $elemMatch: {
        //                         ano: this.variables.parametrosElectricos?.amperajes.ano,
        //                         mes: this.variables.parametrosElectricos?.amperajes.mes
        //                     }
        //                 }
        //             }, {
        //                 "parametrosElectricos.factorPotencia": {
        //                     $elemMatch: {
        //                         ano: this.variables.parametrosElectricos?.factorPotencia.ano,
        //                         mes: this.variables.parametrosElectricos?.factorPotencia.mes
        //                     }
        //                 }
        //             }, {
        //                 "parametrosElectricos.kilowats": {
        //                     $elemMatch: {
        //                         ano: this.variables.parametrosElectricos?.kilowats.ano,
        //                         mes: this.variables.parametrosElectricos?.kilowats.mes
        //                     }
        //                 }
        //             }]
        //         }, {});
        //
        //     if (existe.estatus)
        //     {
        //         return respDocumento(existe);
        //     } else
        //     {
        //         switch (parametro)
        //         {
        //             case 'voltajes':
        //                 return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
        //                     {
        //                         $addToSet:
        //                             {
        //                                 "parametrosElectricos.voltajes": this.variables.parametrosElectricos?.voltajes,
        //                             }
        //                     },
        //                     {returnOriginal: false, upsert: true}).then(
        //                     resultado =>
        //                     {
        //                         return respDocumento(resultado);
        //                     }
        //                 )
        //             case 'amperajes':
        //                 return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
        //                     {
        //                         $addToSet:
        //                             {
        //                                 "parametrosElectricos.amperajes": this.variables.parametrosElectricos?.amperajes,
        //                             }
        //                     },
        //                     {returnOriginal: false, upsert: true}).then(
        //                     resultado =>
        //                     {
        //                         return respDocumento(resultado);
        //                     }
        //                 )
        //             case 'factorPotencia':
        //                 return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
        //                     {
        //                         $addToSet:
        //                             {
        //                                 "parametrosElectricos.factorPotencia": this.variables.parametrosElectricos?.factorPotencia,
        //                             }
        //                     },
        //                     {returnOriginal: false, upsert: true}).then(
        //                     resultado =>
        //                     {
        //                         return respDocumento(resultado);
        //                     }
        //                 )
        //             case 'kilowats':
        //                 return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
        //                     {
        //                         $addToSet:
        //                             {
        //                                 "parametrosElectricos.kilowats": this.variables.parametrosElectricos?.kilowats
        //                             }
        //                     },
        //                     {returnOriginal: false, upsert: true}).then(
        //                     resultado =>
        //                     {
        //                         return respDocumento(resultado);
        //                     }
        //                 )
        //         }
        //     }
    }
}
