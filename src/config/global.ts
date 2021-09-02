import {environments} from "./environments";

if (process.env.NODE_ENV !== 'production')
{
    console.log(environments);
}

export enum COLECCION
{
    DEPARTAMENTOS = 'departamentos',
    USUARIOS = 'usuarios',
    DOC_EXTERNA = 'documentos',
    TELEMETRIA = 'telemetria',
    NOT = 'notificaciones',
    ORDENES_TRAB = 'ordenesTrabajo',
    CLIENTES = 'clientes',
    SOLICITUDES = 'solicitudes'
}

export enum PUB_SUB
{
    DOC_EXT = 'todosDocsExtSub',
    DOC_EXT_SUB_PROCESO = 'usuariosSubproceso',
    NOT_CAMBIO_ROLE = 'usuarioCambioRole',
    NOT_NOTIFICACION = 'docSubProceso'
}

export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';
