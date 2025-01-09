import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './verMiniExamen.css';
import { useNavigate } from 'react-router-dom';

const MiniExamenRecord = () => {
  const { idPaciente } = useParams();
  const [miniExamenData, setMiniExamenData] = useState(null);
  const [pacienteData, setPacienteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [miniExamenResponse, pacienteResponse] = await Promise.all([
          axios.get(`http://localhost:3000/mini-examen/paciente/${idPaciente}`),
          axios.get(`http://localhost:3000/pacientes/${idPaciente}`),
        ]);

        setMiniExamenData(miniExamenResponse.data);
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
  if (!miniExamenData || !pacienteData) return <div>No se encontraron datos</div>;

  return (
    <div className="medical-record">
      <button className="home-button" onClick={() => navigate('/DashboardPsicology')}>Home</button>
      <div className="header">
        <h1>Registro de Mini Examen</h1>
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
            <span>Orientación Temporal:</span> <span>{miniExamenData.orientacion_tiempo}</span>
          </div>
          <div className="evaluation-item">
            <span>Orientación Espacial:</span> <span>{miniExamenData.orientacion_espacio}</span>
          </div>
          <div className="evaluation-item">
            <span>Memoria:</span> <span>{miniExamenData.memoria}</span>
          </div>
          <div className="evaluation-item">
            <span>Atención y Cálculo:</span> <span>{miniExamenData.atencion_calculo}</span>
          </div>
          <div className="evaluation-item">
            <span>Memoria Diferida:</span> <span>{miniExamenData.memoria_diferida}</span>
          </div>
          <div className="evaluation-item">
            <span>Denominación:</span> <span>{miniExamenData.denominacion}</span>
          </div>
          <div className="evaluation-item">
            <span>Repetición de Frase:</span> <span>{miniExamenData.repeticion_frase}</span>
          </div>
          <div className="evaluation-item">
            <span>Comprensión y Ejecución:</span> <span>{miniExamenData.comprension_ejecucion}</span>
          </div>
          <div className="evaluation-item">
            <span>Lectura:</span> <span>{miniExamenData.lectura}</span>
          </div>
          <div className="evaluation-item">
            <span>Escritura:</span> <span>{miniExamenData.escritura}</span>
          </div>
          <div className="evaluation-item">
            <span>Copia de Dibujo:</span> <span>{miniExamenData.copia_dibujo}</span>
          </div>
        </div>

        <div className="total-score">
          Puntaje Total: {miniExamenData.puntaje_total}
        </div>
      </div>

      <div className="interpretation">
        <h3>Interpretación</h3>
        <div>
          <h4>En Mujeres (8 funciones):</h4>
          <ul>
            <li>Dependencia total: 0-2</li>
            <li>Dependencia grave: 3-4</li>
            <li>Dependencia moderada: 5-6</li>
            <li>Dependencia ligera: 7</li>
            <li>Autónoma: 8</li>
          </ul>
        </div>
        <div>
          <h4>En Hombres (5 funciones):</h4>
          <ul>
            <li>Dependencia total: 0-1</li>
            <li>Dependencia grave: 2-3</li>
            <li>Dependencia moderada: 4</li>
            <li>Dependencia ligera: 5</li>
            <li>Autónomo: 6</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MiniExamenRecord;
