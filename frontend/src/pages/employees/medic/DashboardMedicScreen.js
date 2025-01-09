import React, { useEffect, useState } from 'react';
import './DoctorDashboardStyle.css';
import RegistrarFichaMedica from './RegisterNewFicha';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FichaMedicaPaciente from './VerFichaMedica';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('verFichasMedicas');
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPacienteId, setSelectedPacienteId] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const navigate = useNavigate(); // Hook de React Router para la navegación

  // Función para obtener pacientes sin ficha médica
  const getPacientesSinFichaMedica = async () => {
    try {
      const { data: pacientes } = await axios.get('http://localhost:3000/pacientes');
      const pacientesSinFichaMedica = [];
      for (const paciente of pacientes) {
        const { data: fichaMedica } = await axios.get(`http://localhost:3000/fichas-medicas/paciente/${paciente.id_paciente}`);
        if (!fichaMedica || fichaMedica.length === 0) {
          pacientesSinFichaMedica.push(paciente);
        }
      }
      return pacientes;
    } catch (error) {
      console.error('Error al obtener pacientes sin ficha médica:', error.message || error);
      throw new Error('No se pudo obtener la lista de pacientes sin ficha médica.');
    }
  };

  // UseEffect para cargar pacientes y datos del doctor
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientesSinFichaMedica();
        setPacientes(data);
      } catch (err) {
        console.error('Error al cargar pacientes:', err);
        setError('Error al cargar pacientes.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctorInfo = async () => {
      try {
        const idEmpleado = localStorage.getItem('id_empleado');
        if (!idEmpleado) {
          throw new Error('ID del empleado no encontrado en localStorage');
        }
        const response = await axios.get(`http://localhost:3000/empleados/${idEmpleado}`);
        setDoctorInfo(response.data);
      } catch (err) {
        console.error('Error al cargar datos del doctor:', err);
        setError('Error al cargar la información del doctor.');
      }
    };

    fetchPacientes();
    fetchDoctorInfo();
  }, []);

  // Función para cambiar de sección
  const handleSectionChange = (section, pacienteId = null) => {
    setActiveSection(section);
    if (pacienteId) {
      setSelectedPacienteId(pacienteId);
      navigate(`/ficha-medica/${pacienteId}`); // Redirige a la página de ficha médica
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_empleado');
    console.log('Logout');
    
    navigate(`/LoginForm`);
  };

  if (!doctorInfo) {
    return <div className="loading">Cargando información del doctor...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="doctor-welcome">
          <h2 className="welcome-text">Bienvenido</h2>
          <div className="doctor-info">
            <p className="doctor-name">Dr. {doctorInfo.nombre} {doctorInfo.apellido}</p>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li className={activeSection === 'avisos' ? 'active' : ''} onClick={() => handleSectionChange('avisos')}>
            <span className="menu-icon">📢</span>
            Avisos
          </li>
          <li className={activeSection === 'verFichasMedicas' ? 'active' : ''} onClick={() => handleSectionChange('verFichasMedicas')}>
            <span className="menu-icon">📋</span>
            Generar Fichas Médicas
          </li>
          <li onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            Cerrar Sesión
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activeSection === 'verFichasMedicas' && (
          <div className="section-container">
            <h3 className="section-title">Listado de Pacientes</h3>
            {loading ? (
              <div className="loading">Cargando pacientes...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : pacientes.length > 0 ? (
              <div className="table-container">
                <table className="patients-table">
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
                          <button
                            className="action-button"
                            onClick={() => handleSectionChange('registrarFicha', paciente.id_paciente)}
                          >
                            Ver ficha médica
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">No hay pacientes registrados.</p>
            )}
          </div>
        )}

        {activeSection === 'avisos' && (
          <div className="section-container">
            <h3 className="section-title">Avisos</h3>
            <div className="avisos-list">
              <div className="aviso-card">
                <h4>Aviso 1</h4>
                <p>Recordatorio: Actualiza tus datos de paciente.</p>
                <span className="aviso-date">26 Dic 2024</span>
              </div>
              <div className="aviso-card">
                <h4>Aviso 2</h4>
                <p>Nuevo paciente agregado. Revisa la ficha médica.</p>
                <span className="aviso-date">26 Dic 2024</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'registrarFicha' && selectedPacienteId && (
          <div className="section-container">
            <h3 className="section-title">Registrar Nueva Ficha Médica</h3>
            <FichaMedicaPaciente idPaciente={selectedPacienteId} idEmpleado={localStorage.getItem('id_empleado')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
