"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator)
{
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }

    return new (P || (P = Promise))(function(resolve, reject)
    {
        function fulfilled(value)
        {
            try
            {
                step(generator.next(value));
            } catch(e)
            {
                reject(e);
            }
        }

        function rejected(value)
        {
            try
            {
                step(generator["throw"](value));
            } catch(e)
            {
                reject(e);
            }
        }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true});
const constants_1 = require("../../config/constants");
const bson_1 = require("bson");
const docExt_query_resolver_1 = require("./docExt.query.resolver");

function notTodosDocsExt(pubSub, db)
{
    return __awaiter(this, void 0, void 0, function* ()
    {
        yield pubSub.publish(constants_1.SUBSCRIPCIONES.NOT_DOC_EXTERNA, {todosDocsExt: docExt_query_resolver_1.todosDocExt(db)});
    });
}

const mutationDocExt = {
    Mutation: {
        regDocExterno(_, {documentoExternoInput}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                const totalDocExt = yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).countDocuments();
                documentoExternoInput.noSeguimiento = totalDocExt + 1;
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).insertOne(documentoExternoInput).then((agDocExt) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'El documento fue registrado con exito',
                        documento: agDocExt.ops
                    };
                })).catch((err) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Ocurrio un error al intentar registrar el documento: ', err,
                        documento: null
                    };
                }));
            });
        },
        acDocExtUrlUsuario(_, {id, usuario, docUrl}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
                    _id: new bson_1.ObjectId(id),
                    "usuarioDestino.usuario": usuario
                }, {$set: {"usuarioDestino.$.docUrl": docUrl}}).then((documento) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'El documento fue actualizado con exito',
                        documento: documento.value
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Error al intentar actualizar el documento', error,
                        documento: null
                    };
                }));
            });
        },
        acObEstUsuario(_, {_id, noProceso, usuario, observaciones, noSubproceso, estatus}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
                    _id: new bson_1.ObjectId(_id),
                    "usuarioDestino.usuario": usuario
                }, {
                    $set: {
                        noProceso, "usuarioDestino.$.observaciones": observaciones,
                        "usuarioDestino.$.noSubproceso": noSubproceso, "usuarioDestino.$.estatus": estatus
                    }
                }).then((documento) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'Los datos se han actualizado con exito',
                        documento: documento.value
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Error al intentar actualizar los datos', error,
                        documento: null
                    };
                }));
            });
        },
        acDocUrl(_, {id, docUrl, noProceso}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new bson_1.ObjectId(id)}, {
                    $set: {
                        docUrl,
                        noProceso
                    }
                }).then((documento) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'El documento se ha actualizado con exito',
                        documento
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Error al intentar actualizar el documento', error,
                        documento: null
                    };
                }));
            });
        },
        acEstEstGralUsuarioFolio(_, {_id, usuario, noSubproceso, noProceso, folio, estatus}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new bson_1.ObjectId(_id), "usuarioDestino.usuario": usuario}, {
                    $set: {
                        noProceso,
                        folio,
                        "usuarioDestino.$.noSubproceso": noSubproceso,
                        "usuarioDestino.$.estatus": estatus
                    }
                }).then((documento) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'Ha cambiado el estatus del documento',
                        documento: documento.value
                    };
                })).catch((error) =>
                {
                    return {
                        estatus: false,
                        mensaje: 'Hubo un error al tratar de actualizar el documento', error,
                        documento: null
                    };
                });
            });
        },
        acDocResUrlNoProceso(_, {folioRespuesta, noProceso, docRespUrl, folio, usuario, noSubproceso, estatus}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new bson_1.ObjectId(folioRespuesta), "usuarioDestino.usuario": usuario}, {
                    $set: {
                        noProceso,
                        docRespUrl,
                        folio,
                        "usuarioDestino.$.noSubproceso": noSubproceso,
                        "usuarioDestino.$.estatus": estatus
                    }
                }).then((documento) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'El archivo fue colocado en la raiz del documento',
                        documento: documento.value
                    };
                })).catch((error) =>
                {
                    db.collection(constants_1.COLECCIONES.FOLIOS).findOneAndDelete(folio);
                    return {
                        estatus: false,
                        mensaje: 'Error al intentar guardar el documento consulta al administrador', error,
                        documento: null
                    };
                });
            });
        },
        acTerminarDoc(_, {_id, noProceso, acuseUrl, folio}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new bson_1.ObjectId(_id)}, {
                    $set: {
                        noProceso,
                        folio,
                        acuseUrl,
                        fechaTerminado: constants_1.FECHA_ACTUAL
                    }
                }).then((documento) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'El documento se ha actualizado con exito, y se ha dado por terminado el proceso',
                        documento: documento.doc
                    };
                })).catch((err) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Ha ocurrido un error al intentar actualizar el documento' + err,
                        documento: null
                    };
                }));
            });
        },
        acEntidadDocExt(_, {documentoExternoInput}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new bson_1.ObjectId(documentoExternoInput._id)}, {$addToSet: documentoExternoInput}).then((docExt) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'Entidad actualizada con exito',
                        documento: docExt.value
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Ha ocurrido un error al intentar actualizar la entidad ' + error,
                        documento: null
                    };
                }));
            });
        },
        acNotificar(_, {notificar, usuario, _id}, {pubsub, db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
                    _id: new bson_1.ObjectId(_id),
                    "usuarioDestino.usuario": usuario
                }, {$set: {"usuarioDestino.$.notificar": notificar}}).then((docExt) => __awaiter(this, void 0, void 0, function* ()
                {
                    yield notTodosDocsExt(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'Notificacion actualizada con exito',
                        documento: docExt.value
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Ocurrio un error al intentar actualizar la notificacion: ' + error,
                        documento: null
                    };
                }));
            });
        },
    }
};
exports.default = mutationDocExt;
