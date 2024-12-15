import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './GerontologicalDashboardStyle.css'; // Archivo CSS para estilos específicos
import BarthelScale from './BarthelScale'; // Componente Escala de Barthel
import Ficha2 from './LawtonBrodyTest'; // Componente Ficha 2 (supuesto)
import Ficha3 from './MinimentalTest'; // Componente Ficha 3 (supuesto)

const GerontologicalDashboard = () => {
  const [activeSection, setActiveSection] = useState('avisos');
  const [activeFicha, setActiveFicha] = useState('barthel'); // Sección activa de la ficha
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleFichaChange = (ficha) => {
    setActiveFicha(ficha); // Cambia entre las fichas
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de logout, como eliminar el token y redirigir
    console.log('Logout');
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Dashboard Gerontológico</h2>
        <ul className="sidebar-menu">
          <li 
            className={activeSection === 'avisos' ? 'active' : ''} 
            onClick={() => handleSectionChange('avisos')}
          >
            Avisos
          </li>
          <li 
            className={activeSection === 'registrarFicha' ? 'active' : ''} 
            onClick={() => handleSectionChange('registrarFicha')}
          >
            Registrar Ficha
          </li>
          <li 
            className={activeSection === 'editarUsuario' ? 'active' : ''} 
            onClick={() => handleSectionChange('editarUsuario')}
          >
            Editar Perfil
          </li>
          <li 
            className={activeSection === 'verFichasSociales' ? 'active' : ''} 
            onClick={() => handleSectionChange('verFichasSociales')}
          >
            Ver Fichas Psicológicas {/* Nuevo botón */}
          </li>
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
                <p>Recordatorio: Actualiza los datos de los pacientes.</p>
              </div>
              <div className="aviso">
                <h4>Aviso 2</h4>
                <p>Nuevo paciente registrado. Verifica su ficha médica.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'registrarFicha' && (
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

            {activeFicha === 'barthel' && <BarthelScale />}
            {activeFicha === 'ficha2' && <Ficha2 />}
            {activeFicha === 'ficha3' && <Ficha3 />}
          </div>
        )}

        {activeSection === 'verFichasSociales' && (
          <div className="ver-fichas-sociales-section">
            <h3>Ver Fichas Sociales</h3>
            {/* Aquí puedes incluir la lógica para mostrar las fichas sociales */}
            <p>Listado de fichas sociales de pacientes</p>
          </div>
        )}

        {activeSection === 'editarUsuario' && (
          <div className="editar-usuario-section">
            <h3>Editar Perfil</h3>
            <form>
              <div className="form-group">
                <label htmlFor="nombreUsuario">Nombre Completo</label>
                <input type="text" id="nombreUsuario" className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="correoUsuario">Correo Electrónico</label>
                <input type="email" id="correoUsuario" className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="telefonoUsuario">Teléfono</label>
                <input type="text" id="telefonoUsuario" className="input-field" />
              </div>
              <button type="submit" className="submit-btn">Guardar Cambios</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GerontologicalDashboard;
