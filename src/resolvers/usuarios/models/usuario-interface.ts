export interface IUsuario
{
    _id?: string;
    nombre: string;
    usuario: string;
    contrasena: string,
    role: string[];
    img: string;
    departamentoID: string;
}
