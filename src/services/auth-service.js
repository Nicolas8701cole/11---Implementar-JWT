import UsuariosRepository from '../repositories/usuarios-repository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AuthService {
    constructor() {
        console.log('Estoy en: AuthService.constructor()');
        this.UsuariosRepository = new UsuariosRepository();
    }

    loginAsync = async (entity) => {
        console.log(`AuthService.loginAsync(${entity?.email})`);

        const usuario = await this.UsuariosRepository.getByEmailAsync(entity.email);
        if (usuario == null) return null;

        const passwordOk = await bcrypt.compare(entity.password, usuario.password_hash);
        if (!passwordOk) return null;

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    }
}
