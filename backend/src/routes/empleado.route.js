import {Router} from  'express';
import empleadoCtrl from '../controllers/empleado.controler.js';
import verificarToken from '../middlewares/auth.js';
const empleadoRoute=Router();
//userCtrl();

//la ruta /register va a ejecutar el metodo userCtrl.register del controlador userCtrl
empleadoRoute.get('/',empleadoCtrl.listAllEmployess);
//Se proteje la ruta con verificarToken, ya no se envia el parametro id porque esta incluido en el objeto request req.userid=_id creado en el middleware auth.js
empleadoRoute.post('/crear',verificarToken,empleadoCtrl.createEmpleado);
//Va a recibir como parametro la variable id que es recibida en el controlador por medio del request  const id=req.params.id;
empleadoRoute.get('/listid/:id',verificarToken,empleadoCtrl.listById);

//empleadoRoute.get('/listempleadojefe/:id',empleadoCtrl.listEmpleadoByUsuarioJefe);
//Ya no hay necesidad de enviar el parametro /:id porque ya se añadio al request req.userid=_id  en el middleware verificarToken
empleadoRoute.get('/listempleadojefe',verificarToken,empleadoCtrl.listEmpleadoByUsuarioJefe);
empleadoRoute.delete('/delete/:id',verificarToken,empleadoCtrl.deleteEmpleado);
empleadoRoute.put('/update/:id',verificarToken,empleadoCtrl.updateEmpleado);

//Se envia como parametro el id del usuario/jefe
//empleadoRoute.get('/search/:id/:nombres',empleadoCtrl.searchEmpleado);
//Ya no es necesario enviar el id porque ya se añadio al objeto request req.userid=_id  en el middleware verificarToken
empleadoRoute.get('/search/:values',verificarToken,empleadoCtrl.searchEmpleado);


export default empleadoRoute;