import environments from "./environments";

if (process.env.NODE_ENV !== 'production')
{
    const environment = environments;
}

const SECRET_KEY = process.env.SECRET || 'blackdeath';
