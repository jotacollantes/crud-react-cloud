import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '../context/UserContext'


export const Nav = () => {
// Importamos el metodo useUser() del context para poder usar cualquier funcion o hook que esta definido dentro del context.
// En este caso usaremos el hook user y el metodo exit definidos en el context
  const {user,exit}=useUser()
  console.log(user.login);  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">




            <NavLink to="/" className="navbar-brand">
                Home
            </NavLink>


            <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            aria-controls='navbarNav'
            data-bs-target="#navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className='navbar-toggler-icon'></span>
            </button>
            
            {
                //Pregunto si login es igual a TRUE por medio de la variable user que tiene los datos del context const {user}=useUser() 
                
                user.login?
                 
                
                <div className="collapse navbar-collapse " id="navbarNav" >
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/empleados">
                        <i className="fas fa-user"> Welcome {user.name}</i>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/" onClick={()=>exit()}>
                        <i className="fas fa-user-times"> Logout</i>
                    </NavLink>
                    </li>
                    
                    
                    </ul>
                </div>:
                <div className="collapse navbar-collapse " id="navbarNav" >
                <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink className="nav-link" to="/registro">
                    <i className="fas fa-user-plus">Create Boss</i>
                </NavLink>
                </li>
                </ul>
            </div>

            }
        </div>
    </nav>

  )
}
