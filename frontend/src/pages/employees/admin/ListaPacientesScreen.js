import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import { getPacientes } from '../../../server/pacienteService';
import './ListaPacientesStyle.css';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Usa el hook useNavigate para redirigir

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientes();
        setPacientes(data);
      } catch (err) {
        setError('Error al cargar los pacientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  if (loading) {
    return <div>Cargando pacientes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleNavigation = (idPaciente) => {
    navigate(`/ActaCompromiso/${idPaciente}`);  // Redirige a la ruta con el id del paciente
  };
  const handleNavigationScrren = (idPaciente) => {
    navigate(`/ActaCompromisoScreen/${idPaciente}`);  // Redirige a la ruta con el id del paciente
  };

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      {pacientes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.edad}</td>
                <td>
                  <button onClick={() => handleNavigationScrren(paciente.id_paciente)}>
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No hay pacientes disponibles.</div>
      )}
    </div>
  );
};

export default PacientesList;
