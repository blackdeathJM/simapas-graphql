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
const bson_1 = require("bson");
let filtroDocsExt = {
    "_id": 1,
    "identificadorDoc": 1,
    "folio": 1,
    "noSeguimiento": 1,
    "noProceso": 1,
    "dependencia": 1,
    "comentario": 1,
    "observaciones": 1,
    "asunto": 1,
    "fechaRecepcion": 1,
    "fechaLimitEntrega": 1,
    "fechaTerminado": 1,
    "acuseUrl": 1,
    "docUrl": 1,
    "docRespUrl": 1,
    "usuarioDestino.$": 1
};
function todosDocExt(db) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).find().toArray().then((res) => __awaiter(this, void 0, void 0, function* () {
            return res;
        })).catch(() => __awaiter(this, void 0, void 0, function* () {
            return null;
        }));
    });
}
exports.todosDocExt = todosDocExt;
const queryDocExt = {
    Query: {
        todosDocumentosExternos(_, __, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield todosDocExt(db);
            });
        },
        obDocsUsuarioExterno(_, {usuario}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
            });
        },
        usuarioNoProceso(_, {usuario, noProceso}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).find({noProceso: {$lte: noProceso}, "usuarioDestino.usuario": usuario}, {projection: filtroDocsExt}).toArray();
            });
        },
        noSubprocesoUsuario(_, {usuario, noSubproceso}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).find({usuarioDestino: {$elemMatch: {usuario, noSubproceso}}}, {projection: filtroDocsExt}).toArray();
            });
        },
        docExtRel(_, {_id}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).findOne({_id: new bson_1.ObjectId(_id)});
            });
        },
        docEntreFechas(_, {fechaRecepcion}, {db}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(constants_1.COLECCIONES.DOC_EXTERNA).find({$gte: fechaRecepcion, $lte: fechaRecepcion}).toArray();
            });
        }
    }
};
exports.default = queryDocExt;
