import React, { useState } from 'react';
import './DoctorDashboardStyle.css'; // Asegúrate de importar el archivo CSS
import RegistrarFichaMedica from './RegisterNewFicha';// Importa el formulario de la ficha médica

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('avisos');
  
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Dashboard Médico</h2>
        <ul className="sidebar-menu">
          <li onClick={() => handleSectionChange('avisos')}>Avisos</li>
          <li onClick={() => handleSectionChange('registrarFicha')}>Registrar Ficha</li>
          <li onClick={() => handleSectionChange('editarUsuario')}>Editar Usuario</li>
        </ul>
      </div>

      <div className="main-content">
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

        {activeSection === 'registrarFicha' && (
          <div className="registrar-ficha-section">
            <h3>Registrar Nueva Ficha Médica</h3>
            <RegistrarFichaMedica /> {/* Aquí integras el formulario de ficha médica */}
          </div>
        )}

        {activeSection === 'editarUsuario' && (
          <div className="editar-usuario-section">
            <h3>Editar Datos del Usuario</h3>
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

export default DoctorDashboard;
