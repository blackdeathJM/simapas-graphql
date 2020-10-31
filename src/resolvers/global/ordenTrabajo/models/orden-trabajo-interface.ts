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
    material: string[];
    evidencia: string[];
}

enum ESTATUS_ORDEN_TRABAJO
{
    PENDIENTE = 'PENDIENTE',
    ACTIVO = 'ACTIVO',
    CANCELADO = 'CANCELADO',
    TERMINADO = 'TERMINADO'
}
