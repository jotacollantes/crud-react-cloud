import mongoose from "mongoose";
const {Schema,model} =mongoose;

// Creamos el esquema que va a tener el modelo User
const empleadoSchema = new Schema(
    {
        nombres:{
            type:String,
            required:true
        },
        apellidos:{
            type:String,
            required:true
        },
        id:{
            type:String,
            required:true
        },
        tcontrato:{
            type:String,
            required:true
        },
        // usuario:{
        //     type:String,
        //     required:true
        // }
        //estoy vinculando con el _id del modelo usuario(jefe)
        usuario:{ type: Schema.ObjectId, ref: 'usuario' }
    },
    {
        //Campos timestamp
        timestamps:true
    }
);
// Se asigna a la variable User un modelo llamado usuario con el userSchema, se creara una coleccion(tabla) en mongodb con el nombre usuario
const Empleado=model("empleado",empleadoSchema);
export default Empleado;