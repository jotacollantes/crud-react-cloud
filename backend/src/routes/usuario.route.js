import {Router} from  'express';
import userCtrl from '../controllers/usuario.controler.js';
const route=Router();
//userCtrl();

//la ruta /register va a ejecutar el metodo userCtrl.register del controlador userCtrl
route.post('/register',userCtrl.register);

//la ruta /login va a ejecutar el metodo userCtrl.login del controlador  userCtrl
route.post('/login',userCtrl.login);

export default route;