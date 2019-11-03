import environments from "./environments";

if (process.env.NODE_ENV !== 'production')
{
    const environment = environments;
}

/*export const COLECCIONES =
    {
        DEPARTAMENTOS: 'departamentos',
        USUARIOS: 'usuarios'
    }*/

export const CAMBIOS_DEPARTAMENTOS_SUBS = 'CAMBIOS_DEPARTAMENTOS';
export const SECRET_KEY = process.env.SECRET_KEY || 'blackdeath';
