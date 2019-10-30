import {IResolvers} from "graphql-tools";

const mutation: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {db}): Promise<any>
                {
                    await db.collection('departamentos').insertOne(departamento);
                    return departamento;
                }
            }
    };

export default mutation;
