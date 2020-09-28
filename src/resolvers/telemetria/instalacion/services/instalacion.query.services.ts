import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {COLECCION} from "../../../../config/global";
import {respArreglosPag} from "../../../../services/respuestas-return";
import * as _ from "lodash";

class InstalacionQueryServices extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _todasInstalaciones()
    {
        return await this.buscar(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resultado => respArreglosPag(resultado)
        )
    }

    async _ipDuplicada()
    {
        let tele: any[] = [];
        let valoresRecibidos = _.toArray(this.variables.telemetria);
        console.log('variables', this.variables);
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resul =>
            {
                resul.elementos?.forEach(value =>
                {
                    if (value.telemetria !== undefined)
                    {
                        tele.push(value.telemetria);
                        // tele.push(value.telemetria.plc);
                        // tele.push(value.telemetria.switch);
                        // tele.push(value.telemetria.repetidor);
                    }
                });
                // valoresRecibidos.push(this.variables.telemetria?.radio);
                // valoresRecibidos.push(this.variables.telemetria?.plc);
                // valoresRecibidos.push(this.variables.telemetria?.repetidor);
                // valoresRecibidos.push(this.variables.telemetria?.switch);
                console.log('Valores de la base de datos', _.flattenDeep(tele));
                console.log('variables recibidas', _.flattenDeep(valoresRecibidos));

                // const valorConvertidoRecibido = _.compact(valoresRecibidos.join().split(","));
                //
                // const teleConvertido = _.compact(tele.join().split(","));
                // console.log('-----', valorConvertidoRecibido);
                console.log('******', _.differenceWith(tele, valoresRecibidos))
                // return _.isEqualWith(teleConvertido, valorConvertidoRecibido).valueOf();
            }
        )
    }
}

export default InstalacionQueryServices
