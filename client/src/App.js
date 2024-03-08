import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Empleado from './Empleado'; // Asegúrate de que la importación sea correcta
import Animal from './Registro'; // Asegúrate de que la importación sea correcta
import Registro from './Registro';




function Inicio() {
  return (
    <div>
      <h1>Bienvenido al sistema</h1>
      <p>Selecciona una opción:</p>
      <ul>
        <li>
          <Link to="/Registro">Ir a la página de registro</Link>
        </li>
      </ul>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Inicio />} />
        <Route path="/Empleado" element={<Empleado />} />
        {/* <Route path="/Animal/:id" element={<Animal />} /> */}
        <Route path='/Registro' element = {<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
