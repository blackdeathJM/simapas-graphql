import {IResolvers} from "graphql-tools";

const typeDocExt: IResolvers =
    {
        Folio:
            {
                docExtEnt: async (parent: any, __: any, {db}) =>
                {
                    console.log('parent docExt', parent);
                    // return await db.collection(COLECCIONES.DOC_EXTERNA).findOne({_id: new ObjectId(parent._id)});
                }
            }
    };
