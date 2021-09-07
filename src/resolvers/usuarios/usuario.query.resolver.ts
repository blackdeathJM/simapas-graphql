import {UsuarioQueryService} from "./services/usuario-query.service";
import {Db} from "mongodb";

export const queryUsuarios =
    {
        Query:
            {
                obtenerUsuarios: async (_: object, {}, p: { db: Db }) =>
                {
                    return await new UsuarioQueryService(_, {db: p.db})._obtenerUsuarios();
                },
                obtenerUsuario: async (_: object, a: { _id: string }, p: { db: Db }) =>
                {
                    return await new UsuarioQueryService(_, {db: p.db})._obtenerUsuario(a._id);
                },
                login: async (_: object, a: { usuario: string, contrasena: string }, p: { db: Db }) =>
                {
                    return await new UsuarioQueryService(_, {db: p.db})._login(a.usuario, a.contrasena);
                },
            }
    };
