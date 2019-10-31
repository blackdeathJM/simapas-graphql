import {SECRET_KEY} from "../config/constants";
import jwt from 'jsonwebtoken';

class JWT
{
    private secretKey = SECRET_KEY as string;

    sign(data: any): string
    {
        return jwt.sign({usuario: data.usuario}, this.secretKey, {expiresIn: 24 * 60 * 60});
    }

    verify(token: string): string
    {
        try
        {
            return jwt.verify(token, this.secretKey) as string;
        } catch (e)
        {
            return 'La autenticacion del token es invalida, por favor inicia sesion';
        }
    }
}

export default JWT;
