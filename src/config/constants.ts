import environments from "./environments";

if (process.env.NODE_ENV !== 'production') {
    const environment = environments;
}

export const COLECCIONES =
    {
        DEPARTAMENTOS: 'departamentos',
        USUARIOS: 'usuarios',
        DOCINTERNA: 'docInterna',
        DOCEXTERNA: 'docExterna'
    };

export const SUBSCRIPCIONES =
    {
        DEPARTAMENTO: 'cambioDepartamentos',
        DOCINTERNA: 'cambioDocInterna',
        NOT_DOC_INTERNA: 'envNotUsuarioVisto',
        NOT_DOC_EXTERNA: 'cambioDocInterna'
    };
export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';

const dia = new Date().getDate();
const mes = new Date().getMonth() + 1;
const ano = new Date().getFullYear();
const fechaVisto = `${dia}/${mes}/${ano}`;
export const FECHA_ACTUAL = fechaVisto;
