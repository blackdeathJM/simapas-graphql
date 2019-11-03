import {IResolvers} from "graphql-tools";
import Subscriptiondepartamento from "./subscriptions/departamento.resolver.subscription";
import mutationDepartamento from "./mutations/departamento.resolver.mutation";
import mutationUsuario from "./mutations/usuario.resolver.mutation";
import queryDepartamento from "./queries/departamento.resolver.query";
import queryUsuario from "./queries/usuario.resolver.query";

const resolvers: IResolvers =
    {
            ...queryUsuario,
            ...queryDepartamento,
            ...mutationUsuario,
            ...mutationDepartamento,
            ...Subscriptiondepartamento
    };
export default resolvers;
