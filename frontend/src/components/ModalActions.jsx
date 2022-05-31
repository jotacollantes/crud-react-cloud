import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';
// import { Loading } from './Loading';


//El componente ModalActions recibe open, onCloseModal y getEmpleados como props y los puedo usar dentro del componente
export const ModalActions = ({
    open,
    onCloseModal,
    getEmpleados,
    edit,
    empleado
}) => {
    //Declaro los datos inciales
    const initialState={
        nombres:"",
        apellidos:"",
        id:"",
        tcontrato:"Fijo"
    }

    // Declaro el Hook dataEmpleado
    const [dataEmpleado,setDataEmpleado]=useState(initialState)
    //Declaro un objeto tipo arreglo
    const tcontratos=["Fijo","Temporal","Practicante"]

    // Creamos un efecto para configurar el hook dataEmpleado con los datos.
    // En caso de que sea actualizacion edit==true configuramos el hook dataEmpleados con los datos del empleado que recibimos en el props en este caso empleado, caso contrario dataEmpleado sera igual a initialState

    useEffect(()=>{
        // Se puede usar operacion ternaria
        
        edit ? setDataEmpleado(empleado) :  setDataEmpleado(initialState);
        // if (edit)
        // {
        //     setDataEmpleado(empleado)
        // }
        // else{
        //     setDataEmpleado(initialState);
        // }
        
        //eslint-disable-next-line
    },[edit,empleado])
    
    
    
    
    
    const handleChange=(e)=>{
        setDataEmpleado({...dataEmpleado,[e.target.name]:e.target.value})
    }
    
    const [loading,setLoading]=useState(false);
    const actions= async (e)=> 
    {
        e.preventDefault()
        //Si el estado edit viene en true ejecuta updateEmpleado caso contrario ejecuta saveEmpleado
        // edit? updateEmpleado() :saveEmpleado();
        try {
            setLoading(true)
            //Me conecto a la api que graba empleados y le envio como parametros el hook data Empleado
            let resp={}
            edit?
            (resp =await axios.put(`/empleado/update/${empleado._id}`,dataEmpleado))
            :
            (resp =await axios.post('/empleado/crear',dataEmpleado))
            Swal.fire({
                icon: "success",
                title: resp.data.message,
                showConfirmationButton:false,
                timer:1500
                })
                //Cerramos el modal con el metodo onClosemodal que lo recibimos en el props del componente
                setLoading(false)
                onCloseModal()
                getEmpleados()
        } catch (error) {
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
            console.log("Error en la funcion action", error.message);
        }
    }
  return (
    <div>
    <Modal open={open} onClose={onCloseModal} center>
    {/* <h2>Simple centered modal</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quas molestiae animi cupiditate esse eaque non! Suscipit alias ipsum odio impedit ipsa, voluptatibus vel nisi non earum tempora sint nobis.</p> */}
    <div className="card">
        <div className="card-header">
            <h5>{edit? 'Actualice empleado': 'Ingrese Empleado'}</h5>
        </div>
        <div className="card-body">
            <form onSubmit={actions}>
                <div className="mb-3">
                    <label className="form-label">Nombres</label>
                    <input type="text" 
                    className='form-control'
                    name='nombres'
                    required
                    autoFocus
                    onChange={(e)=>handleChange(e)}
                    value={dataEmpleado.nombres}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellidos</label>
                    <input type="text" 
                    className='form-control'
                    name='apellidos'
                    required
                    onChange={(e)=>handleChange(e)}
                    value={dataEmpleado.apellidos}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Identificacion</label>
                    <input type="text" 
                    className='form-control'
                    name='id'
                    required
                    onChange={(e)=>handleChange(e)}
                    value={dataEmpleado.id}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de Contrato</label>
                    <select 
                    name="tcontrato"
                    className='form-select'
                    onChange={(e)=>handleChange(e)}
                    value={dataEmpleado.tcontrato}
                    >
                    {
                    //Obtenemos los datos del arreglo tcontratos por medio de la variable item similar a un foreach
                    tcontratos.map((item)=>(<option key={item} value={item}>{item}</option>))
                    }

                    </select>
                </div>
                
                
                
                <div className="mb-3">

                    {
                    !loading?
                    (<button type="submit" className="btn btn-primary form-control">
                    {edit? 'Actualizar': 'Grabar'}
                    </button>)
                
                    :
                    (<button type="submit" className="btn btn-primary form-control"  disabled="">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {edit? 'Actualizando...': 'Guardando...'}
                    </button>)
                     }
                </div>





            </form>
        </div>
    </div>

  </Modal>
  </div>
  )
}