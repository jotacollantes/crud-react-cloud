// para programar en la forma moderna hay que declarar type=module en package.son
import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from './database.js';
import route from "./routes/usuario.route.js";
import empleadoRoute from "./routes/empleado.route.js";
connectDB();


const app = express();
app.set("port",4000);
app.use(morgan("dev"));
app.use(express.urlencoded( {extended: true}));
app.use(express.json());
app.use(cors({origin : "*"}));

// Se le mostrara al usuario este mensaje cuando se conecte al server via browser o via api
// app.use('/',(req,res)=>{
// res.status(200).json({
//     ok:true,
//     message:"hola mmundo"
// })
// });

app.use('/api',route);
app.use('/api/empleado',empleadoRoute);
app.listen(app.get('port'), 
    console.log('servidor escuchando en el puerto ' , app.get('port') ));