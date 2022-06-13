import User from "../models/usuario.model.js";
import bcrypt   from 'bcrypt';
import jwt from "jsonwebtoken";
import messages from "../utils/messages.js";
const {mensajeGeneral} =messages;

// Se crea el objeto userCtrl con un valor vacio por defecto
const userCtrl={};

//Se crea el metodo register
userCtrl.register= async (req,res)=>{
    const data=req.body;
    try {
        
        console.log(data);
        // res.json({ok:true, message:"hola mundo", data});
        //primero se verifica que el correo no exista
        const userExist= await User.findOne({ correo: data.correo});
        if(userExist)
        {
            // return res.status(400).json({
            //     ok: false,
            //     message: "El correo ya existe"
            // })

            return messages.mensajeGeneral(res,400,false,"","El correo ya existe");
        }
        //Primero encriptmos la clave
        data.password=await bcrypt.hash(data.password,10)
        const newUser=await User.create(data);
        //Crear token
        //newUser._id lo devuelve mongodb
        //secreta es la llave secreta
        const token=jwt.sign({_id:newUser._id},"secreta");
        // const send={
        //     newUser,
        //     token
        // }

        // res.status(201).json({
        //     ok: true,
        //     message: "Usuario creado correctamente",
        //     //data: newUser
        //     //data: send
        //     //para meter el token dentro del objeto newUser hay que propagar ...
        //     data: {...newUser._doc,password:null,token}
        //     // El json se devuelve asi
        //     // "ok": true,
        //     // "message": "Usuario creado correctamente",
        //     // "data": {
        //     //     "nombre": "Juan",
        //     //     "correo": "juan@collantes.ec",
        //     //     "password": "$2b$10$kCQ1YmurtHVit2z/wevlj.wx2TUeB7efX5QTvbIl7el2MlwxqhsHC",
        //     //     "_id": "628c2bd774410cd06409b7ef",
        //     //     "createdAt": "2022-05-24T00:50:31.845Z",
        //     //     "updatedAt": "2022-05-24T00:50:31.845Z",
        //     //     "__v": 0,
        //     //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjMmJkNzc0NDEwY2QwNjQwOWI3ZWYiLCJpYXQiOjE2NTMzNTM0MzF9.-ufWt_d0kh_gpe_T5w9kGAK6LoQN74az1TN97H8hK5k"
        //     // }
        // });


        messages.mensajeGeneral(res,201,true,{...newUser._doc,password:null,token},"Usuario creado correctamente");
        
} catch (error) {
        //res.status(500).json({error :error.message , data});
        messages.mensajeGeneral(res,500,false,"",error.message);
    }

};

userCtrl.login =async (req,res)=>{
    try {
        const data=req.body;
        const userExist= await User.findOne({ correo: data.correo});
        if(!userExist)
        {
            // return res.status(400).json({
            //     ok: false,
            //     message: "El correo no existe"
            // })

            return messages.mensajeGeneral(res,400,false,"","El correo no existe");
        }
        //Comparar las claves
        // data.password enviado por el usuario, userExiste.password que es recuperado en el metodo await User.findOne
        //Devolvera true o false
        const match=await bcrypt.compare(data.password,userExist.password);
        if(match)
        {
            //creo el token en login
            const token=jwt.sign({_id:userExist._id},"secreta");
            // const send={
            //     newUser,
            //     token
            // }

            // return res.status(201).json({
            //     ok: true,
            //     message: "Bienvenido",
            //     //data: newUser
            //     //data: send
            //     //para meter el token dentro del objeto newUser hay que propagar ...
            //     //Para no mostrar el password en la llamada al api le seteamos null
            //     data: {...userExist._doc,password:null,token}
            // });

            return messages.mensajeGeneral(res,201,true,{...userExist._doc,password:null,token},"Welcome");
        }

        //Mensaje de contraseña incorrecta
        // res.status(400).json({
        //     ok: false,
        //     message: "la contraseña es incorrecta"
        // })

        messages.mensajeGeneral(res,400,false,"","la contraseña es incorrecta")    
    } catch (error) {
        // res.status(500).json({error :error.message , data});
        messages.mensajeGeneral(res,500,false,data,error.message)
    }
}
//Exportamos el objeto
export default userCtrl;