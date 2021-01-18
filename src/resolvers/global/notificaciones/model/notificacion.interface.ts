export interface INotificacion
{
    _id: string;
    descripcion: string;
    emisor: string;
    receptor: string[];
    fechaEnvio: string;
    visto: boolean;
    prioridad: string;
}
