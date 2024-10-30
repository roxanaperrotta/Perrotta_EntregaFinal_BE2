import {Router} from 'express';
import UserModel from '../dao/models/user.model.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { createHash, isValidPassword} from '../utils/util.js';

const router = Router ();

router.post('/register', async (req, res) => {

    const { first_name, last_name, email, password, age } = req.body;

    try {
        //verificar si el correo ya esta registrado
        const existeUsuario = await UserModel.findOne({ email });

        if (existeUsuario) {
            return res.send('El correo ya esta registrado');
        }

        //crear nuevo usuario

        const nuevoUsuario = await UserModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age

        });
        
        await nuevoUsuario.save();

        const token = jwt.sign({usuario:nuevoUsuario.usuario}, 'roxanap', {expiresIn:'12h'});
        res.cookie('coderCookieToken', token, {maxAge: 60*60*1000, httpOnly:true})

        res.redirect('/api/sessions/current');

    }
    catch (error) {
       console.log(error);
    }
});

router.post('/login', async (req, res) => {

        const { email, password } = req.body;
    
        try {
            const usuarioEncontrado = await UserModel.findOne({ email });
    
            if (!usuarioEncontrado) {
    
                return res.send('Usuario no registrado') 
            }
               // if (usuarioBuscado.password === password) {
               if (!isValidPassword(password, usuarioEncontrado)){
    
                return res.send('Contraseña incorrecta')
    
               };
    

    
               const token = jwt.sign({usuario:usuarioEncontrado.usuario}, 'roxanap', {expiresIn:'12h'});
               res.cookie('coderCookieToken', token, {maxAge: 60*60*1000, httpOnly:true})
    
               res.redirect('/api/sessions/current')
    
                
        } catch (error) {
            res.status(500).send("Error interno del servidor");
        }
    });
   
    router.get('/current', passport.authenticate('current', {session:false}), (req, res)=>{
          
           res.render('home', {usuario: req.user.first_name});
     
    } )

    router.get('/logout', (req, res) => {
        res.clearCookie('coderCookieToken')
        res.redirect('/login')
    });
    
//Ruta Admin: 

router.get("/admin", passport.authenticate("current", {session: false}), (req, res) => {
    if(req.user.role !== "admin") {
        return res.status(403).send("Acceso denegado"); 
    }

    res.render("admin");
})


export default router;