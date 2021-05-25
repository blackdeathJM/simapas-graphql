import {IResolvers} from "graphql-tools";
import InstalacionMutationService from "./services/instalacion.mutation.service";
import {TelemetriaMutationService} from "./services/telemetria-mutation.service";
import {MotorBombaMutationService} from "./services/motor-bomba-mutation.service";
import {LecturasParametrosMutationService} from "./services/lecturas-parametros.mutation.service";
import {LectMedMutationService} from "./services/lect-med.mutation.service";
import {CfeMutationService} from "./services/cfe.mutation.service";

const mutationTelemetria: IResolvers =
    {
        Mutation:
            {
                async regInstalacion(_, {instalacion}, {db})
                {
                    return new InstalacionMutationService(_, {db})._registroInstalacion(instalacion);
                },
                async actInstalacion(_, {instalacion}, {db})
                {
                    return new InstalacionMutationService(_, {db})._actInstalacion(instalacion);
                },
                async agIps(_, {_id, tipo, ip}, {db})
                {
                    return new TelemetriaMutationService(_, {db})._agIps(_id, tipo, ip);
                },
                async actElimIp(_, {_id, tipo, ipAnterior, ipNva}, {db})
                {
                    return new TelemetriaMutationService(_, {db})._actElimIp(_id, tipo, ipAnterior, ipNva);
                },
                async regParamElectricos(_, {_id, parametrosElectricos, parametro}, {db})
                {
                    return new LecturasParametrosMutationService(_, {db})._regParamElectricos(_id, parametrosElectricos, parametro);
                },
                async regMotor(_, {_id, motor}, {db})
                {
                    return new MotorBombaMutationService(_, {db})._regMotor(_id, motor);
                },
                async actMotor(_, {_id, motor}, {db})
                {
                    return new MotorBombaMutationService(_, {db})._actMotor(_id, motor);
                },
                async regBomba(_, {_id, bomba}, {db})
                {
                    return new MotorBombaMutationService(_, {db})._regBobma(_id, bomba);
                },
                async actBomba(_, {_id, bomba}, {db})
                {
                    return new MotorBombaMutationService(_, {db})._actBobma(_id, bomba);
                },
                async bajaEquipo(_, {_id, id, fechaBaja, equipo, motivoRetiro}, {db})
                {
                    return new MotorBombaMutationService(_, {db})._bajaEquipo(_id, id, fechaBaja, equipo, motivoRetiro);
                },
                async evidencia(_, {_id, id, coleccionImg, esInstalacion, equipo}, {db})
                {
                    return new MotorBombaMutationService(_, {db})._evidencia(_id, id, coleccionImg, esInstalacion, equipo);
                },
                async regLecturas(_, {_id, tipo, lecturas}, {db})
                {
                    return new LectMedMutationService(_, {db})._regLecturas(_id, tipo, lecturas);
                },
                async editarLectura(_, {_id, ano, mes, tipoLect, valorMes, totalMes}, {db})
                {
                    return new LectMedMutationService(_, {db})._editarLectura(_id, ano, mes, tipoLect, valorMes, totalMes);
                },
                async regMedidor(_, {_id, medidor}, {db})
                {
                    return new CfeMutationService(_, {db})._regMedidor(_id, medidor);
                },
                async bajaMedidor(_, {_id, medidor, fechaBaja}, {db})
                {
                    return new CfeMutationService(_, {db})._bajaMedidor(_id, medidor, fechaBaja);
                },
                async regReciboCfe(_, {_id, medidor, reciboCfe}, {db})
                {
                    return new CfeMutationService(_, {db})._regReciboCfe(_id, medidor, reciboCfe);
                }
            }
    };

export default mutationTelemetria;
