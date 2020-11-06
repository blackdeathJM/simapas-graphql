export interface IOrdenTrabajo
{
    _id: string;
    deptoID: string;
    noOrden: number;
    rpu: string;
    nombre: string;
    direccion: string;
    telefono: string;
    fechaReporte: string;
    fechaTermino: string;
    estatus: ESTATUS_ORDEN_TRABAJO;
    nombreEmpRealizo: string;
    descripcionProblema: string;
    observaciones: string;
    creadaPor: string;
    material: INotaOrden[];
    evidencia: string[];
}

export interface INotaOrden
{
    id: string;
    noNota: number;
    fechaSalida: string;
    cantidad: number;
    descripcion: string;
    unidadMedida: number;
    emitio: string;
    recibio: string;
}

enum ESTATUS_ORDEN_TRABAJO
{
    PENDIENTE = 'PENDIENTE',
    CANCELADO = 'CANCELADO',
    TERMINADO = 'TERMINADO'
}
