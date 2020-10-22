import {IResolvers} from "graphql-tools";
import InstalacionMutationService from "./services/instalacion.mutation.service";

const mutationTelemetria: IResolvers =
    {
        Mutation:
            {
                async regInstalacion(_, {instalacion}, {db}) {
                    return new InstalacionMutationService(_, instalacion, {db})._registroInstalacion();
                },
                async actInstalacion(_, instalacion, {db}) {
                    return new InstalacionMutationService(_, instalacion, {db})._actInstalacion();
                },
                async desIntalacion(_, {activo}, {db}) {
                    return new InstalacionMutationService(_, {instalacion: {activo}}, {db})._desInstalacion();
                },
                async agIps(_, {telemetria, _id}, {db}) {
                    return new InstalacionMutationService(_, {telemetria, _id}, {db})._telemetria();
                },
                async regParamElectricos(_, {_id, parametrosElectricos, parametro}, {db}) {
                    return new InstalacionMutationService(_, {_id, parametrosElectricos}, {db})._regParamElectricos(parametro);
                },
                async regMotor(_, {_id, motor}, {db}) {
                    return new InstalacionMutationService(_, {_id, motor}, {db})._regMotor();
                },
                async regBomba(_, {_id, bomba}, {db}) {
                    return new InstalacionMutationService(_, {_id, bomba}, {db})._regBobma();
                },
                async bajaMotor(_, {_id, id, fechaBaja}, {db}) {
                    return new InstalacionMutationService(_, {_id}, {db})._bajaMotor(fechaBaja, id);
                },
                async bajaBomba(_, {_id, id, fechaBaja}, {db}) {
                    return new InstalacionMutationService(_, {_id}, {db})._bajaBomba(fechaBaja, id);
                },
                async regLecturasMacro(_, {_id, lecturas}, {db}) {
                    return new InstalacionMutationService(_, {_id}, {db})._regLecturasMacro(lecturas);
                }
            }
    };

export default mutationTelemetria;
