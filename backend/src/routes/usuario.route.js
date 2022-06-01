import {Router} from  'express';
import userCtrl from '../controllers/usuario.controler.js';
const usuarioRoute=Router();
//userCtrl();

//la ruta /register va a ejecutar el metodo userCtrl.register del controlador userCtrl
usuarioRoute.post('/register',userCtrl.register);

//la ruta /login va a ejecutar el metodo userCtrl.login del controlador  userCtrl
usuarioRoute.post('/login',userCtrl.login);

export default usuarioRoute;