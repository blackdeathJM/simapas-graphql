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
const bson_1 = require("bson");
const constants_1 = require("../../config/constants");
const mutationFolios = {
    Mutation: {
        registroFolio(_, {folio}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.FOLIOS).findOne({numFolio: folio.numFolio}).then((rest) => __awaiter(this, void 0, void 0, function* () {
                    if (rest) {
                        return {
                            estatus: false,
                            mensaje: 'Este numero de folio se acaba de utilizar en otro departamento por favor cierra la ventana y vuelve abrirla para generar uno nuevo',
                            folio: null
                        };
                    } else {
                        return yield db.collection('folios').insertOne(folio).then(() => __awaiter(this, void 0, void 0, function* () {
                            return {
                                estatus: true,
                                mensaje: 'Se ha registrado de manera correcta el folio',
                                folio
                            };
                        })).catch(() => __awaiter(this, void 0, void 0, function* () {
                            return {
                                estatus: false,
                                mensaje: 'Ocurrio un error al tratar de registrar el nuevo folio: ',
                                folio: null
                            };
                        }));
                    }
                }));
            });
        },
        acUrlFolio(_, {id, archivoUrl}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.FOLIOS).findOneAndUpdate({_id: new bson_1.ObjectId(id)}, {$set: {archivoUrl}}).then(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        _id: id,
                        archivoUrl
                    };
                })).catch(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        _id: 'Error no se registro'
                    };
                }));
            });
        },
    }
};
exports.default = mutationFolios;
