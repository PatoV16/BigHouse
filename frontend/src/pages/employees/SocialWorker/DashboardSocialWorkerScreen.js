import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './DashboardSocialWorkerStyle.css'; // Asegúrate de importar el archivo CSS
import { getPacientes } from '../../../server/pacienteService'; // Servicio para obtener pacientes

const DashboardTrabajadorSocial = () => {
  const [activeSection, setActiveSection] = useState('avisos');
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPacienteId, setSelectedPacienteId] = useState(null);
  const navigate = useNavigate();

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
  }, []); // Llama a la función al montar el componente

  const handleSectionChange = (section, pacienteId = null) => {
    if (section === 'verFicha' && pacienteId) {
      navigate(`/FichaSocial/${pacienteId}`);
      return;
    }
    setActiveSection(section);
    setSelectedPacienteId(pacienteId);
  };


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_empleado');
    navigate('/LoginForm');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Dashboard Trabajador Social</h2>
        <ul className="sidebar-menu">
          <li onClick={() => handleSectionChange('avisos')}>Avisos</li>
          <li onClick={() => handleSectionChange('verFichasSociales')}>Ver Fichas Sociales</li>
          <li onClick={() => handleSectionChange('editarPerfil')}>Editar Perfil</li>
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
                <p>Recuerda actualizar los datos de los pacientes.</p>
              </div>
              <div className="aviso">
                <h4>Aviso 2</h4>
                <p>Nuevo paciente añadido, por favor revisa su ficha.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'verFichasSociales' && (
          <div className="ver-fichas-sociales-section">
            <h3>Listado de Fichas Sociales</h3>
            {loading ? (
              <p>Cargando fichas sociales...</p>
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
                          Ver ficha social
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

        {activeSection === 'editarPerfil' && (
          <div className="editar-perfil-section">
            <h3>Editar Perfil</h3>
            <form>
              <div className="form-group">
                <label htmlFor="nombreUsuario">Nombre Completo</label>
                <input type="text" id="nombreUsuario" />
              </div>
              <div className="form-group">
                <label htmlFor="correoUsuario">Correo Electrónico</label>
                <input type="email" id="correoUsuario" />
              </div>
              <div className="form-group">
                <label htmlFor="telefonoUsuario">Teléfono</label>
                <input type="text" id="telefonoUsuario" />
              </div>
              <button type="submit" className="submit-btn">Guardar Cambios</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTrabajadorSocial;
