import mongoose from "mongoose";

mongoose.connect("mongodb+srv://roxanaperrotta:roxanaperrottacoder@cluster0.ujdlb.mongodb.net/EntregaFinal?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa ala BD"))
    .catch((error) => console.log("Error conectándose a la BD", error))

