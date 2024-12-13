import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './DashboardSocialWorkerStyle.css'; // Asegúrate de importar el archivo CSS

const DashboardTrabajadorSocial = () => {
  const [activeSection, setActiveSection] = useState('avisos');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleRegistrarFicha = () => {
    navigate('/RegistrarFichaSocial'); // Navega a la página de registro de ficha social
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de logout, por ejemplo, eliminando el token y redirigiendo
    console.log('Logout');
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Dashboard Trabajador Social</h2>
        <ul className="sidebar-menu">
          <li onClick={() => handleSectionChange('avisos')}>Avisos</li>
          <li onClick={handleRegistrarFicha}>Registrar Nueva Ficha</li>
          <li onClick={() => handleSectionChange('verFichasSociales')}>Ver Fichas Sociales</li> {/* Nuevo botón */}
          <li onClick={() => handleSectionChange('editarPerfil')}>Editar Perfil</li>
          <li onClick={handleLogout}>Logout</li> {/* Nuevo botón */}
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

        {activeSection === 'registrarFicha' && (
          <div className="registrar-ficha-section">
            <h3>Registrar Nueva Ficha</h3>
            <form>
              <div className="form-group">
                <label htmlFor="nombrePaciente">Nombre del Paciente</label>
                <input type="text" id="nombrePaciente" />
              </div>
              <div className="form-group">
                <label htmlFor="edadPaciente">Edad</label>
                <input type="number" id="edadPaciente" />
              </div>
              <div className="form-group">
                <label htmlFor="diagnostico">Diagnóstico</label>
                <textarea id="diagnostico"></textarea>
              </div>
              <button type="submit" className="submit-btn">Registrar Ficha</button>
            </form>
          </div>
        )}

        {activeSection === 'verFichasSociales' && (
          <div className="ver-fichas-sociales-section">
            <h3>Ver Fichas Sociales</h3>
            {/* Aquí puedes incluir la lógica para mostrar las fichas sociales, como un listado o un componente para visualizarlas */}
            <p>Listado de fichas sociales de pacientes</p>
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
