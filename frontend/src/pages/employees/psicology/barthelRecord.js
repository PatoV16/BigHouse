import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './verBarthel.css';
import { useNavigate } from 'react-router-dom';


const BarthelRecord = () => {
  const { idPaciente } = useParams();
  const [barthelData, setBarthelData] = useState(null);
  const [pacienteData, setPacienteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [barthelResponse, pacienteResponse] = await Promise.all([
          axios.get(`http://localhost:3000/barthel/paciente/${idPaciente}`),
          axios.get(`http://localhost:3000/pacientes/${idPaciente}`),
        ]);

        setBarthelData(barthelResponse.data);
        setPacienteData(pacienteResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    if (idPaciente) {
      fetchData();
    }
  }, [idPaciente]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!barthelData || !pacienteData) return <div>No se encontraron datos</div>;

  return (
    <div className="medical-record">
        <button className="home-button" onClick={() => navigate('/DashboardPsicology')}>Home</button>
      <div className="header">
        <h1>Registro de Índice de Barthel</h1>
      </div>

      <div className="patient-info">
        <div className="patient-info-grid">
          <div className="info-item">
            <span className="info-label">Nombre:</span> {pacienteData.nombre}
          </div>
          <div className="info-item">
            <span className="info-label">Apellido:</span> {pacienteData.apellido}
          </div>
          <div className="info-item">
            <span className="info-label">Fecha de Nacimiento:</span> {pacienteData.fecha_nacimiento}
          </div>
          <div className="info-item">
            <span className="info-label">Estado Civil:</span> {pacienteData.estado_civil}
          </div>
          <div className="info-item">
            <span className="info-label">Teléfono:</span> {pacienteData.telefono}
          </div>
          <div className="info-item">
            <span className="info-label">Dirección:</span> {pacienteData.direccion}
          </div>
        </div>
      </div>

      <div className="evaluation-section">
        <div className="evaluation-grid">
          <div className="evaluation-item">
            <span>Comer:</span> <span>{barthelData.comer}</span>
          </div>
          <div className="evaluation-item">
            <span>Traslado:</span> <span>{barthelData.traslado}</span>
          </div>
          <div className="evaluation-item">
            <span>Aseo Personal:</span> <span>{barthelData.aseo_personal}</span>
          </div>
          <div className="evaluation-item">
            <span>Uso Retrete:</span> <span>{barthelData.uso_retrete}</span>
          </div>
          <div className="evaluation-item">
            <span>Bañarse:</span> <span>{barthelData.bañarse}</span>
          </div>
          <div className="evaluation-item">
            <span>Desplazarse:</span> <span>{barthelData.desplazarse}</span>
          </div>
          <div className="evaluation-item">
            <span>Subir Escaleras:</span> <span>{barthelData.subir_escaleras}</span>
          </div>
          <div className="evaluation-item">
            <span>Vestirse:</span> <span>{barthelData.vestirse}</span>
          </div>
          <div className="evaluation-item">
            <span>Control de Heces:</span> <span>{barthelData.control_heces}</span>
          </div>
          <div className="evaluation-item">
            <span>Control de Orina:</span> <span>{barthelData.control_orina}</span>
          </div>
        </div>

        <div className="total-score">
          Puntaje Total: {barthelData.puntaje_total}
        </div>
      </div>

      <div className="interpretation">
        <h3>Interpretación</h3>
        <ul className="interpretation-list">
          <li>0 - 20: Dependencia Total</li>
          <li>21 - 60: Dependencia Severa</li>
          <li>61 - 90: Dependencia Moderada</li>
          <li>91 - 99: Dependencia Escasa</li>
          <li>100: Independencia</li>
        </ul>
      </div>
    </div>
  );
};

export default BarthelRecord;
