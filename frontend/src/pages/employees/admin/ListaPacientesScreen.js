import React, { useEffect, useState } from 'react';
import { getPacientes } from '../../../server/pacienteService';
import './ListaPacientesStyle.css';
// Asegúrate de que la ruta del archivo sea correcta

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                  <button onClick={() => alert(`Ver paciente ${paciente.id}`)}>
                    Ver
                  </button>
                  <button onClick={() => alert(`Editar paciente ${paciente.id}`)}>
                    Editar
                  </button>
                  <button onClick={() => alert(`Eliminar paciente ${paciente.id}`)}>
                    Eliminar
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
