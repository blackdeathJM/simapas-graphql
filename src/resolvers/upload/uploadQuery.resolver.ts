import path from "path";

export const uploadQueryResolver =
    {
        Query:
            {
                obtenerImgs: async (_: object, args: { carpeta: string, nombre: string }) =>
                {
                    return path.join(__dirname, `../../public/uploads/${args.carpeta}/${args.nombre}`);
                }
            }
    }
