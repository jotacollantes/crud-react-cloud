// import logo from './logo.svg';
// import './App.css';

// import { useEffect } from "react";
// import { useUser } from "./context/UserContext";

// import { Saludos } from './components/Saludos';
// import { VentanaModal } from './components/VentanaModal';
import axios from 'axios';
import  {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { Empleados } from './components/Empleados';
import Login from './components/Login';
import  {Nav} from './components/Nav'
import Register from './components/Register';
import { useUser } from './context/UserContext';

//Aqui se le dice a axios cual es la ruta default 
// axios.defaults.baseURL='http://localhost:4000/api'
axios.defaults.baseURL='https://backend-dusky-mu.vercel.app/api'

function App() {
//Para traer la funcion loginUser() del context lo hacemos a travez de la funcion useUser()
//const {loginUser}= useUser()

//Importamos el useUser para poder obtener el token que esta almacenado en el hook user del userContext
const {user}=useUser()
//Globalizamos el token para las conexiones al api
axios.defaults.headers.common["Authorization"]=`Bearer ${user.token}`


//EL children es lo que esta entre <Public></Public> o  <Private></Private> se gun sea el caso
//Si se cumple la condicion se renderiza al componente hijo caso contrario a lo que indica le navigate
const Public=({children})=>{
  return !user.login? children: <Navigate to="/empleados" />;
}

const Private=({children})=>{
  return user.login? children: <Navigate to="/" />;
}

return (
    //Implementamos las rutas, las rutas solo se configuran en el App.js
   <BrowserRouter>
   <Nav />
   <Routes>
     {/* En la primera ruta se va a cargar el componente de la raiz */}
     
     {/* Rutas publicas  */}
     <Route path="/registro" element={<Public><Register /></Public>} />
     <Route path="/" element={<Public><Login /></Public>} />
     {/* Rutas Privadas */}
     <Route path="/empleados" element={<Private><Empleados /></Private>} />
     
   </Routes>
   </BrowserRouter>
  );
}

export default App;
