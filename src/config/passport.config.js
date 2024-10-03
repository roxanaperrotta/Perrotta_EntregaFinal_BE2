import passport from 'passport';
import jwt from 'passport-jwt';

//traemos usermodel y las funciones de bcrypt
import UserModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';


//trabajamos con passport jwt

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: "roxanap",
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload); 
        } catch (error) {
            return done(error);
        }
    }))   
}

const cookieExtractor = (req) => {
    let token = null; 
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]; 
    }
    return token; 
}


export default initializePassport;
