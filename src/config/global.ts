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
    DOC_EXTERNA = 'docExterna',
    ORGANISMO = 'organismo',
    TELEMETRIA = 'telemetria',
    ORDEN_TRAB = 'ordenTrabajo'
}

export enum PUB_SUB
{
    DOC_EXT = 'obDocsExtTodos',
    DOC_EXT_USUSUBPROCESO = 'usuariosSubproceso',
    NOT_CAMBIO_ROLE = 'usuarioCambioRole'
}

export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';
