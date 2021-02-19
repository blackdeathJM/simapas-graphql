export interface IDocExt
{
    _id: string;
    noSeguimiento: number;
    identificadorDoc: string;
    folio: string;
    tipoDoc: string;
    esInterno: boolean;
    dependencia: string;
    comentario: string;
    asunto: string;
    docUrl: string;
    docRespUrl: string;
    acuseUrl: string;
    fechaRecepcion: string;
    fechaLimiteEntrega: string;
    fechaTerminado: string;
    proceso: string
    notificarAdministrador: boolean;
    usuarioFolio: string;
    enviadoPor: string;
    ano: number;
    ref: boolean;
    usuarioDestino: IUsuarioDestinoDocExt[];
}


export interface IUsuarioDestinoDocExt
{
    usuario: string;
    observaciones: string;
    docUrl: string;
    fechaEnvio: string;
    autorizado: boolean;
    subproceso: string;
    notificarRespDelUsuario: boolean;
    notificarUsuario: boolean;
}
