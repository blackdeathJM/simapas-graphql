import {DocExtMutationService} from "./services/docExt-mutation.service";
import {IDocExt} from "./models/docExt.interface";
import {PubSub} from "graphql-subscriptions";
import {Db} from "mongodb";

export const mutationDocExt =
    {
        Mutation:
            {
                regDocExt: async (_: object, ar: { docExt: IDocExt, file: any, carpeta: string }, pa: { pubsub: PubSub, db: Db }) =>
                {
                    return new DocExtMutationService(_, {pubsub: pa.pubsub, db: pa.db})._regDocExt(ar.docExt, ar.file, ar.carpeta);
                },
                acDarPorEntregado: async (_: object, ar: { _id: string }, pa: { pubsub: PubSub, db: Db }) =>
                {
                    return new DocExtMutationService(_, {pubsub: pa.pubsub, db: pa.db})._darPorEntregado(ar._id);
                },
                acInfoDoc: async (_: object, ar: { documento: IDocExt }, pa: { pubsub: PubSub, db: Db }) =>
                {
                    return new DocExtMutationService(_, {pubsub: pa.pubsub, db: pa.db})._acInfoDoc(ar.documento);
                },
                quitarUsuario: async (_: object, ar: { _id: string, usuarioDestino: string }, pa: { pubsub: PubSub, db: Db }) =>
                {
                    return new DocExtMutationService(_, {pubsub: pa.pubsub, db: pa.db})._quitarUsuario(ar._id, ar.usuarioDestino)
                }
            }
    };
