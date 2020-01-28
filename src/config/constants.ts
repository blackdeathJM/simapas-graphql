import environments from "./environments";

if (process.env.NODE_ENV !== 'production') {
    const environment = environments;
}

/*export const COLECCIONES =
    {
        DEPARTAMENTOS: 'departamentos',
        USUARIOS: 'usuarios'
    }*/

export const subscripciones =
    {
        DEPARTAMENTO: 'cambioDepartamentos',
        DOCINTERNA: 'cambioDocInterna',
        NOT_DOC_INTERNA: 'notDocInterna'
    };
export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';
