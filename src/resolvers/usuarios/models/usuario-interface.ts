export interface IUsuario
{
    _id?: string;
    departamentoID: string;
    nombre: string;
    usuario: string;
    contrasena: string,
    img: string;
    email: string;
    estatus: string;
    role: string[];
}
