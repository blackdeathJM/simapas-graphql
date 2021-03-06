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
    DOC_EXTERNA = 'documentos',
    TELEMETRIA = 'telemetria',
    NOT = 'notificaciones'
}

export enum PUB_SUB
{
    DOC_EXT = 'todosDocsExtSub',
    DOC_EXT_USUSUBPROCESO = 'usuariosSubproceso',
    NOT_CAMBIO_ROLE = 'usuarioCambioRole',
    NOT_NOTIFICACION = 'docSubProceso'
}

export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';
