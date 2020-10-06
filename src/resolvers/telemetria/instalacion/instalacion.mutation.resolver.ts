import {IResolvers} from "graphql-tools";
import InstalacionMutationService from "./services/instalacion.mutation.service";

const mutationTelemetria: IResolvers =
    {
        Mutation:
            {
                async regInstalacion(_, {instalacion}, {db})
                {
                    return new InstalacionMutationService(_, instalacion, {db})._registroInstalacion();
                },
                async actInstalacion(_, instalacion, {db})
                {
                    return new InstalacionMutationService(_, instalacion, {db})._actInstalacion();
                },
                async desIntalacion(_, {activo}, {db})
                {
                    return new InstalacionMutationService(_, {instalacion: {activo}}, {db})._desInstalacion();
                },
                async agIps(_, {telemetria, _id}, {db})
                {
                    return new InstalacionMutationService(_, {telemetria, _id}, {db})._telemetria();
                },
                async regVoltajes(_, {parametrosElectricos, _id}, {db})
                {
                    return new InstalacionMutationService(_, {_id, parametrosElectricos}, {db})._regVoltajes();
                }
            }
    };

export default mutationTelemetria;
