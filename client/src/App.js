import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Empleado from './Empleado'; // Asegúrate de que la importación sea correcta
import Animal from './Animal'; // Asegúrate de que la importación sea correcta




function Inicio() {
  return (
    <div>
      <h1>Bienvenido al sistema</h1>
      <p>Selecciona una opción:</p>
      <ul>
        <li>
          <Link to="/Empleado">Ir a la página de Empleado</Link>
        </li>
        <li>
          <Link to="/Animal">Ir a la página de Animal</Link>
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
        <Route path="/Animal/:id" element={<Animal />} />
        <Route path='/Animal/' element = {<Animal />} />
      </Routes>
    </Router>
  );
}

export default App;
