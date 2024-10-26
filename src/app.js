import express from 'express';
import cookieParser from 'cookie-parser';
//import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
//import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.routes.js';
import userRouter from './routes/user.router.js';
import BaseDatos from './database.js';


const instanciaBD= BaseDatos.getInstancia();

//passport

import passport from 'passport';
import initializePassport from './config/passport.config.js';
import jwt from 'jsonwebtoken';

const app=express();
const PUERTO=8080;

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//express handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Rutas

app.use('/', viewsRouter);
app.use('/api/sessions/', userRouter)


app.listen(PUERTO, ()=>console.log(`App escuchando en el puerto ${PUERTO}`))