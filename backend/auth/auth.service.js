import jwt from 'jsonwebtoken';
import Users from '../user/user-service.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

class AuthService {
    async signIn(email, password) {
        const user = await userService.listUserByEmail(email)

        if (!user) throw new Error('Usuário não encontrado')

        if (!(await bcrypt.compare(password, user.password))) throw new Error('Senha incorreta');

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '15m'})

        return {token};

    }

    async signUp(username, email, password, job_title_id, gender, admin) {
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)
        const newUser = await userService.createUser(username, email, password, job_title_id, gender, admin)
        return newUser
    }
} 

export default AuthService