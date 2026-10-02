import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from './../services/auth-service.js'

const router = Router();
const currentService = new AuthService();

router.post('/login', async (req, res) => {
    try {
        let entity = req.body;

        if (!entity?.email || !entity?.password) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Faltan datos.`);
        }

        const token = await currentService.loginAsync(entity);
        if (token != null){
            res.status(StatusCodes.OK).json({ token: token });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).send(`Usuario o contraseña incorrectos.`);
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

export default router;
