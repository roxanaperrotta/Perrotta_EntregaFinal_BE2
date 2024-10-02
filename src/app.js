import express from 'express';
import cookieParser from 'cookie-parser';
//import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
//import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.routes.js'
import './database.js';

//passport

import passport from 'passport';
//import initializePassport from './config/passport.config.js';
import jwt from 'jsonwebtoken';
//import { authorization, passportCall } from './utils/passportcall.js';

const app=express();
const PUERTO=8080;

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(cookieParser());

//express handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Rutas

app.use('/', viewsRouter);


app.listen(PUERTO, ()=>console.log(`App escuchando en el puerto ${PUERTO}`))