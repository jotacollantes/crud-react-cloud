import User from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import messages from "../utils/messages.js";

const {mensajeGeneral} =messages;

const verificarToken=(req,res,next) => {
//El token se envia por el header Autorization Bearer
//si no esta presente el header autorizacion
if (!req.headers.authorization){
    return mensajeGeneral(res,
        401,
        false,
        null,
        "no se encontrol el header authorization y no esta autorizado 1");
}
//Si esta presente se lo obtiene con un split del 2do Elemento ex. "Bearer jljkljkjjñjñ"
const token=req.headers.authorization.split(" ")[1];
//Se valida si no es nulo o indefinido (todo lo que es nulo o indefinido es FALSE)
if (!token){
    return mensajeGeneral(res,
        401,
        false,
        null,
        "no se encontrol el header authorization y no esta autorizado 2");
}
// Hay que decodificar el token y verificar si existe en la Base de Datos
//Hay que incluir el token, la palabra secreta y devolvera o un error o un payload
jwt.verify(token,"secreta", async(error,payload) =>
    {
    //Si hay un error
    if (error){
        return mensajeGeneral(res,
            401,
            false,
            null,
            "no se encontrol el header authorization y no esta autorizado 3");
    }
    // Obetiene el Id Del jefe que se obtiene token decodificado.
    const _id =payload;
    const resp=await User.findById(_id);
    //En caso de que no se encuentre el usario/jefe
        if(!resp){
            return mensajeGeneral(res,
                401,
                false,
                null,
                "no se encontrol el header authorization y no esta autorizado 4");
        }
        //Creamos una variable en el obeject request req.userid para que pueda ser usado en el ciclo de Solicitud o Respuesta del API
        //console.log("entro en el middleware: "+ resp)
        req.userid=_id;
        // para que continue al controlador especificado en la ruta
        next();
    } )

}

export default verificarToken