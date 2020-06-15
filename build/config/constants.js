"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const environments_1 = __importDefault(require("./environments"));
if (process.env.NODE_ENV !== 'production') {
    const environment = environments_1.default;
}
exports.COLECCIONES = {
    DEPARTAMENTOS: 'departamentos',
    USUARIOS: 'usuarios',
    DOC_INTERNA: 'docInterna',
    DOC_EXTERNA: 'docExterna',
    FOLIOS: 'folios'
};
exports.SUBSCRIPCIONES = {
    DEPARTAMENTO: 'cambioDepartamentos',
    NOT_DOC_INTERNA: 'todosDocInterna',
    NOT_DOC_INTERNA_AG: 'agDocInterna',
    NOT_DOC_EXTERNA: 'todosDocsExt'
};
exports.SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';
const dia = new Date().getDate();
const mes = new Date().getMonth() + 1;
const ano = new Date().getFullYear();
const fechaVisto = `${dia}/${mes}/${ano}`;
exports.FECHA_ACTUAL = fechaVisto;
