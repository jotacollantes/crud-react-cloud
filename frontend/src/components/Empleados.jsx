import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import Swal from "sweetalert2";
import { ModalActions } from './ModalActions';
import { Loading } from './Loading';

export const Empleados = () => {
  //Importamos el hook user del context   
  const {user} = useUser();
  //Creamos un hook para los empleados con un useState por defecto con un arreglo vacio
  const [empleados,setEmpleados]=useState([]);

   //Para manejar el estado del spinner
   const [loading,setLoading]=useState(false);


//Creamos la funcion getEmpleados
const getEmpleados= useCallback(async () => 
{

  //console.log(user.token)
  try {
      //  const {data}= await axios.get("http://localhost:4000/api/empleado/listempleadojefe/",{
      //    headers: {
      //      Authorization: `Bearer ${user.token}`
      //    }
      //  });
      //Para Activar el Sponner
      setLoading(true)
      //Ya no es necesario enviar la ruta completa ni las cabezeras
      const {data}= await axios.get("/empleado/listempleadojefe/");

       //console.log(data)
       //Configuramos el hook empleados con setEmpleados con la data recuperada desde la consulta al backend.
       setEmpleados(data.data)
       setLoading(false)
  } 
  catch(error) 
  {
    setLoading(false)
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
//Ya no es necesario enviar la dependencia user.token porque esta variable ya se usa en app.js
},[])

//Creamos el useEffect para invocar a la funcion getEmpleados
useEffect(()=>{
  getEmpleados();
},[getEmpleados])
  
const deleteEmpleado= (id)=>
{
  Swal.fire({
    title: 'Are you sure?',
    text: "This action is not reversible!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete!'
  }).then(async (result) => {
    if (result.isConfirmed) {
    // const {data} = await axios.delete("http://localhost:4000/api/empleado/delete/"+id,
    // {
    //   headers: {
    //     Authorization: `Bearer ${user.token}`
    //   }
    // }
    // )
    setLoading(true);
    if(loading)
    {
      <Loading />
    }
    const {data} = await axios.delete("/empleado/delete/"+id)
    //Vuelve a mostrar la lista de empleados actualizada  
    
    
    Swal.fire({
            icon: "success",
            title: data.message,
            showConfirmationButton:false,
            timer:1500
          })
    setLoading(false);      
    getEmpleados()
    }
  })
}

//Manejador del Modal
const [empleado,setEmpleado]=useState(false);
const [edit,setEdit]=useState(false);
const [open, setOpen] = useState(false);
//Aqui recibiremos el hook edit y empleado
const onOpenModal = (edit,empleado) => 
{
  //actualizamos los hooks
  setOpen(true);
  setEdit(edit);
  setEmpleado(empleado);
  
}

const onCloseModal = () => setOpen(false);

//Para la busqueda
const search=async (value)=>{
  try {

  if(value ==="")
    {
      //Vuelve a mostrar la lista de empleados actualizada  
      return getEmpleados()
    }  
  const {data}=await axios.get("/empleado/search/"+value)
  //const {data}=await axios.get(`/empleado/search/${value}`)
  console.log(data.data)
    setEmpleados(data.data)
  } catch (error) {
    console.log(error.message)
  }
}


return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button className="btn btn-primary" 
            //Como voy a grabar tengo que enviar false
            onClick={()=>onOpenModal(false,{})}
            >
            
              <i className='fas fa-plus'></i>
              Add Employee
            </button>
          </div>
          <div className="col-md-6 ml-auto">
            <div className="input-group">
              <input
              className='form-control' 
              type="search" 
              placeholder='Search...'
              aria-label='Search' 
              required
              onChange={(e)=> search(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Employees of {user.name}</h4>
              </div>
              

              {
              loading? (<Loading />) :
              (<div className="table-responsive-lg">
                <table className="table table-striped">
                  <thead className='table-dark'>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>last Name</th>
                      <th>ID</th>
                      <th>Type of contract</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        //Ejecutamos el metodo map() del Hook empleados para mostrar la lista de empleados map() devuelve los items y un contador i
                        empleados.map(
                          (item,i)=>(
                            <tr key={item._id}>
                              <td>{i + 1}</td>
                              <td>{item.nombres}</td>
                              <td>{item.apellidos}</td>
                              <td>{item.id}</td>
                              <td>{item.tcontrato}</td>
                              <td>
                                <button className='btn btn-danger me-1' onClick={()=> deleteEmpleado(item._id) }><i className='fas fa-trash'></i></button>
                                <button 
                                className='btn btn-warning me-1'
                                //Como vamos a actualizar tenemos que enviar true y la informacion del empleado completa
                                onClick={()=>onOpenModal(true,item)}
                                ><i className='fas fa-edit'></i></button>
                              </td>
                            </tr>

                        )
                        )
                      }

                  </tbody>

                </table>
              </div>
            )}



            </div>
            </div>
          </div>
        </div>
      </section>
      {/* Le pasamos la variables por props: el hook open que va en true, tambien le pasamos el evento getEmpleados que maneja el hook empleados que es el que tiene la lista de empleados, tambien enviamos el metodo onCloseModal para que se pueda cerrar el modal,tambien enviamos el hook edit y empleado para manejar las acturlizacion de datos */}
<ModalActions 
open={open} 
onCloseModal={onCloseModal} 
getEmpleados={getEmpleados}
edit={edit}
empleado={empleado}
/>
</div>
  )
}
