import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './verLawtonBrody.css';
import { useNavigate } from 'react-router-dom';

const LawtonBrodyRecord = () => {
  const { idPaciente } = useParams();
  const [lawtonBrodyData, setLawtonBrodyData] = useState(null);
  const [pacienteData, setPacienteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lawtonBrodyResponse, pacienteResponse] = await Promise.all([
          axios.get(`http://localhost:3000/lawton-brody/paciente/${idPaciente}`),
          axios.get(`http://localhost:3000/pacientes/${idPaciente}`),
        ]);

        setLawtonBrodyData(lawtonBrodyResponse.data);
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
  if (!lawtonBrodyData || !pacienteData) return <div>No se encontraron datos</div>;

  return (
    <div className="medical-record">
        <button className="home-button" onClick={() => navigate('/DashboardPsicology')}>Home</button>
      <div className="header">
        <h1>Registro de Índice de Lawton & Brody</h1>
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
            <span>Uso de Teléfono:</span> <span>{lawtonBrodyData.uso_telefono}</span>
          </div>
          <div className="evaluation-item">
            <span>Hacer Compras:</span> <span>{lawtonBrodyData.hacer_compras}</span>
          </div>
          <div className="evaluation-item">
            <span>Preparar Comida:</span> <span>{lawtonBrodyData.preparar_comida}</span>
          </div>
          <div className="evaluation-item">
            <span>Cuidado de Casa:</span> <span>{lawtonBrodyData.cuidado_casa}</span>
          </div>
          <div className="evaluation-item">
            <span>Lavado de Ropa:</span> <span>{lawtonBrodyData.lavado_ropa}</span>
          </div>
          <div className="evaluation-item">
            <span>Uso de Transporte:</span> <span>{lawtonBrodyData.uso_transporte}</span>
          </div>
          <div className="evaluation-item">
            <span>Responsabilidad con Medicación:</span> <span>{lawtonBrodyData.responsabilidad_medicacion}</span>
          </div>
          <div className="evaluation-item">
            <span>Capacidad de Manejo de Dinero:</span> <span>{lawtonBrodyData.capacidad_dinero}</span>
          </div>
        </div>

        <div className="total-score">
          Puntaje Total: {lawtonBrodyData.puntaje_total}
        </div>
      </div>

      <div className="interpretation">
        <h3>Interpretación</h3>
        <div>
          <h4>En Mujeres (8 funciones):</h4>
          <ul>
            <li>Dependencia total: 0-1</li>
            <li>Dependencia grave: 2-3</li>
            <li>Dependencia moderada: 4-5</li>
            <li>Dependencia ligera: 6-7</li>
            <li>Autónoma: 8</li>
          </ul>
        </div>
        <div>
          <h4>En Hombres (5 funciones):</h4>
          <ul>
            <li>Dependencia total: 0</li>
            <li>Dependencia grave: 1</li>
            <li>Dependencia moderada: 2-3</li>
            <li>Dependencia ligera: 4</li>
            <li>Autónomo: 5</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LawtonBrodyRecord;
