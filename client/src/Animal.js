import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import Axios from "axios";
import { useParams } from "react-router-dom";
import React from "react";
import './AnimalDiseño.css';
 


function Animal(){
    const[id_mascota,setId_mascota] = useState(0); 
    const [nombreMascota , setNombreMascota] = useState("");
    const [edadMascota , setEdadMascota] = useState(0);
    const [mascotaList , setMascotas] = useState([]);
    const { id } = useParams(); //referencia a id del empleado
    const [id_empleado , SetId_empleado] = useState(id);

    const [empleadoList, setEmpleados] = useState([]);


    
    const add = ()=>{ /**metodo para agregar mascotas */
       
        Axios.post("http://localhost:3001/createMascota",{
           nombreMascota : nombreMascota,
           edadMascota : edadMascota,
           id_empleado : id_empleado
          }).then(() => {
            getMascotas();
            alert("mascota registrado") 
        
            /*LIMPIA LOS CAMPOS ARRIBA Y NOTIFICA*/
            Swal.fire({
              title: "<strong>registro exitoso!</strong>",
              html: "<i>La mascota <strong>"+nombreMascota+"</strong> ha sido registrado</i>",
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




    const getMascotas = () => {
      Axios.get("http://localhost:3001/mascota").then((response) => {
        console.log("Respuesta de mascotas:", response.data); // Agrega esta línea para depurar la respuesta
        setMascotas(response.data);
      });
    }
    
    
    getMascotas();

    const getEmpleados = () => {
      Axios.get("http://localhost:3001/empleados").then((response) => {
        setEmpleados(response.data);
      });
    }
    
    
      getEmpleados();
    
    
    
    console.log(mascotaList);

    return(

      <div className="container">
     
      <div className="card text-center">
        <div className="card-header">
          GESTION DE MASCOTAS
        </div>
        <div className="card-body"> {/**parte de registrar */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input type="text"  value={nombreMascota}
              onChange={(event)=>{
                setNombreMascota(event.target.value)
              }}
            className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">edad: </span>
            <input type="number"  value={edadMascota}
              onChange={(event)=>{
                setEdadMascota(event.target.value)
              }}
            className="form-control" placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ID: </span>
                <input type="text" value={id_empleado} readOnly
                  onChange={(event) => {
                    SetId_empleado(event.target.value); // Cambiar idEmpleado(event.target.value) a setIdEmpleado(event.target.value)
                  }}
                  className="form-control" placeholder="Id del empleado" aria-label="ID del empleado" aria-describedby="basic-addon1"
                />
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

      <table className="table table-striped">   {/**TABLA DE DATOS */}
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">idEmpleado</th>
            <th scope="col">Nombre del empleado</th>
            
          </tr>
        </thead>
        <tbody>
          {
            mascotaList.map((val,key)=>{
              const empleado = empleadoList.find((empleado) => empleado.id === val.id_empleado);
              const nombre = empleado ? empleado.nombre : "Desconocido";

              return <tr key={val.id_mascota}>

                      <th scope="row">{val.id_mascota}</th>
                      <td>{val.nombreMascota}</td>
                      <td>{val.edadMascota}</td>
                      <td>{val.id_empleado}</td>
                     <td>{nombre}</td>
                    </tr>
            })
          }

        </tbody>
      </table>   {/**termina tabla de datos */}
    </div>


    );

}
export default Animal;