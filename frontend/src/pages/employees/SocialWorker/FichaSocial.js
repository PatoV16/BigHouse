import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './fichaSocial.css';

const FichaSocial = () => {
  const { idPaciente } = useParams();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    try {
      const [fichaResponse, pacienteResponse] = await Promise.all([
        axios.get(`http://localhost:3000/fichasocial/paciente/${idPaciente}`),
        axios.get(`http://localhost:3000/pacientes/${idPaciente}`)
      ]);

      setFicha(fichaResponse.data[0]);
      setPaciente(pacienteResponse.data);
    } catch (err) {
      console.error('Error al cargar los datos:', err);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [idPaciente]);

  useEffect(() => {
    if (idPaciente) {
      fetchData();
    }
  }, [idPaciente, fetchData]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!paciente || !ficha) {
    return <div>No se encontraron datos.</div>;
  }

  return (
    <div className="scrollable-container">
      <button
  onClick={() => {
    window.scrollTo(0, 0); // Asegura que todo esté visible antes de imprimir
    setTimeout(() => window.print(), 500); // Retrasa la impresión para permitir el render
  }}
  className="print-button"
>
  Imprimir Ficha
</button>

<button className="home-button" onClick={() => navigate('/DashboardSocialWorker')}>Home</button>
    <div className="ficha-social">
      <div className="header">
        <h1>Ficha Social de Paciente</h1>
      </div>

      <div className="patient-info">
        <div className="info-grid">
          <div className="info-item">
            <span>Nombre:</span> {paciente.nombre} {paciente.apellido}
          </div>
          <div className="info-item">
            <span>Fecha de Nacimiento:</span> {paciente.fecha_nacimiento}
          </div>
          <div className="info-item">
            <span>Estado Civil:</span> {paciente.estado_civil}
          </div>
          <div className="info-item">
            <span>Teléfono:</span> {paciente.telefono || 'No especificado'}
          </div>
          <div className="info-item">
            <span>Dirección:</span> {paciente.direccion || 'No especificado'}
          </div>
        </div>
      </div>

      <div className="evaluation-section">
        <h3>Situación Familiar y de Convivencia</h3>
        <div className="evaluation-grid">
          <div className="evaluation-item">
            <span>Ocupación en el tiempo libre:</span> {ficha.actividades_tiempo_libre || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Pertenece a una asociación:</span> {ficha.pertenece_asociacion ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Nombre de la organización:</span> {ficha.nombre_organizacion || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Frecuencia con la que acude a la asociación:</span> {ficha.frecuencia_acude_asociacion || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Actividad en la asociación:</span> {ficha.actividad_asociacion || 'No especificado'}
          </div>
        </div>

        <h3>Situación Económica</h3>
        <div className="evaluation-grid">
          <div className="evaluation-item">
            <span>Recibe pensión:</span> {ficha.recibe_pension ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Tipo de pensión:</span> {ficha.tipo_pension || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Otros ingresos:</span> {ficha.tiene_otros_ingresos ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Monto de otros ingresos:</span> {ficha.monto_otros_ingresos || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Fuente de los ingresos:</span> {ficha.fuente_ingresos || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Quién cobra los ingresos:</span> {ficha.quien_cobra_ingresos || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Destino de los recursos:</span> {ficha.destino_recursos || 'No especificado'}
          </div>
        </div>

        <h3>Vivienda</h3>
        <div className="evaluation-grid">
          <div className="evaluation-item">
            <span>Tipo de vivienda:</span> {ficha.tipo_vivienda || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Acceso a la vivienda:</span> {ficha.acceso_vivienda || 'No especificado'}
          </div>
        </div>

        <h3>Nutrición</h3>
        <div className="evaluation-grid">
          <div className="evaluation-item">
            <span>Se alimenta bien:</span> {ficha.se_alimenta_bien ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Número de comidas diarias:</span> {ficha.numero_comidas_diarias || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Especificar comidas:</span> {ficha.especificar_comidas || 'No especificado'}
          </div>
        </div>

        <h3>Salud</h3>
        <div className="evaluation-grid">
          <div className="evaluation-item">
            <span>Estado de salud:</span> {ficha.estado_salud || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Enfermedad catastrófica:</span> {ficha.enfermedad_catastrofica ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Especificar enfermedad:</span> {ficha.especificar_enfermedad || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Discapacidad:</span> {ficha.discapacidad ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Toma medicamento constante:</span> {ficha.toma_medicamento_constante ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Especificar medicamento:</span> {ficha.especificar_medicamento || 'No especificado'}
          </div>
          <div className="evaluation-item">
            <span>Utiliza ayuda técnica:</span> {ficha.utiliza_ayuda_tecnica ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Especificar ayuda técnica:</span> {ficha.especificar_ayuda_tecnica || 'No especificado'}
          </div>
        </div>

        <h3>Servicios deseados</h3>
        <div className="evaluation-grid">
          <div className="evaluation-item">
            <span>Desea servicio residencial:</span> {ficha.desea_servicio_residencial ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Desea servicio diurno:</span> {ficha.desea_servicio_diurno ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Desea espacios de socialización:</span> {ficha.desea_espacios_socializacion ? 'Sí' : 'No'}
          </div>
          <div className="evaluation-item">
            <span>Desea atención domiciliaria:</span> {ficha.desea_atencion_domiciliaria ? 'Sí' : 'No'}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FichaSocial;
