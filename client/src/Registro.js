import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import Axios from "axios";
import { useParams } from "react-router-dom";
import React from "react";
import './AnimalDiseño.css';
 


function Registro(){
    const [nombre , setNombre] = useState("");
    const [apellido_paterno , setApellidoPaterno] = useState("");
    const [apellido_materno , setApellidoMaterno] = useState("");
    const [edad , setEdad] = useState(0);
    const [hobby , setHbobby] = useState("");


    
    //const [mascotaList , setMascotas] = useState([]);
    // const { id } = useParams(); //referencia a id del empleado
    // const [id_empleado , SetId_empleado] = useState(id);

    // const [empleadoList, setEmpleados] = useState([]);


    
    const add = ()=>{ /**metodo para agregar mascotas */
       
        Axios.post("http://localhost:3001/create",{
           nombre : nombre,
           apellido_paterno : apellido_paterno,
           edad : edad,
           hobby : hobby
          }).then(() => {
           // getMascotas();
            alert("usuario registrado") 
        
            /*LIMPIA LOS CAMPOS ARRIBA Y NOTIFICA*/
            Swal.fire({
              title: "<strong>registro exitoso!</strong>",
              html: "<i>el usuario <strong>"+nombre+"</strong> ha sido registrado</i>",
              icon: 'success',
              timer: 2000
            })
          }).catch(function(error){
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
              })
            });
        
    }

    /**obtener mascota */
    /*useEffect(()=>{
      Axios.get("http://localhost:3001/mascota").then((response) => {
        
      setMascotas(response.data);
    });

    },[])*/




    // const getMascotas = () => {
    //   Axios.get("http://localhost:3001/mascota").then((response) => {
    //     console.log("Respuesta de mascotas:", response.data); // Agrega esta línea para depurar la respuesta
    //     setMascotas(response.data);
    //   });
    // }
    
    
    // getMascotas();

    // const getEmpleados = () => {
    //   Axios.get("http://localhost:3001/empleados").then((response) => {
    //     setEmpleados(response.data);
    //   });
    // }
    
    
    //   getEmpleados();
    
    
    
    // console.log(mascotaList);

    return(

      <div className="container">
     
      <div className="card text-center">
        <div className="card-header">
          GESTION DE MASCOTAS
        </div>
        <div className="card-body"> {/**parte de registrar */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input type="text"  value={nombre}
              onChange={(event)=>{
                setNombre(event.target.value)
              }}
            className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">apellido paterno: </span>
            <input type="text"  value={apellido_paterno}
              onChange={(event)=>{
                setApellidoPaterno(event.target.value)
              }}
            className="form-control" placeholder="Ingrese apellido paterno" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">apellido materno: </span>
            <input type="text"  value={apellido_materno}
              onChange={(event)=>{
                setApellidoMaterno(event.target.value)
              }}
            className="form-control" placeholder="Ingrese apellido materno" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">edad: </span>
            <input type="number"  value={edad}
              onChange={(event)=>{
                setEdad(event.target.value)
              }}
            className="form-control" placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">hobby: </span>
            <input type="text"  value={hobby}
              onChange={(event)=>{
                setHbobby(event.target.value)
              }}
            className="form-control" placeholder="Ingrese hobby" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>




        
        </div>
        <div className="card-footer text-muted"> {/**boton en la parte de abajo */}
              {/**CONDICION POR SI QUEREMOS ACTUALIZAR */}
          {
        
            /**DE LO CONTRARIO */
            <button className='btn btn-success' onClick={add}>Registrar</button>

          }    
         
        </div> {/**termina diseño boton  */}
      </div>
    </div>


    );

}
export default Registro;