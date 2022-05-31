//Inicializamos el objeto messages como un objeto vacio {}
const messages={};

messages.mensajeGeneral=(res,statusCode,ok,data,message)=>{
    res.status(statusCode).json({
        ok,data,message
    })
};
//Exportamos el objeto
export default messages;