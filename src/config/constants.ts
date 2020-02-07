import environments from "./environments";

if (process.env.NODE_ENV !== 'production') {
    const environment = environments;
}

export const COLECCIONES =
    {
        DEPARTAMENTOS: 'departamentos',
        USUARIOS: 'usuarios',
        DOC_INTERNA: 'docInterna',
        DOC_EXTERNA: 'docExterna',
        FOLIOS: 'folios'
    };

export const SUBSCRIPCIONES =
    {
        DEPARTAMENTO: 'cambioDepartamentos',
        NOT_DOC_INTERNA: 'todosDocInterna',
        NOT_DOC_INTERNA_AG: 'agDocInterna',
        NOT_DOC_EXTERNA: 'todosDocsExt'
    };
export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';

const dia = new Date().getDate();
const mes = new Date().getMonth() + 1;
const ano = new Date().getFullYear();
const fechaVisto = `${dia}/${mes}/${ano}`;
export const FECHA_ACTUAL = fechaVisto;
