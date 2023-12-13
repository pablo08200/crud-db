
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';


function Empleado() {
  //constantes para acceder a las variables
  const[nombre,setNombre] = useState(""); 
  const[edad,setEdad] = useState(0); 
  const[pais,setPais] = useState("");
  const[cargo,setCargo] = useState(""); 
  const[anios,setAnios] = useState(0); 
  const[id,setId] = useState(0); 

 /* const [mostrarFormularioAnimal, setMostrarFormularioAnimal] = useState(false);*/
  /**PARA VER DETALLES */
  const [mostrarDetalles,setMostrarDetalles] = useState(false);
  const [detallesEmpleado,setDetallesEmpleado] = useState({});

  /**PARA EDITAR */
  const [editar,setEditar] = useState(false); 

  //creando lista para el metodo GET
  const [empleadosList,setEmpleados] = useState([]); //lista vacia

const add = ()=>{ /**boton agregar */
  Axios.post("http://localhost:3001/create",{
    nombre : nombre,
    edad : edad,
    pais : pais,
    cargo : cargo,
    anios : anios
  }).then(() => {
    getEmpleados();
    alert("empleado registrado")
    limpiarCampos();  

    /*LIMPIA LOS CAMPOS ARRIBA Y NOTIFICA*/
    Swal.fire({
      title: "<strong>registro exitoso!</strong>",
      html: "<i>El empleado <strong>"+nombre+"</strong> ha sido registrado</i>",
      icon: 'success',
      timer: 3000
    })
  }).catch(function(error){
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
}


/**boton update */
const update = ()=>{
  Axios.put("http://localhost:3001/update",{
    id : id,
    nombre : nombre,
    edad : edad,
    pais : pais,
    cargo : cargo,
    anios : anios
  }).then(() => {
    getEmpleados();
    //alert("empleado updated!!")
    limpiarCampos(); /**llamamos el metodo para limpiar */
   
    /**mandando alertas */
    Swal.fire({
      title: "<strong>Actualizacion exitosa!!!</strong>",
      html: "<i>El empleado <strong>"+nombre+"</strong> ha sido actualizado</i>",
      icon: 'success',
      timer: 3000
    })
  }).catch(function(error){
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
}

/**BOTON DELETE */
const deleteEmple = (val)=>{
  Swal.fire({
    title: 'Confirmar eliminado?',
    html: "<i>¿Realmente desea eliminar a <strong>"+val.nombre+"</strong> ?</i>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
        getEmpleados();
        //alert("empleado updated!!")
        limpiarCampos(); /**llamamos el metodo para limpiar */
       
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        showConfirmButton: false,
        title: val.nombre+' has been deleted.',
        timer:2000
      }).catch(function(error){
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logro eliminar el empleado!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
    }
  });
}


/**funcion para limpiar campos del boton cancelar */
const limpiarCampos = ()=>{
    setNombre("");
    setEdad("");
    setAnios("");
    setCargo("");
    setPais("");
    setId("");

    /**regresar al boton de registrar */
    setEditar(false);
}



/**funcion para editar y que se pongan los valores en la tabla y poder editarlos*/
const editarEmpleado = (val)=>{
  setEditar(true);

  setNombre(val.nombre);
  setEdad(val.edad);
  setPais(val.pais);
  setCargo(val.cargo);
  setAnios(val.anios);
  setId(val.id);

}

const getEmpleados = ()=>{
  Axios.get("http://localhost:3001/empleados").then((response) => {
    
    setEmpleados(response.data);
  });
}

getEmpleados();


//detalles
const verDetalles = (val) =>{
  setMostrarDetalles(true);
  setDetallesEmpleado(val);

  // Establecer el idEmpleado cuando se muestran los detalles
  //setIdEmpleado(parseInt(val.id, 10)); 
}

  return ( 

   
      <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
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
            <span className="input-group-text" id="basic-addon1">edad: </span>
            <input type="number"  value={edad}
              onChange={(event)=>{
                setEdad(event.target.value)
              }}
            className="form-control" placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais: </span>
            <input type="text" value={pais}
              onChange={(event)=>{
                setPais(event.target.value)
              }}
            className="form-control" placeholder="Ingrese un pais" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text"  value={cargo}
              onChange={(event)=>{
                setCargo(event.target.value)
              }}
            className="form-control" placeholder="Ingrese un cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">años: </span>
            <input type="number"  value={anios}
              onChange={(event)=>{
                setAnios(event.target.value)
              }}
            className="form-control" placeholder="Ingrese años" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          
        </div>  {/**cierra tabla clientes */}
        <div className="card-footer text-muted"> {/**boton en la parte de abajo */}
              {/**CONDICION POR SI QUEREMOS ACTUALIZAR */}
          {
            editar? /**si editar es true ejecuta el boton de editar */
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>cancelar</button>
            </div>
            
            /**DE LO CONTRARIO */
            :<button className='btn btn-success' onClick={add}>Registrar</button>

          }    
         
        </div> {/**termina diseño boton  */}
      </div>

      <table className="table table-striped">   {/**TABLA DE DATOS */}
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val,key)=>{
              return <tr key={val.id}>
                      <th scope="row">{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>{/**botones de acciones */}
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                          <button type="button" 
                            onClick={() =>{ 
                              editarEmpleado(val);
                            }}
                          className="btn btn-info">Editar</button>


                          <button type="button" onClick={() => {
                            deleteEmple(val) /**val completo para extraer datos como el nombre */
                          }} className="btn btn-danger">Eliminar</button>

                            <button type="button" 
                              onClick={() =>{
                                verDetalles(val);
                              }}
                            className="btn btn-info">detalles</button>
                        </div>
                      </td>
                    </tr>
            })
          }
          
        </tbody>
      </table>   {/**termina tabla de datos */}
      {/**ver detalles */}
        {mostrarDetalles && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Detalles del Empleado</h5>
            <p className="card-text">
              <strong>Nombre:</strong> {detallesEmpleado.nombre}
            </p>
            <p className="card-text">
              <strong>Edad:</strong> {detallesEmpleado.edad}
            </p>
            <p className="card-text">
              <strong>Pais:</strong> {detallesEmpleado.pais}
            </p>
            <p className="card-text">
              <strong>Cargo:</strong> {detallesEmpleado.cargo}
            </p>
            <p className="card-text">
              <strong>Años de Experiencia:</strong> {detallesEmpleado.anios}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setMostrarDetalles(false)}
            >
              Cerrar Detalles
            </button> 
           { /*<button
              className="btn btn-secondary"
              onClick={() => setMostrarFormularioAnimal(true)}
              >
              Registrar Animal
            </button>*/}

            <Link to={`/Animal/${detallesEmpleado.id}`}>
                <button className='btn btn-secondary'>Ir a Animal</button>
            </Link>
         
          </div>
        </div>
      )}
      {/**animales */}
    
 
    </div>
    
  );
}


export default Empleado;
