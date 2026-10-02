import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).send(`Falta el token.`);
    }

    let partes = authHeader.split(' ');
    if (partes.length != 2 || partes[0] != 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).send(`Token incorrecto.`);
    }

    try {
        req.user = jwt.verify(partes[1], process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send(`Token invalido o vencido.`);
    }
}

export default authMiddleware;
