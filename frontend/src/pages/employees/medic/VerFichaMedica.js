import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPrint } from 'react-icons/fa';
import './verFichaMedica.css';

const FichaMedicaPaciente = () => {
  const { idPaciente } = useParams(); // Obtén el parámetro de la URL
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null); // Datos del paciente
  const [fichasMedicas, setFichasMedicas] = useState([]); // Datos de las fichas médicas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/pacientes/${idPaciente}`);
        setPaciente(response.data); // Guardar los datos del paciente
      } catch (err) {
        console.error('Error al obtener los datos del paciente:', err);
        setError('Error al cargar los datos del paciente.');
      }
    };

    const fetchFichasMedicas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/fichas-medicas/paciente/${idPaciente}`);
        if (response.data.length === 0) {
          navigate(`/RegistrarFichaMedica?idPaciente=${idPaciente}`);
        } else {
          setFichasMedicas(response.data);
        }
      } catch (err) {
        console.error('Error al obtener las fichas médicas:', err);
        setError('Error al cargar las fichas médicas.');
      } finally {
        setLoading(false);
      }
    };

    if (idPaciente) {
      fetchPaciente();
      fetchFichasMedicas();
    }
  }, [idPaciente, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div>Cargando fichas médicas...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="fichas-medicas-container">
      
      <div className="fichas-medicas-header">
        <button className="home-button" onClick={() => navigate('/DashboardMedicScreen')}>Home</button>
        <button className="print-button" onClick={handlePrint}>
          <FaPrint /> Imprimir
        </button>
      </div>

      {/* Datos del Paciente */}
      {paciente && (
        <div className="datos-paciente">
          <h3 className="ficha-title">Ficha de Información General - Adultos Mayores</h3>

          <section className="ficha-section">
            <h4 className="section-title">1. Datos de Identificación Personal del Usuario</h4>
            <table>
              <tbody>
                <tr>
                  <th>Apellidos y Nombres</th>
                  <td>{`${paciente.nombre} ${paciente.apellido}`}</td>
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
      )}

      {/* Fichas Médicas */}
      {fichasMedicas.map((ficha) => (
        <div key={ficha.id_ficha_medica} className="ficha-medica">
          <section className="ficha-section">
            <h4 className="section-title">2. Condiciones al Ingreso</h4>
            <table>
              <tbody>
                <tr>
                  <th>Condición Física</th>
                  <td>{ficha.condicion_fisica}</td>
                </tr>
                <tr>
                  <th>Condición Psicológica</th>
                  <td>{ficha.condicion_psicologica}</td>
                </tr>
                <tr>
                  <th>Estado de Salud</th>
                  <td>{ficha.estado_salud}</td>
                </tr>
                <tr>
                  <th>Medicamentos</th>
                  <td>{ficha.medicamentos}</td>
                </tr>
                <tr>
                  <th>Intolerancia a Medicamentos</th>
                  <td>{ficha.intolerancia_medicamentos}</td>
                </tr>
                <tr>
                  <th>Referido por</th>
                  <td>{ficha.referido_por}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Situación Familiar */}
          <section className="ficha-section">
            <h4 className="section-title">3. Situación Familiar y de Convivencia</h4>
            <table>
              <tbody>
                <tr>
                  <th>¿Con quién vive?</th>
                  <td>{ficha.vive_con}</td>
                </tr>
                <tr>
                  <th>Calidad de las Relaciones</th>
                  <td>{ficha.calidad_relaciones}</td>
                </tr>
                <tr>
                  <th>Observaciones</th>
                  <td>{ficha.observaciones}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Firmas */}
          <section className="ficha-section">
            <h4 className="section-title">Responsable</h4>
            <p>Nombre: {ficha.idEmpleado}</p>
            <p>Firma: ______________________</p>
          </section>
        </div>
      ))}
    </div>
  );
};

export default FichaMedicaPaciente;
