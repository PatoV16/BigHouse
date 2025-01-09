import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './GerontologicalDashboardStyle.css'; 
import BarthelScale from './BarthelScale'; 
import Ficha2 from './LawtonBrodyTest'; 
import Ficha3 from './MinimentalTest'; 
import { getPacientes } from '../../../server/pacienteService'; 
import BarthelRecord from './barthelRecord';
import MiniExamenRecord from "./MiniExamenRecord";
import MenuPsicologo from './menu';


const GerontologicalDashboard = () => {
  const [activeSection, setActiveSection] = useState('verPacientes');
  const [activeFicha, setActiveFicha] = useState('barthel');
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPacienteId, setSelectedPacienteId] = useState(null);
  const [doctorName, setDoctorName] = useState(null); // Estado para el nombre del doctor
  const navigate = useNavigate();

  // Obtener el id_empleado del localStorage
  const idEmpleado = localStorage.getItem('id_empleado');

  // Función para obtener los datos del doctor
  const fetchDoctorData = async () => {
    if (idEmpleado) {
      try {
        const response = await fetch(`http://localhost:3000/empleados/${idEmpleado}`); // Ajusta esta URL según el endpoint
        const data = await response.json();
        setDoctorName(data.nombre); // Suponiendo que el nombre del doctor está en 'data.nombre'
      } catch (err) {
        console.error('Error al obtener los datos del doctor:', err);
      }
    }
  };

  // Cargar pacientes
  const fetchPacientes = async () => {
    try {
      const data = await getPacientes();
      setPacientes(data);
    } catch (err) {
      console.error('Error al cargar pacientes:', err);
      setError('Error al cargar pacientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
    fetchDoctorData(); // Cargar los datos del doctor al montar el componente
  }, []); 

  const handleSectionChange = (section, pacienteId = null) => {
    if (section === 'verFicha' && pacienteId) {
      navigate(`/MenuPsicologo/${pacienteId}`);
      return;
    }
    setActiveSection(section);
    setSelectedPacienteId(pacienteId);
  };

  const handleFichaChange = (ficha) => {
    setActiveFicha(ficha);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_empleado');
    navigate('/loginForm');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Psicólogo</h2>
        <p>Doctor: {doctorName || 'Cargando...'}</p> {/* Mostrar nombre del doctor */}
        <ul className="sidebar-menu">
          <li onClick={() => handleSectionChange('avisos')}>Avisos</li>
          <li onClick={() => handleSectionChange('verPacientes')}>Ver Pacientes</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="main-content">
        {activeSection === 'avisos' && (
          <div className="avisos-section">
            <h3>Avisos</h3>
            <div className="avisos-list">
              <div className="aviso">
                <h4>Aviso 1</h4>
                <p>Recordatorio: Actualiza los datos de los pacientes.</p>
              </div>
              <div className="aviso">
                <h4>Aviso 2</h4>
                <p>Nuevo paciente registrado. Verifica su ficha médica.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'verPacientes' && (
          <div className="ver-pacientes-section">
            <h3>Listado de Pacientes</h3>
            {loading ? (
              <p>Cargando pacientes...</p>
            ) : error ? (
              <p>{error}</p>
            ) : pacientes.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map((paciente) => (
                    <tr key={paciente.id_paciente}>
                      <td>{paciente.id_paciente}</td>
                      <td>{paciente.nombre}</td>
                      <td>{paciente.apellido}</td>
                      <td>
                        <button onClick={() => handleSectionChange('verFicha', paciente.id_paciente)}>
                          Ver ficha
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay pacientes registrados.</p>
            )}
          </div>
        )}

        {activeSection === 'verRegistros' && selectedPacienteId && (
          <div className="ver-registros-section">
            <h3>Fichas del Paciente</h3>
            <div className="ficha-tabs">
              <button
                className={activeFicha === 'barthel' ? 'active' : ''}
                onClick={() => handleFichaChange('barthel')}
              >
                Escala de Barthel
              </button>
              <button
                className={activeFicha === 'ficha2' ? 'active' : ''}
                onClick={() => handleFichaChange('ficha2')}
              >
                Escala de LawtonBrody
              </button>
              <button
                className={activeFicha === 'ficha3' ? 'active' : ''}
                onClick={() => handleFichaChange('ficha3')}
              >
                MiniMentalExam
              </button>
            </div>

            {activeFicha === 'barthel' && <BarthelScale idPaciente={selectedPacienteId} />}
            {activeFicha === 'ficha2' && <Ficha2 idPaciente={selectedPacienteId} />}
            {activeFicha === 'ficha3' && <Ficha3 idPaciente={selectedPacienteId} />}
          </div>
        )}

        {activeSection === 'verFicha' && selectedPacienteId && (
          <div className="section-container">
            <h3 className="section-title">ver Ficha psicológica</h3>
            <MenuPsicologo idPaciente={selectedPacienteId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GerontologicalDashboard;
