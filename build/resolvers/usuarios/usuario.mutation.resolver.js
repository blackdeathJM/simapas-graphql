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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mutationUsuarios = {
    Mutation: {
        registroUsuario(_, {usuario}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                const checharUsuario = yield db.collection('usuarios').findOne({usuario: usuario.usuario});
                if (checharUsuario !== null) {
                    return {
                        estatus: false,
                        mensaje: `El usuario ${usuario.usuario} ya existe`,
                        usuario: null
                    };
                }
                usuario.contrasena = bcryptjs_1.default.hashSync(usuario.contrasena, 10);
                return yield db.collection('usuarios').insertOne(usuario).then(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: true,
                        mensaje: 'Datos agregados con exito',
                        usuario
                    };
                })).catch(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: false,
                        mensaje: 'Usuario no se puede registrar',
                        usuario: null
                    };
                }));
            });
        },
        actualizarUsuario(_, {usuario}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection('usuarios').findOneAndUpdate({usuario}, {$set: {nombre: usuario.nombre, img: usuario.img}}).then(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: true,
                        mensaje: 'Datos actualizados de manera correcta'
                    };
                })).catch(() => __awaiter(this, void 0, void 0, function* () {
                    {
                        return {
                            estatus: false,
                            mensaje: 'Error al intentar actualizar el perfil de este usuario',
                            usuario: null
                        };
                    }
                }));
            });
        },
    }
};
exports.default = mutationUsuarios;
