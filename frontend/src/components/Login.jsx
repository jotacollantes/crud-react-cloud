import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { Loading } from './Loading';

const Login = () => {
    //grabamos en un hook de estado, propio de este componente, el correo y el password
    const [DataUser,setDataUser]=useState({correo: "",password:""});
    //Funcion para manejar los eventos onChange de los input
    //recibimos como parametro el evento
    const handleChange=(e) => {
        setDataUser({...DataUser, [e.target.name]: e.target.value})
    }
    //Traemos la funcion loginUser a travez de useUser()    
    const {loginUser}= useUser()
    
    //Creamos navigate
    const navigate=useNavigate()

    //Para manejar el estado del spinner
    const [loading,setLoading]=useState(false);
    
    
    
    //Creamos la funcion login para que cuando se haga submit no se refresque la pagina
    const login = async (e)=> {
        e.preventDefault();
        setLoading(true)
        //llamamos a loginUser obtenido desde useUser() con el hook DataUser y con el hook navigate
        //Para que espere y no se vaya de una al setLoading(false) ponemos un await y asi podreos controlar el spinner
        await loginUser(DataUser,navigate);
        setLoading(false)

    }


  return (
    <div className="container mt-4">
        <div className="row">
            <div className="col-med-6 mx-auto">
                <div className="card">
                    <div className="container text-center">
                        <i className='fas fa-user fa-5x'></i>
                    </div>
                    <div className="card-header text-center mt-3">
                        <h4>Inicio de sesion</h4>
                    </div>
                    <div className="card-body">
                    {/* Cuando se ejecute el submit se tiene que ejecutar la funcion {loginUser} del userContext y hay que importarla*/}
                        {console.log("Spinner: "+loading)}
                        {
                          //Si el Loading es true se muestra el spinner  
                          loading? (<Loading />):
                          (<form onSubmit={login}>
                            <div className="mb-3">
                                <label className="form-label">Correo</label>
                                <input 
                                type="email"
                                name="correo"
                                className="form-control"
                                autoFocus
                                //Para que no se pierda el estado password cuando solo ingresamos el correo hay que hacer propagacion del hook datauser

                                // onChange={(e)=>setDataUser({...DataUser,correo: e.target.value})}
                                //Para hacer mas eficiente el manejo del cambio de estado se puede hacer lo siguiente:
                                onChange={(e)=>handleChange(e)}
                                required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input 
                                type="password"
                                name="password"
                                className="form-control"
                                //Para que no se pierda el estado correo cuando solo ingresamos el password hay que hacer propagacion del hook datauser
                                // onChange={(e)=>setDataUser({...DataUser,password: e.target.value})}
                                //Para hacer mas eficiente el manejo del cambio de estado se puede hacer lo siguiente:
                                onChange={(e)=>handleChange(e)}
                                required
                                />
                            </div>
                            <button type="submit"className="form-control btn btn-primary">Login</button>
                        </form>)

                        }
                        
                        



                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login