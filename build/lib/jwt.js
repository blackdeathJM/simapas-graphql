"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const constants_1 = require("../config/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));

class JWT {
    constructor() {
        this.secretKey = constants_1.SECRET_KEY;
    }

    firmar(data) {
        return jsonwebtoken_1.default.sign({usuario: data}, this.secretKey, {expiresIn: 24 * 60 * 60});
    }

    verificar(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        } catch (e) {
            return 'La autenticacion del token es invalida, por favor inicia sesion: ' + e;
        }
    }
}
exports.default = JWT;
