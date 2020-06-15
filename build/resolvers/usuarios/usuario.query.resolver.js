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
const jwt_1 = __importDefault(require("../../lib/jwt"));
const queryUsuarios = {
    Query: {
        obtenerUsuarios(_, __, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection('usuarios').find().toArray();
            });
        },
        buscarUsuario(_, {usuario}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection('usuarios').findOne({usuario: usuario.usuario}).then((res) => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: true,
                        mensaje: 'La busqueda fue satisfactoria',
                        usuario: res
                    };
                })).catch((err) => __awaiter(this, void 0, void 0, function* () {
                    return {
                        estatus: false,
                        mensaje: 'Error en la busqueda', err,
                        usuario: null
                    };
                }));
            });
        },
        login(_, {usuario, contrasena}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                const loginUsuario = yield db.collection('usuarios').findOne({usuario});
                if (loginUsuario === null) {
                    return {
                        estatus: false,
                        mensaje: 'Login incorrectos el usuario no existe',
                        token: null
                    };
                }
                if (!bcryptjs_1.default.compareSync(contrasena, loginUsuario.contrasena)) {
                    return {
                        estatus: false,
                        mensaje: 'Login incorrecto, la contraseña es incorrecta',
                        token: null
                    };
                }
                delete loginUsuario.contrasena;
                return {
                    estatus: true,
                    mensaje: 'Login correcto',
                    token: new jwt_1.default().firmar({loginUsuario})
                };
            });
        },
        perfil(_, __, {token}) {
            return __awaiter(this, void 0, void 0, function* () {
                let info = new jwt_1.default().verificar(token);
                if (info === 'La autenticacion del token es invalida, por favor inicia sesion') {
                    return {
                        estatus: false,
                        mensaje: info,
                        usuario: null
                    };
                }
                return {
                    estatus: true,
                    mensaje: 'El token es correcto',
                    usuario: info.usuario.loginUsuario
                };
            });
        },
    }
};
exports.default = queryUsuarios;
