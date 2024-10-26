import mongoose from "mongoose";
import configObject from "./config/config.js";
const {mongo_url} = configObject; 

class BaseDatos {
    static #instancia; 
    //Se declara una variable estática y privada llamada #instancia. 

    constructor() {
        mongoose.connect(mongo_url); 
    }

    static getInstancia() {
        if (this.#instancia) {
            //Si ya tenemos una instancia, la retornamos: 
            return this.#instancia;
        }
        //Caso contrario, la creamos: 
        this.#instancia = new BaseDatos(); 
        return this.#instancia; 
    }

}

export default BaseDatos; 