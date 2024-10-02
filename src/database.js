import mongoose from 'mongoose';

mongoose.connect ('mongodb+srv://roxanaperrotta:roxanaperrottacoder@cluster0.ujdlb.mongodb.net/integradora?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log ( "Conectados a la BD" ))
.catch((error)=> console.log ('Tenemos un error: ', error));