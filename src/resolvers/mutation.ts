import {IResolvers} from "graphql-tools";

const mutation: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {db}): Promise<any>
                {
                    await db.collection('departamentos').insertOne(departamento);
                    return departamento;
                },

                async registroUsuario(_: void, {usuario}, {db}): Promise<any>
                {
                    const depto = await db.collection('departamentos').findOne();
                    usuario.departamento = depto._id;
                    await db.collection('usuarios').insertOne(usuario);
                    return usuario;
                }
            }
    };

export default mutation;
