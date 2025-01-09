import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPrint } from 'react-icons/fa';
import './verRegistros.css';

const VerRegistros = () => {
  const { idPaciente } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);
  const [miniExamen, setMiniExamen] = useState(null);
  const [lawtonBrody, setLawtonBrody] = useState(null);
  const [barthel, setBarthel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const [pacienteRes, miniExamenRes, lawtonBrodyRes, barthelRes] = await Promise.all([
          axios.get(`http://localhost:3000/pacientes/${idPaciente}`),
          axios.get(`http://localhost:3000/mini-examen/paciente/${idPaciente}`),
          axios.get(`http://localhost:3000/lawton-brody/paciente/${idPaciente}`),
          axios.get(`http://localhost:3000/barthel/paciente/${idPaciente}`),
        ]);
  
        console.log('Paciente data:', pacienteRes.data);  // Verificar la respuesta
        console.log('MiniExamen data:', miniExamenRes.data);
        console.log('LawtonBrody data:', lawtonBrodyRes.data);
        console.log('Barthel data:', barthelRes.data);
  
        setPaciente(pacienteRes.data);
        setMiniExamen(miniExamenRes.data || {});
        setLawtonBrody(lawtonBrodyRes.data || {});
        setBarthel(barthelRes.data || {});
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };
  
    if (idPaciente) fetchData();
  }, [idPaciente]);
  

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="error-container">
        <div className="error-message">No se encontraron datos del paciente</div>
      </div>
    );
  }

  return (
    <div className="registros-container">
      <div className="registros-header">
        <button className="home-button" onClick={() => navigate('/DashboardMedicScreen')}>Home</button>
        <button className="print-button" onClick={handlePrint}>
          <FaPrint /> Imprimir
        </button>
      </div>

      {/* Datos del Paciente */}
      <div className="datos-paciente">
        <h3 className="registros-title">Ficha de Información General - Adultos Mayores</h3>
        <section className="registros-section">
          <h4 className="section-title">1. Datos de Identificación Personal del Usuario</h4>
          <table>
            <tbody>
              <tr>
                <th>Apellidos y Nombres</th>
                <td>{`${paciente.nombre || ''} ${paciente.apellido || ''}`}</td>
                <th>Expediente N°</th>
                <td>{paciente.id_paciente}</td>
              </tr>
              <tr>
                <th>Fecha de Ingreso</th>
                <td>{paciente.fecha_ingreso}</td>
                <th>Fecha de Nacimiento</th>
                <td>{paciente.fecha_nacimiento}</td>
              </tr>
              <tr>
                <th>Estado Civil</th>
                <td>{paciente.estado_civil}</td>
                <th>Nivel de Instrucción</th>
                <td>{paciente.nivel_instruccion}</td>
              </tr>
              <tr>
                <th>Profesión/Ocupación</th>
                <td>{paciente.profesion_ocupacion}</td>
                <th>Teléfono</th>
                <td>{paciente.telefono}</td>
              </tr>
              <tr>
                <th>Dirección</th>
                <td colSpan="3">{paciente.direccion}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      {/* MiniExamen */}
      {miniExamen && Object.keys(miniExamen).length > 0 && (
        <div className="registro">
          <h4 className="section-title">2. MiniExamen Mental</h4>
          <table>
            <tbody>
              <tr>
                <th>Orientación Tiempo</th>
                <td>{miniExamen.orientacion_tiempo}</td>
                <th>Orientación Espacio</th>
                <td>{miniExamen.orientacion_espacio}</td>
              </tr>
              <tr>
                <th>Memoria</th>
                <td>{miniExamen.memoria}</td>
                <th>Atención y Cálculo</th>
                <td>{miniExamen.atencion_calculo}</td>
              </tr>
              <tr>
                <th>Memoria Diferida</th>
                <td>{miniExamen.memoria_diferida}</td>
                <th>Denominación</th>
                <td>{miniExamen.denominacion}</td>
              </tr>
              <tr>
                <th>Repetición de Frase</th>
                <td>{miniExamen.repeticion_frase}</td>
                <th>Comprensión y Ejecución</th>
                <td>{miniExamen.comprension_ejecucion}</td>
              </tr>
              <tr>
                <th>Lectura</th>
                <td>{miniExamen.lectura}</td>
                <th>Escritura</th>
                <td>{miniExamen.escritura}</td>
              </tr>
              <tr>
                <th>Copia de Dibujo</th>
                <td>{miniExamen.copia_dibujo}</td>
                <th>Puntaje Total</th>
                <td>{miniExamen.puntaje_total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* LawtonBrody */}
      {lawtonBrody && Object.keys(lawtonBrody).length > 0 && (
        <div className="registro">
          <h4 className="section-title">3. Escala de Lawton y Brody</h4>
          <table>
            <tbody>
              <tr>
                <th>Uso del Teléfono</th>
                <td>{lawtonBrody.uso_telefono}</td>
                <th>Hacer Compras</th>
                <td>{lawtonBrody.hacer_compras}</td>
              </tr>
              <tr>
                <th>Preparación de Comida</th>
                <td>{lawtonBrody.preparar_comida}</td>
                <th>Cuidado de Casa</th>
                <td>{lawtonBrody.cuidado_casa}</td>
              </tr>
              <tr>
                <th>Lavado de Ropa</th>
                <td>{lawtonBrody.lavado_ropa}</td>
                <th>Uso de Transporte</th>
                <td>{lawtonBrody.uso_transporte}</td>
              </tr>
              <tr>
                <th>Responsabilidad Medicación</th>
                <td>{lawtonBrody.responsabilidad_medicacion}</td>
                <th>Capacidad de Usar Dinero</th>
                <td>{lawtonBrody.capacidad_dinero}</td>
              </tr>
              <tr>
                <th>Puntaje Total</th>
                <td colSpan="3">{lawtonBrody.puntaje_total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Barthel */}
      {barthel && Object.keys(barthel).length > 0 && (
        <div className="registro">
          <h4 className="section-title">4. Índice de Barthel</h4>
          <table>
            <tbody>
              <tr>
                <th>Comer</th>
                <td>{barthel.comer}</td>
                <th>Traslado</th>
                <td>{barthel.traslado}</td>
              </tr>
              <tr>
                <th>Aseo Personal</th>
                <td>{barthel.aseo_personal}</td>
                <th>Uso del Retrete</th>
                <td>{barthel.uso_retrete}</td>
              </tr>
              <tr>
                <th>Bañarse</th>
                <td>{barthel.bañarse}</td>
                <th>Desplazarse</th>
                <td>{barthel.desplazarse}</td>
              </tr>
              <tr>
                <th>Subir Escaleras</th>
                <td>{barthel.subir_escaleras}</td>
                <th>Vestirse</th>
                <td>{barthel.vestirse}</td>
              </tr>
              <tr>
                <th>Control de Heces</th>
                  <td>{barthel.control_heces}</td>
                  <th>Control de Orina</th>
                  <td>{barthel.control_orina}</td>
                </tr>
                <tr>
                  <th>Puntaje Total</th>
                  <td colSpan="3">{barthel.puntaje_total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  export default VerRegistros;