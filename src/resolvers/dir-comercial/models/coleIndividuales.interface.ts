export interface ISolicitudServ
{
    idCliente: string;
    fechaSolicitud: string;

    noPersonas: number;
    calle: string;
    colonia: string;
    entreCalles: string;
    referencia: string;
    servSolicitado: string;
    medidorRef: string;
    tipoPredio: string;
    areaPredio: number;
    areaConstruida: number;
    almacenamiento: string;
    tarifa: string;
    MaterialArroyoDeCalle: string;
    MaterialAcera: string;
    comentarios: string;
    aprobadoServ: boolean;
    matArroyoCalle: string;
    matAcera: string;
    latitud: number;
    longitud: number;
}
