export function nvaProp(propiedad: string, valor: any)
{
    const crearPropiedad: Object = {};
    Object.defineProperty(crearPropiedad, propiedad,
        {
            configurable: true,
            enumerable: true,
            writable: true,
            value: valor
        });
    return crearPropiedad;
}
