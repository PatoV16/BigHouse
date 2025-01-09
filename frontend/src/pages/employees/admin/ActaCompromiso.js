import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Importa useParams
import './ActaCompromisoStyle.css';
import { useNavigate } from 'react-router-dom';

const ActaCompromisoComponent = () => {
  const { idPaciente } = useParams();  // Obtén el idPaciente de los parámetros de la URL
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Aquí puedes usar idPaciente si lo necesitas, ya que se obtiene de la URL
  }, [idPaciente]);

  const onSubmit = async (data) => {
    try {
      const actaData = {
        ...data,
        id_paciente: idPaciente,  // Usar idPaciente de los parámetros de la URL
      };

      // Enviar los datos del acta de compromiso al backend
      await axios.post('http://localhost:3000/actacompromiso', actaData);
      alert('Acta de compromiso guardada con éxito');
      navigate(`/DashboardAdmin`);
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('Hubo un error al guardar el acta de compromiso.');
      }
    }
  };

  return (
    <div className="acta-compromiso-container">
      <h2>Crear Acta de Compromiso</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        {/* Información del paciente */}
        <div className="form-group">
          <label htmlFor="nombreCompleto">Nombre Completo del Familiar</label>
          <input
            type="text"
            id="nombreCompleto"
            {...register('nombreCompleto', { required: 'El nombre completo es obligatorio', minLength: 3 })}
            className="form-input"
            placeholder="Ingrese el nombre completo"
          />
          {errors.nombreCompleto && <p className="error">{errors.nombreCompleto.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="cedulaIdentidad">Cédula de Identidad</label>
          <input
            type="text"
            id="cedulaIdentidad"
            {...register('cedulaIdentidad', { required: 'La cédula de identidad es obligatoria', pattern: /^\d{10}$/ })}
            className="form-input"
            placeholder="Ingrese la cédula de identidad"
          />
          {errors.cedulaIdentidad && <p className="error">{errors.cedulaIdentidad.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            {...register('telefono', { required: 'El teléfono es obligatorio', pattern: /^\d{7,10}$/ })}
            className="form-input"
            placeholder="Ingrese el teléfono"
          />
          {errors.telefono && <p className="error">{errors.telefono.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <textarea
            id="direccion"
            {...register('direccion', { required: 'La dirección es obligatoria' })}
            className="form-input"
            placeholder="Ingrese la dirección"
          />
          {errors.direccion && <p className="error">{errors.direccion.message}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Guardar Acta de Compromiso
        </button>
      </form>
    </div>
  );
};

export default ActaCompromisoComponent;
