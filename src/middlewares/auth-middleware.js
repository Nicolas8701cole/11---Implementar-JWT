import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).send(`Falta el token.`);
    }

    let partes = authHeader.split(' ');
    if (partes.length != 2 || partes[0] != 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).send(`El token esta mal formado.`);
    }

    let token = partes[1];

    try {
        let datos = jwt.verify(token, process.env.JWT_SECRET);
        req.user = datos;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send(`Token invalido o vencido.`);
    }
}

export default authMiddleware;
