import UserModel from "../models/user.model.js";
import { respuesta } from "../utils/utils.js";

class UserController{

    async getUsers(req, res){

        try {
            
            const users = await UserModel.find();
            respuesta(res, 200, users)
        } catch (error) {
            respuesta (res, 500, 'Error al obtener productos')
        }
    }

    async postProductos(req, res){

        try {

            const nuevoUser = req.body;
            await UserModel.create(nuevoUser);
            respuesta(res, 201, 'Usuario creado exitosamente');

            
        } catch (error) {
            
            respuesta(res, 500, 'Error al crear usuario')
        }
    }
};

export default UserController;


