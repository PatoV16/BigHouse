import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MenuPaciente.css';

const MenuPsicologo = () => {
  const { idPaciente } = useParams();  // Obtener el id_paciente desde la URL si es necesario
  const navigate = useNavigate();  // Hook para navegación programática

  const handleNavigation = (route) => {
    navigate(route);  // Redirigir al usuario a la ruta deseada
  };

  return (
    <div className="menu-container">
      <h1>Menú de Evaluaciones</h1>
      <div className="menu-options">
        <ul>
          <li>
            <button onClick={() => handleNavigation(`/BarthelRecord/${idPaciente}`)}>
              Barthel
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation(`/LawtonBrodyRecord/${idPaciente}`)}>
              Lawton & Brody
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation(`/MiniExamenRecord/${idPaciente}`)}>
              Mini Examen
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuPsicologo;
