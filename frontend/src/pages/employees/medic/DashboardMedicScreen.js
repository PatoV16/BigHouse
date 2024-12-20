import React, { useEffect, useState } from 'react';
import './DoctorDashboardStyle.css'; // Asegúrate de importar el archivo CSS
import RegistrarFichaMedica from './RegisterNewFicha'; // Importa el formulario de la ficha médica
import { getPacientes } from '../../../server/pacienteService'; // Importa el servicio de pacientes

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('verFichasMedicas'); // Por defecto muestra los pacientes
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPacienteId, setSelectedPacienteId] = useState(null); // ID del paciente seleccionado
  const idEmpleado = 123; // Este valor puede venir del contexto o autenticación

  useEffect(() => {
    // Carga la lista de pacientes al iniciar
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

    fetchPacientes();
  }, []);

  const handleSectionChange = (section, pacienteId = null) => {
    setActiveSection(section);
    if (pacienteId) setSelectedPacienteId(pacienteId);
  };

  const handleLogout = () => {
    console.log('Logout');
    // Redirigir a la página de login o realizar el cierre de sesión
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Dashboard Médico</h2>
        <ul className="sidebar-menu">
          <li onClick={() => handleSectionChange('avisos')}>Avisos</li>
          <li onClick={() => handleSectionChange('verFichasMedicas')}>Ver Fichas Médicas</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="main-content">
        {activeSection === 'verFichasMedicas' && (
          <div className="ver-fichas-medicas-section">
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
                        <button onClick={() => handleSectionChange('registrarFicha', paciente.id_paciente)}>
                          Generar ficha médica
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

        {activeSection === 'avisos' && (
          <div className="avisos-section">
            <h3>Avisos</h3>
            <div className="avisos-list">
              <div className="aviso">
                <h4>Aviso 1</h4>
                <p>Recordatorio: Actualiza tus datos de paciente.</p>
              </div>
              <div className="aviso">
                <h4>Aviso 2</h4>
                <p>Nuevo paciente agregado. Revisa la ficha médica.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'registrarFicha' && selectedPacienteId && (
          <div className="registrar-ficha-section">
            <h3>Registrar Nueva Ficha Médica</h3>
            <RegistrarFichaMedica idPaciente={selectedPacienteId} idEmpleado={idEmpleado} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
