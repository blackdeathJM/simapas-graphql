import {SECRET_KEY} from "../config/global";
import jwt from 'jsonwebtoken';

class JWT
{
    private secretKey = SECRET_KEY as string;

    firmar(data: any): string
    {
        return jwt.sign({usuario: data}, this.secretKey, {expiresIn: '8h'});
    }

    verificar(token: string): string
    {
        try
        {
            return jwt.verify(token, this.secretKey) as string;
        } catch (error)
        {
            return 'Token invalido: ' + error
        }
    }
}

export default JWT;
