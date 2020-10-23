export interface INivelesED
{
    nivelEstatico: [INiveles];
    nivelDinamico: [INiveles];
}

export interface INiveles
{
    id: string;
    ano: number;
    mes: number;
    dia: number;
    tipoNivel: string;
    nivel: number;
}

