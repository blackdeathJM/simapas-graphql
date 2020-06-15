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
const queryDeptos = {
    Query: {
        obtenerDepartamentos(_, __, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection('departamentos').find().toArray();
            });
        },
        departamentoID(_, {_id}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection('departamentos').findOne({_id: new bson_1.ObjectId(_id)}).then((result) => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: true,
                        mensaje: 'Busqueda de departamento por _id',
                        departamento: result
                    };
                })).catch(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: false,
                        mensaje: 'Fallo la consulta del departamento por _id',
                        departamento: null
                    };
                }));
            });
        }
    }
};
exports.default = queryDeptos;
