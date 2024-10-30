import UserServices from "../services/user.service.js";
import jwt from 'jsonwebtoken';
import UserDto from "../dto/user.dto.js";


class UserController{

    async register(req, res){

        const {first_name, last_name, email, age, password} = req.body;

        try {
            
            const newUser = await UserServices.registerUser({
                first_name, last_name, email, age, password
            });

            const token = jwt.sign({usuario:`${newUser.first_name} ${newUser.last_name}`, email: newUser.email, role: newUser.role}, 'roxanap',{ expiresIn: '1h'});

            res.cookie('coderCookietoken', token, {maxAge:3600000, httpOnly:true});

            res.redirect('/api/sessions/current')

        } catch (error) {
            res.status(500).send(error);
        }

    };

    async login(req, res){

        const {email, password} = req.body;

        try {
            
            const user = await UserServices.loginUser(email, password);
            const token = jwt.sign({usuario:`${user.first_name} ${user.last_name}`, email: user.email, role: user.role}, 'coderhouse',{ expiresIn: '1h'});

            res.cookie('coderCookietoken', token, {maxAge:3600000, httpOnly:true});
            res.redirect('/api/sessions/current')

        } catch (error) {

            res.status(500).send({error:error})
            
        }

    };

    async current(req, res){

        if (req.user){
            const user = req.user;
            const userDto = new UserDto(user);
            res.render('home', {user:userDto});
        }else{
            res.send('No autorizado');
        }

    };

    async logout(req, res){

        res.clearCookie('coderCookieToken');
        res.redirect('/login');

    }

}

export default UserController;


