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
const queryFolios = {
    Query: {
        obtenerFoliosTodos(_, __, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.FOLIOS).find().toArray().then((res) => {
                    return res;
                });
            });
        },
        ultimoFolio(_, __, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.FOLIOS).countDocuments().then((ultimoFolio) => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: true,
                        mensaje: 'Consulta realizada correctamente',
                        ultimoFolio
                    };
                })).catch(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: false,
                        mensaje: 'Error al tratar extraer el ultimo folio registrado',
                        ultimoFolio: 0
                    };
                }));
            });
        },
        folioUsuario(_, {asigUsuario}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.FOLIOS).find({asigUsuario}).toArray();
            });
        },
    }
};
exports.default = queryFolios;
