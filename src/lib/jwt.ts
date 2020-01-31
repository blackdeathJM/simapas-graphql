import {SECRET_KEY} from "../config/constants";
import jwt from 'jsonwebtoken';

class JWT
{
    private secretKey = SECRET_KEY as string;

    firmar(data: any): string
    {
        return jwt.sign({usuario: data}, this.secretKey, {expiresIn: 24 * 60 * 60});
    }

    verificar(token: string): string
    {
        try {
            return jwt.verify(token, this.secretKey) as string;
        } catch (e) {
            return 'La autenticacion del token es invalida, por favor inicia sesion: ' + e;
        }
    }
}

export default JWT;
