import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { Loading } from './Loading';

const Register = () => {
    //grabamos en un hook de estado, propio de este componente, el correo, el password y el nombre
    const [DataUser,setDataUser]=useState({correo: "",password:"",nombre:""});
    //Funcion para manejar los eventos onChange de los input
    //recibimos como parametro el evento
    const handleChange=(e) => {
        setDataUser({...DataUser, [e.target.name]: e.target.value})
    }
    //Traemos la funcion register a travez del context useUser()    
    const {registerUser}= useUser()
    //Creamos la funcion login para que cuando se haga submit no se refresque la pagina
    const navigate=useNavigate()
    
    
    const [loading,setLoading]=useState(false);
    //Siempre usamos async -> await para controlar el spinner. el spiner va a girar hasta que haya respuesta o promesa del await
    const register = async (e)=> {
        e.preventDefault();
        setLoading(true)
        //llamamos a registerUser obtenido desde useUser()
        await registerUser(DataUser,navigate);
        setLoading(false)

    }


  return (
    <div className="container mt-4">
        <div className="row">
            <div className="col-med-6 mx-auto">
                <div className="card">
                    <div className="container text-center">
                        <i className='fas fa-user-plus fa-5x'></i>
                    </div>
                    <div className="card-header text-center mt-3">
                        <h4>Registro de Jefe</h4>
                    </div>
                    <div className="card-body">
                    {/* Cuando se ejecute el submit se tiene que ejecutar la funcion {loginUser} del userContext y hay que importarla*/}

                    {
                        loading? (<Loading />) :
                    
                        (<form onSubmit={register}>
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
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input 
                                type="text"
                                name="nombre"
                                className="form-control"
                                //Para que no se pierda el estado correo cuando solo ingresamos el password hay que hacer propagacion del hook datauser
                                // onChange={(e)=>setDataUser({...DataUser,password: e.target.value})}
                                //Para hacer mas eficiente el manejo del cambio de estado se puede hacer lo siguiente:
                                onChange={(e)=>handleChange(e)}
                                required
                                />
                            </div>
                            <button type="submit"className="form-control btn btn-primary">Grabar</button>
                        </form>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register