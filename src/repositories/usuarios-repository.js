import Db from './db-pg.js';

export default class UsuariosRepository {
    constructor() {
        console.log('Estoy en: UsuariosRepository.constructor()');
        this.db = new Db();
    }

    getByEmailAsync = async (email) => {
        console.log(`UsuariosRepository.getByEmailAsync(${email})`);
        const sql = `SELECT * FROM usuarios WHERE email=$1`;
        return await this.db.queryOne(sql, [email]);
    }
}
