import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './RegistrarFichaSocialStyle.css'; // Asegúrate de importar el archivo CSS

const RegistrarFichaSocial = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      // Aquí puedes hacer la llamada a tu API para guardar la Ficha Social
      // const response = await axios.post('/api/fichas-sociales', data);
      alert('Ficha Social registrada con éxito');
    } catch (err) {
      setError('Hubo un error al registrar la ficha social.');
    }
  };

  return (
    <div className="ficha-social-container">
      <h2>Registrar Ficha Social</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        
        <div className="form-group">
          <label htmlFor="situacionLaboral">Situación Laboral</label>
          <select
            id="situacionLaboral"
            {...register('situacion_laboral', { required: 'La situación laboral es obligatoria' })}
            className="form-input"
          >
            <option value="Completa">Completa</option>
            <option value="Incompleta">Incompleta</option>
            <option value="No sabe leer/escribir">No sabe leer/escribir</option>
          </select>
          {errors.situacion_laboral && <p className="error">{errors.situacion_laboral.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="redApoyo">Red de Apoyo</label>
          <textarea
            id="redApoyo"
            {...register('red_apoyo', { required: 'La red de apoyo es obligatoria' })}
            className="form-input"
          />
          {errors.red_apoyo && <p className="error">{errors.red_apoyo.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="ingresos">Ingresos</label>
          <textarea
            id="ingresos"
            {...register('ingresos', { required: 'Los ingresos son obligatorios' })}
            className="form-input"
          />
          {errors.ingresos && <p className="error">{errors.ingresos.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="vivienda">Vivienda</label>
          <select
            id="vivienda"
            {...register('vivienda', { required: 'La situación de vivienda es obligatoria' })}
            className="form-input"
          >
            <option value="Propia">Propia</option>
            <option value="Alquilada">Alquilada</option>
            <option value="Prestada">Prestada</option>
            <option value="Otra">Otra</option>
          </select>
          {errors.vivienda && <p className="error">{errors.vivienda.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="nutricion">Nutrición</label>
          <textarea
            id="nutricion"
            {...register('nutricion', { required: 'Los datos sobre nutrición son obligatorios' })}
            className="form-input"
          />
          {errors.nutricion && <p className="error">{errors.nutricion.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="servicioDeseado">Servicio Deseado</label>
          <select
            id="servicioDeseado"
            {...register('servicio_deseado', { required: 'El servicio deseado es obligatorio' })}
            className="form-input"
          >
            <option value="Residencial">Residencial</option>
            <option value="Diurno">Diurno</option>
            <option value="Socialización">Socialización</option>
            <option value="Atención Domiciliaria">Atención Domiciliaria</option>
          </select>
          {errors.servicio_deseado && <p className="error">{errors.servicio_deseado.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="situacionEconomica">Situación Económica</label>
          <textarea
            id="situacionEconomica"
            {...register('situacion_economica', { required: 'La situación económica es obligatoria' })}
            className="form-input"
          />
          {errors.situacion_economica && <p className="error">{errors.situacion_economica.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="enfermedades">Enfermedades</label>
          <textarea
            id="enfermedades"
            {...register('enfermedades', { required: 'Las enfermedades son obligatorias' })}
            className="form-input"
          />
          {errors.enfermedades && <p className="error">{errors.enfermedades.message}</p>}
        </div>

        <button type="submit" className="submit-btn">Registrar Ficha Social</button>
      </form>
    </div>
  );
};

export default RegistrarFichaSocial;
