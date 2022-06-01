import axios from "axios";
import Swal from "sweetalert2";
import React, { createContext,useState,useContext, useEffect } from "react";

//Creamos el context UserContext
const UserContext=createContext()
//Creamos una variable con valores iniciales para los estados del Usuario
const initialState={login:false,token:"",name:""}

//Ahora creamos el proveedor
export const UserProvider=(props)=>
{
    //Creamos el estado del Usuario con los valores inciiales especificados en initialState   
    const [user,setUser]=useState(initialState) 

    //Para Mantenter la sesion del usuario cada vez que se refresque la aplicacion hay que hacer lo siguiente
    useEffect(()=>{
        // Leemos el localstorage user y se guarda en initial
        
        //     login: true
        //     name: "Juan"
        //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjMzJlZDFjY2I4ZTFjZjAzYTVlMWYiLCJpYXQiOjE2NTM3NTcwMjR9.5G58jQ_6aKPkB1_ZdMbdpfKx_SxFwfgemD20QIZ9Ksk"
        const initial=JSON.parse(localStorage.getItem("user"))
        //console.log("Valor inicial: " + initial);
        //SI existe initial
        if(initial)
        {
            //console.log("entro: " + initial);
            //Si initial.login==true
            if (initial.login)
            {
                //console.log("Usuario valido: " + initial.login);
                //Lo recuperdo en el localstorage lo guardamos en el Hook user que pertenece al context y que sera utilizado en toda la aplicacion
                setUser(initial) 
                
            }
            else 
            {
                //console.log("Usuario invalido: " + initial.login);
                //Caso contrario lo inicializamos con valores por defectos de initialSate  
                setUser(initialState)  
            }
        }


    },[])


    //Creamos la funcion loginUser que sera la funcion provider para consultar los datos en el backend
    //La funcion va a recibir los datos del usuarios (correo y password) y el navigate

    const loginUser=async(dataUser,navigate)=>{
        try {
            //console.log(dataUser);
            
            //Pasamos como parametro lo almacenado en dataUser
            // const resp = await axios.post('http://localhost:4000/api/login',dataUser)
            const resp = await axios.post('/login',dataUser)
            //Para que solo aparezca el elemento data de la respuesta enviada por el backend como en el postman
             
            // data:
            // correo: "juan@collantes.ec"
            // createdAt: "2022-05-24T01:20:45.264Z"
            // nombre: "Juan"
            // password: null
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjMzJlZDFjY2I4ZTFjZjAzYTVlMWYiLCJpYXQiOjE2NTM2MTgyMjF9.d1-lBN2OTVTmflj0M_3qKG-cqJ0iNPqxvdGcZlqZOuU"
            // updatedAt: "2022-05-24T01:20:45.264Z"
            // __v: 0
            // _id: "628c32ed1ccb8e1cf03a5e1f"
            // [[Prototype]]: Object
            // message: "Bienvenido"
            // ok: true
            //console.log(resp)
            if (resp.data.ok)
            {
                
                const userLogin={
                    login: true,
                    token: resp.data.data.token,
                    name: resp.data.data.nombre
                }
                //Guardamos en el localstorage
                //HAY QUE GUARDARLO COMO JSON LEIBLE CASO CONTRARIO SE GRABA COMO OBJENO NO LEIBLE
                localStorage.setItem("user",JSON.stringify(userLogin))
                //Actualizamos el HOOK user con su metodo setUser
                setUser(userLogin)
                //Redireccionamos al usuario/jefe a la ruta /empleados
                navigate('/empleados')

                //Mostramos la alerta con SWAL
                
                Swal.fire({
                    icon: "success",
                    title: resp.data.message,
                    showConfirmationButton:false,
                    timer:1500
                })
            }
                    
        } catch (error) 
            {
            
            //Si ok devuelve false
            //si es error desdel el backend
            
                if(error)
                {
                    //console.log(error.response.data.ok)

                    if(!error.response.data.ok)
                    {
                        return Swal.fire({
                            icon: "error",
                            title: error.response.data.message,
                            showConfirmationButton:false,
                            timer:1500
                        })
                    }
                }
                // Si es error de frontend se muestra este resultado
                console.log("error en la funcion login",error.message)
            }
    }

    const registerUser=async(dataUser,navigate)=>{
        try {
            console.log(dataUser);
            
            //Pasamos como parametro lo almacenado en dataUser
            const resp = await axios.post('/register',dataUser)
            //Para que solo aparezca el elemento data de la respuesta enviada por el backend como en el postman
             
            // data:
            // correo: "juan@collantes.ec"
            // createdAt: "2022-05-24T01:20:45.264Z"
            // nombre: "Juan"
            // password: null
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjMzJlZDFjY2I4ZTFjZjAzYTVlMWYiLCJpYXQiOjE2NTM2MTgyMjF9.d1-lBN2OTVTmflj0M_3qKG-cqJ0iNPqxvdGcZlqZOuU"
            // updatedAt: "2022-05-24T01:20:45.264Z"
            // __v: 0
            // _id: "628c32ed1ccb8e1cf03a5e1f"
            // [[Prototype]]: Object
            // message: "Bienvenido"
            // ok: true
            //console.log(resp)
            if (resp.data.ok)
            {
                
                const userLogin={
                    login: true,
                    token: resp.data.data.token,
                    name: resp.data.data.nombre
                }
                //Guardamos en el localstorage
                //HAY QUE GUARDARLO COMO JSON LEIBLE CASO CONTRARIO SE GRABA COMO OBJENO NO LEIBLE
                localStorage.setItem("user",JSON.stringify(userLogin))
                //Actualizamos el HOOK user con su metodo setUser
                setUser(userLogin)
                //Redireccionamos al usuario/jefe a la ruta /empleados
                navigate('/empleados')

                //Mostramos la alerta con SWAL
                
                Swal.fire({
                    icon: "success",
                    title: resp.data.message,
                    showConfirmationButton:false,
                    timer:1500
                })
            }
                    
        } catch (error) 
            {
            
            //Si ok devuelve false
            //si es error desdel el backend
            
                if(error)
                {
                    //console.log(error.response.data.ok)

                    if(!error.response.data.ok)
                    {
                        return Swal.fire({
                            icon: "error",
                            title: error.response.data.message,
                            showConfirmationButton:false,
                            timer:1500
                        })
                    }
                }
                // Si es error de frontend se muestra este resultado
                console.log("error en la funcion register",error.message)
            }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //Exportamos la funcion login por medio del objeto value
    const exit=() =>{
        //inicializamos el hook user con los valores por defectos que son vacios
        //initialState={login:false,token:"",name:""}
        setUser(initialState);
        //borramos el local storage
        localStorage.removeItem("user")

    }
    
    
    
    //Aqui globalizamos el metodo loginUser(), el hook user,el metodo exit y el metodo registerUser()
    const value={
        loginUser,
        //Cuando se inicia sesion y es usuario valido se ejecuta el estado setUser(userLogin) por lo tanto ya podemos usar el hook user
        user,
        exit,
        registerUser
    
    }

    //Luego retornarmos la funcion dentro del context UserContext como un provider, tambien se manda todos los props a manera de propagacion
    return <UserContext.Provider value={value} {...props} />


}
//Exporto la funcion useUser
export function useUser(){
    const context=useContext(UserContext)
    //si el context no existe
    if(!context){
        throw new Error('useUser error')
    }
    return context
}
