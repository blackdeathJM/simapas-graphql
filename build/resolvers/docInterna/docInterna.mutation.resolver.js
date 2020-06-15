"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true});
const constants_1 = require("../../config/constants");
const docInterna_query_Resolver_1 = require("./docInterna.query.Resolver");

function notTodosDocInterna(pubsub, db) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pubsub.publish(constants_1.SUBSCRIPCIONES.NOT_DOC_INTERNA, {todosDocInterna: docInterna_query_Resolver_1.todasNotificacionesDocInterna(db)});
    });
}
const mutationDocInterna = {
    Mutation: {
        agDocInterna(_, {agNotificacion}, {pubsub, db}) {
            return __awaiter(this, void 0, void 0, function* () {
                let totalNotificaciones = yield db.collection("docInterna").countDocuments();
                if (totalNotificaciones != null) {
                    totalNotificaciones += 1;
                    agNotificacion.num = totalNotificaciones;
                    let anoActual = new Date().getFullYear();
                    agNotificacion.folioInterno = `FOL-${agNotificacion.num}-SIMAPAS/${anoActual}`;
                    return yield db.collection(constants_1.COLECCIONES.DOC_INTERNA).insertOne(agNotificacion).then((docInterna) => __awaiter(this, void 0, void 0, function* () {
                        yield notTodosDocInterna(pubsub, db);
                        return {
                            estatus: true,
                            mensaje: 'Datos agregados con exito',
                            docInterna: docInterna.ops
                        };
                    })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                        console.log('error', error);
                        return {
                            estatus: false,
                            mensaje: 'Error en el servidor al intentar agregar la notificacion', error,
                            docInterna: null
                        };
                    }));
                }
            });
        },
        acDocVistoUsuario(_, {folioInterno, usuario}, {pubsub, db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection("docInterna").findOneAndUpdate({$and: [{folioInterno}, {"usuarioDestino.usuario": usuario}]}, {
                    $set: {
                        "usuarioDestino.$.visto": true,
                        "usuarioDestino.$.fechaVisto": constants_1.FECHA_ACTUAL
                    }
                }).then((res) => __awaiter(this, void 0, void 0, function* () {
                    yield notTodosDocInterna(pubsub, db);
                    return {
                        estatus: true,
                        mensaje: 'La notificacion ha modificado como vista',
                        docInterna: res.value
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: false,
                        mensaje: 'Error al tratar de actualizar el estatus del mensaje: ' + error,
                        docInterna: null
                    };
                }));
            });
        }
    }
};
exports.default = mutationDocInterna;
