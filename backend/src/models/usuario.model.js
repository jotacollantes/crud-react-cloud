import mongoose from "mongoose";
const {Schema,model} =mongoose;

// Creamos el esquema que va a tener el modelo User
const userSchema = new Schema(
    {
        nombre:{
            type:String,
        required:true
        },
        correo:{
            type:String,
        required:true,
        unique: true
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        //Campos timestamp
        timestamps:true
    }
);
// Se asigna a la variable User un modelo llamado usuario con el userSchema, se creara una coleccion(tabla) en mongodb con el nombre usuario
const User=model("usuario",userSchema);
export default User;