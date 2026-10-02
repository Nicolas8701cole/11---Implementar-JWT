import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AuthService {
    loginAsync = async (entity) => {
        if (entity.email != process.env.AUTH_EMAIL) return null;

        const passwordOk = await bcrypt.compare(entity.password, process.env.AUTH_PASSWORD_HASH);
        if (!passwordOk) return null;

        const token = jwt.sign(
            { email: entity.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    }
}
