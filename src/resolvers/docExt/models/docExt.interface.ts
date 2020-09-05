export interface IDocExt
{
    id: string;
    noSeguimiento: number;
    identificadorDoc: string;
    folio: string;
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
    notificarAdministrador: number;
    usuarioDestino: IUsuarioDestinoDocExt[]
}


interface IUsuarioDestinoDocExt
{
    usuario: string;
    observaciones: string;
    docUrl: string;
    fechaEnvio: string;
    autorizado: boolean;
    subproceso: string;
    notificarRespDelUsuario: boolean
    notificarUsuario: boolean
}
