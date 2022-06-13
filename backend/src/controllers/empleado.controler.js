import Empleado from "../models/empleado.model.js";
import messages from "../utils/messages.js";
const {mensajeGeneral} =messages;


const empleadoCtrl={};

empleadoCtrl.listAllEmployess = async (req,res) => {
    try {
        //voy a poblar la respuesta con la informacion del usuario/jefe, como son varias opciones va entre llaves porque es un arreglo, sin la informacion del campo password
        // console.log("Aqui "+ req.originalUrl)
        const resp =await Empleado.find().populate({path:"usuario",select:"-password"});
        mensajeGeneral(res,200,true,resp,"Lista de Empleados");
    }
    catch (error) 
    {
        mensajeGeneral(res,500,false,"",error.message)  
    }

}


//Se crea el metodo register
empleadoCtrl.createEmpleado= async (req,res)=>{
   
    try {
         const data=req.body;
         //const resp=await Empleado.create(data);
         //Se hace propagacion del objeto empleado para que el campo  usuario tenga el valor del request req.userid
         const resp=await Empleado.create({...data,usuario: req.userid});
         messages.mensajeGeneral(res,200,true,resp,"Employee Created");
    }
       
 catch (error) {
        //res.status(500).json({error :error.message , data});
        messages.mensajeGeneral(res,500,false,"",error.message);
    }

};



empleadoCtrl.listById = async (req,res) => {
    try {
        const id=req.params.id;
        //const {id}=req.params;
        const resp =await Empleado.findById(id);
        if(!resp)
        {
            return mensajeGeneral(res,404,false,"","Empleado con el " + id + " no encontrado");      
        }
        mensajeGeneral(res,200,true,resp,"");  
        
    }
    catch (error) 
    {
        mensajeGeneral(res,500,false,"",error.message)  
    }

}


empleadoCtrl.listEmpleadoByUsuarioJefe = async (req,res) => {
    try {
        
        
        //const {id}=req.params;
        //const id=req.params.id;
        //Asignamos en id el valor que viene por el objeto request req.userid=_id que se creo en verificarToken 
        const id=req.userid;
        //console.log("entro con el id: "+id);

        
        const resp =await Empleado.find({ usuario:id }).populate({path:"usuario",select:"-password"});
       
        mensajeGeneral(res,200,true,resp,"");  
        
    }
    catch (error) 
    {
        mensajeGeneral(res,500,false,"",error.message)  
    }
}

empleadoCtrl.deleteEmpleado = async (req,res) => {
    try {
        const id=req.params.id;
        //const {id}=req.params;
        const resp =await Empleado.findById(id);
        if(!resp)
        {
            return mensajeGeneral(res,404,false,"","Empleado con el " + id + " no encontrado");      
        }
        //Si lo encuentra lo elimina, no se usa la funcion findAndDelete porque en caso de no existir se va por el catch, en su lugar se usa deleteOne porque podemos controlar el mensaje de que no fue encontrado
        await resp.deleteOne();
        mensajeGeneral(res,200,true,resp,"Employee Deleted");
    }
    catch (error) 
    {
        mensajeGeneral(res,500,false,"",error.message)  
    }
}

empleadoCtrl.updateEmpleado = async (req,res) => {
    try {
        const id=req.params.id;
        //const {id}=req.params;
        const resp =await Empleado.findById(id);
        //el metodo findById(id) cuando no encuentra el documente devuelve un objeto null y se puede usar en el if(!resp)
        console.log(resp)
        if(!resp)
        {
            return mensajeGeneral(res,404,false,"","Empleado con el " + id + " no encontrado");      
        }
        //Si lo encuentra lo actualiza, no se usa la funcion findAndUpdate porque en caso de no existir se va por el catch, en su lugar se usa updateOne porque podemos controlar el mensaje de que no fue encontrado
        await resp.updateOne(req.body);
        mensajeGeneral(res,200,true,"","Employee Updated");
    }
    catch (error) 
    {
        mensajeGeneral(res,500,false,"",error.message)  
    }
}
empleadoCtrl.searchEmpleado = async (req,res) => {
    try {
        // const id=req.params.id;
        // const nombres=req.params.nombres;
        
        const {values}=req.params;
        // console.log("entro en el controlador: " + values.toLowerCase());
        const resp =await Empleado.find(
            {
                $or:[{nombres: { $regex: ".*" + values +".*"}}, {apellidos: {$regex: ".*" + values +".*"}},],
                // nombres: {$regex: ".*" + values +".*"},

                //Se usa el objeto request req.userid añadido por el middelware verificaToken
                usuario: req.userid
            }
        );
        console.log(resp)
        
        //Con el metodo find() el Objeto resp siempre devolvera algo asi sea un arreglo vacio {} por eso no lo poedemos usar en el if(!resp) asi como si se lo puede usar en findById(id 
       // if(!resp)
        // {
        // return mensajeGeneral(res,404,false,"","Empleado no encontrado");
        // } 
        mensajeGeneral(res,200,true,resp,"");
           
    }
    catch (error) 
    {
        console.log(error.message)
        mensajeGeneral(res,500,false,"",error.message)
        
    }
}
//Exportamos el objeto
export default empleadoCtrl;