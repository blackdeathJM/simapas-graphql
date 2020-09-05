import environments from "./environments";

if (process.env.NODE_ENV !== 'production')
{
    const environment = environments;
    console.log(environment);
}

export enum COLECCION
{
    DEPARTAMENTOS = 'departamentos',
    USUARIOS = 'usuarios',
    DOC_INTERNA = 'docInterna',
    DOC_EXTERNA = 'docExterna',
    FOLIOS = 'folios'
}

export enum PUB_SUB
{
    NOT_DOC_INTERNA = 'todosDocInterna',
    DOC_EXT = 'obDocsExtTodos',
    DOC_EXT_USUSUBPROCESO = 'usuariosSubproceso',
    NOT_CAMBIO_ROLE = 'usuarioCambioRole'
}

const dia = new Date().getDate();
const mes = new Date().getMonth() + 1;
const ano = new Date().getFullYear();

const fechaVisto = `${dia}/${mes}/${ano}`;
export const FECHA_ACTUAL = fechaVisto;

export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';
