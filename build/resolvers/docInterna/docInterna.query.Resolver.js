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

function todasNotificacionesDocInterna(db)
{
    return __awaiter(this, void 0, void 0, function* ()
    {
        return yield db.collection(constants_1.COLECCIONES.DOC_INTERNA).find().toArray();
    });
}

exports.todasNotificacionesDocInterna = todasNotificacionesDocInterna;
const modeloDocInterna = {
    "fechaCreacion": 1,
    "asunto": 1,
    "contenido": 1,
    "atte": 1,
    "folioInterno": 1,
    "num": 1,
    "usuarioDestino.$": 1
};
const queryDocInterna = {
    Query: {
        obNotiDocInterna(_, __, {db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield todasNotificacionesDocInterna(db);
            });
        },
        obNotiUsuario(_, {usuario}, {db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_INTERNA).find({"usuarioDestino.usuario": usuario}).toArray();
            });
        },
        obNotUsuarioVisto(_, {usuario, visto}, {db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DOC_INTERNA).find({usuarioDestino: {$elemMatch: {usuario, visto}}}, {projection: modeloDocInterna}).toArray();
            });
        }
    }
};
exports.default = queryDocInterna;
