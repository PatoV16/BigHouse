import React, { useState, useEffect } from 'react';  // Importa useEffect
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './GerontologicalDashboardStyle.css'; // Archivo CSS para estilos específicos
import BarthelScale from './BarthelScale'; // Componente Escala de Barthel
import Ficha2 from './LawtonBrodyTest'; // Componente Ficha 2 (supuesto)
import Ficha3 from './MinimentalTest'; // Componente Ficha 3 (supuesto)
import { getPacientes } from '../../../server/pacienteService'; // Importa el servicio de pacientes

const GerontologicalDashboard = () => {
  const [activeSection, setActiveSection] = useState('verPacientes'); // Sección activa
  const [activeFicha, setActiveFicha] = useState('barthel'); // Sección activa de la ficha
  const [pacientes, setPacientes] = useState([]); // Lista de pacientes
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Error al cargar pacientes
  const [selectedPacienteId, setSelectedPacienteId] = useState(null); // ID del paciente seleccionado
  const navigate = useNavigate(); // Inicializa useNavigate

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

  // Llamar a fetchPacientes cuando el componente se monte
  useEffect(() => {
    fetchPacientes();
  }, []); // El segundo parámetro vacío asegura que se ejecute solo una vez al montar el componente

  // Cambiar la sección activa
  const handleSectionChange = (section, pacienteId = null) => {
    setActiveSection(section);
    if (pacienteId) setSelectedPacienteId(pacienteId);
  };

  // Cambiar la ficha activa
  const handleFichaChange = (ficha) => {
    setActiveFicha(ficha);
  };

  // Cerrar sesión
  const handleLogout = () => {
    console.log('Logout');
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Psicólogo</h2>
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
                        <button onClick={() => handleSectionChange('registrarFicha', paciente.id_paciente)}>
                          Generar ficha
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

        {activeSection === 'registrarFicha' && selectedPacienteId && (
          <div className="registrar-ficha-section">
            <h3>Registrar Nueva Ficha Médica</h3>
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
      </div>
    </div>
  );
};

export default GerontologicalDashboard;
