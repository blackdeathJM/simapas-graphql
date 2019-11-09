import {IResolvers} from 'graphql-tools';
import {obtenerDeptos} from "../operaciones/querys/departamento.query";

const type: IResolvers =
    {
        Usuario:
            {
                departamento: async (parent: any, __: any, {db}) =>
                {
                    let resDeptoo: Array<any> = [];
                    const deptoID = parent.departamentoID;
                    return await obtenerDeptos(db).then(
                        async (resDepto: any) =>
                        {
                            resDepto.map((res: any) =>
                            {
                                if (res._id === deptoID)
                                {
                                    resDeptoo.push(res);
                                    console.log('*-*-*-*-*-*-*-*-*-*-*', resDeptoo);
                                } else
                                {
                                    console.log('El else');
                                }
                            });
                        }
                    ).catch(
                        async () =>
                        {

                        }
                    )
                }
            }
    };
export default type;
