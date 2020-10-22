import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respDocumento} from "../../../../services/respuestas-return";
import {ObjectId} from 'bson';
import {ILecturasMacro} from "../../models/lecturas-interface";

class InstalacionMutationService extends ResolversOperacionesService {
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    async _registroInstalacion() {
        return await this.agregarUnElemento(COLECCION.TELEMETRIA, this.variables, {}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }

    async _actInstalacion() {
        const _id = this.variables.instalacion?._id;
        delete this.variables.instalacion?._id;
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(_id)},
            {$set: this.variables.instalacion}, {returnOriginal: false}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }

    async _desInstalacion() {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }

    async _telemetria() {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)},
            {$set: {telemetria: this.variables.telemetria}}, {returnOriginal: false, upsert: true}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }

    async _regParamElectricos(parametro: string) {
        const existe = await this.buscarUnElemento(COLECCION.TELEMETRIA,
            {
                _id: new ObjectId(this.variables._id), $or: [{
                    "parametrosElectricos.voltajes": {
                        $elemMatch: {
                            ano: this.variables.parametrosElectricos?.voltajes.ano,
                            mes: this.variables.parametrosElectricos?.voltajes.mes
                        }
                    }
                }, {
                    "parametrosElectricos.amperajes": {
                        $elemMatch: {
                            ano: this.variables.parametrosElectricos?.amperajes.ano,
                            mes: this.variables.parametrosElectricos?.amperajes.mes
                        }
                    }
                }, {
                    "parametrosElectricos.factorPotencia": {
                        $elemMatch: {
                            ano: this.variables.parametrosElectricos?.factorPotencia.ano,
                            mes: this.variables.parametrosElectricos?.factorPotencia.mes
                        }
                    }
                }, {
                    "parametrosElectricos.kilowats": {
                        $elemMatch: {
                            ano: this.variables.parametrosElectricos?.kilowats.ano,
                            mes: this.variables.parametrosElectricos?.kilowats.mes
                        }
                    }
                }]
            }, {});

        if (existe.estatus) {
            return respDocumento(existe);
        } else {
            switch (parametro) {
                case 'voltajes':
                    return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
                        {
                            $addToSet:
                                {
                                    "parametrosElectricos.voltajes": this.variables.parametrosElectricos?.voltajes,
                                }
                        },
                        {returnOriginal: false, upsert: true}).then(
                        resultado => {
                            return respDocumento(resultado);
                        }
                    )
                case 'amperajes':
                    return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
                        {
                            $addToSet:
                                {
                                    "parametrosElectricos.amperajes": this.variables.parametrosElectricos?.amperajes,
                                }
                        },
                        {returnOriginal: false, upsert: true}).then(
                        resultado => {
                            return respDocumento(resultado);
                        }
                    )
                case 'factorPotencia':
                    return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
                        {
                            $addToSet:
                                {
                                    "parametrosElectricos.factorPotencia": this.variables.parametrosElectricos?.factorPotencia,
                                }
                        },
                        {returnOriginal: false, upsert: true}).then(
                        resultado => {
                            return respDocumento(resultado);
                        }
                    )
                case 'kilowats':
                    return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
                        {
                            $addToSet:
                                {
                                    "parametrosElectricos.kilowats": this.variables.parametrosElectricos?.kilowats
                                }
                        },
                        {returnOriginal: false, upsert: true}).then(
                        resultado => {
                            return respDocumento(resultado);
                        }
                    )
            }
        }
    }

    async _regMotor() {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)},
            {$addToSet: {motor: this.variables.motor}}, {returnOriginal: false, upsert: true}).then(
            resultado => {
                return respDocumento(resultado);
            }
        );
    }

    async _regBobma() {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)},
            {$addToSet: {bomba: this.variables.bomba}}, {returnOriginal: false, upsert: true}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }

    async _bajaMotor(fechaBaja: string, id: string) {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id), motor: {$elemMatch: {id}}},
            {$set: {"motor.$.fechaRetiro": fechaBaja, "motor.$.activa": false}}, {returnOriginal: false}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }

    async _bajaBomba(fechaBaja: string, id: string) {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id), bomba: {$elemMatch: {id}}},
            {$set: {"bomba.$.fechaRetiro": fechaBaja, "bomba.$.activa": false}}, {returnOriginal: false}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }

    async _regLecturasMacro(lecturas: ILecturasMacro) {
        console.log('lecturas', lecturas);
        console.log('id', this.variables._id)
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)}, {$addToSet: {lecturas: lecturas}}, {ReturnOriginal: false}).then(
            resultado => {
                return respDocumento(resultado);
            }
        )
    }
}

export default InstalacionMutationService;
