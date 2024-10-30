import express from 'express';
import cookieParser from 'cookie-parser';
import passport from "passport";
import { engine } from 'express-handlebars';

import sessionsRouter from './routes/session.router.js'
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';

import './database.js';


//passport

import initializePassport from './config/passport.config.js';
import jwt from 'jsonwebtoken';

const app=express();
const PUERTO=8080;

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'))
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//express handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Rutas

app.use('/', viewsRouter);
app.use('/api/sessions/', sessionsRouter);
app.use('/api/products', productsRouter );
app.use('/api/carts', cartsRouter);


app.listen(PUERTO, ()=>console.log(`App escuchando en el puerto ${PUERTO}`))