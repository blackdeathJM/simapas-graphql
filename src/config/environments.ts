import dotenv from 'dotenv';
import path from 'path';

export const environments = dotenv.config({path: path.join(__dirname, '.env')});

if (process.env.NODE_ENV !== 'production')
{
    if (environments.error)
    {
        throw  environments.error;
    }
}
