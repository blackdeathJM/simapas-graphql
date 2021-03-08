import {IResolvers} from "graphql-tools";
import InstalacionMutationService from "./services/instalacion.mutation.service";
import {TelemetriaMutationService} from "./services/telemetria-mutation.service";
import {MotorBombaMutationService} from "./services/motor-bomba-mutation.service";

const mutationTelemetria: IResolvers =
    {
        Mutation:
            {
                async regInstalacion(_, {instalacion}, {db})
                {
                    return new InstalacionMutationService(_, {}, {db})._registroInstalacion(instalacion);
                },
                async actInstalacion(_, {instalacion}, {db})
                {
                    return new InstalacionMutationService(_, {}, {db})._actInstalacion(instalacion);
                },
                async desIntalacion(_, {activo}, {db})
                {
                    return new InstalacionMutationService(_, {instalacion: {activo}}, {db})._desInstalacion();
                },
                async agIps(_, {_id, telemetria}, {db})
                {
                    return new TelemetriaMutationService(_, {}, {db})._agIps(_id, telemetria);
                },
                async regParamElectricos(_, {_id, parametrosElectricos, parametro}, {db})
                {
                    return new InstalacionMutationService(_, {_id, parametrosElectricos}, {db})._regParamElectricos(parametro);
                },
                async regMotor(_, {_id, motor}, {db})
                {
                    return new MotorBombaMutationService(_, {}, {db})._regMotor(_id, motor);
                },
                async regBomba(_, {_id, bomba}, {db})
                {
                    return new MotorBombaMutationService(_, {}, {db})._regBobma(_id, bomba);
                },
                async bajaMotor(_, {_id, id, fechaBaja}, {db})
                {
                    return new MotorBombaMutationService(_, {_id}, {db})._bajaMotor(fechaBaja, id);
                },
                async bajaBomba(_, {_id, id, fechaBaja}, {db})
                {
                    return new MotorBombaMutationService(_, {_id}, {db})._bajaBomba(fechaBaja, id);
                },
                async regLecturas(_, {_id, tipo, lecturas}, {db})
                {
                    return new InstalacionMutationService(_, {_id}, {db})._regLecturas(lecturas, tipo);
                },
                async regMedidor(_, {_id, medidor}, {db})
                {
                    return new InstalacionMutationService(_, {_id}, {db})._regMedidor(medidor);
                },
                async bajaMedidor(_, {_id, medidor, fechaBaja}, {db})
                {
                    return new InstalacionMutationService(_, {_id}, {db})._bajaMedidor(medidor, fechaBaja)
                },
                async regReciboCfe(_, {_id, reciboCfe}, {db})
                {
                    return new InstalacionMutationService(_, {_id}, {db})._regReciboCfe(reciboCfe);
                }
            }
    };

export default mutationTelemetria;
