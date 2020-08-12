import JWT from "./jwt";

export function validarToken(token: string): boolean {
    const tokenObtenido = new JWT().verificar(token)
    console.log(tokenObtenido);
    try {
        return tokenObtenido !== undefined || true;
    } catch (error) {
        return false
    }
}
