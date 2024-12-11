import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './RegisterFichaStyle.css'; // Asegúrate de importar el archivo CSS

const RegistrarFichaMedica = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      // Aquí realizarías la llamada a tu API para guardar la ficha médica en la base de datos
      // const response = await axios.post('/api/fichas-medicas', data);
      alert('Ficha Médica registrada con éxito');
    } catch (err) {
      setError('Hubo un error al registrar la ficha médica.');
    }
  };

  return (
    <div className="ficha-medica-container">
      <h2>Registrar Ficha Médica</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        
        <div className="form-group">
          <label htmlFor="condicionFisica">Condición Física</label>
          <textarea
            id="condicionFisica"
            {...register('condicion_fisica', { required: 'La condición física es obligatoria' })}
            className="form-input"
          />
          {errors.condicion_fisica && <p className="error">{errors.condicion_fisica.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="condicionPsicologica">Condición Psicológica</label>
          <textarea
            id="condicionPsicologica"
            {...register('condicion_psicologica', { required: 'La condición psicológica es obligatoria' })}
            className="form-input"
          />
          {errors.condicion_psicologica && <p className="error">{errors.condicion_psicologica.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="estadoSalud">Estado de Salud</label>
          <select
            id="estadoSalud"
            {...register('estado_salud', { required: 'El estado de salud es obligatorio' })}
            className="form-input"
          >
            <option value="Buena">Buena</option>
            <option value="Regular">Regular</option>
            <option value="Mala">Mala</option>
          </select>
          {errors.estado_salud && <p className="error">{errors.estado_salud.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="medicamentos">Medicamentos</label>
          <textarea
            id="medicamentos"
            {...register('medicamentos', { required: 'Los medicamentos son obligatorios' })}
            className="form-input"
          />
          {errors.medicamentos && <p className="error">{errors.medicamentos.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="intoleranciaMedicamentos">Intolerancia a Medicamentos</label>
          <textarea
            id="intoleranciaMedicamentos"
            {...register('intolerancia_medicamentos', { required: 'Indicar intolerancia es obligatorio' })}
            className="form-input"
          />
          {errors.intolerancia_medicamentos && <p className="error">{errors.intolerancia_medicamentos.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="referidoPor">Referido Por</label>
          <input
            type="text"
            id="referidoPor"
            {...register('referido_por', { required: 'El campo referido por es obligatorio' })}
            className="form-input"
          />
          {errors.referido_por && <p className="error">{errors.referido_por.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="viveCon">Vive Con</label>
          <input
            type="text"
            id="viveCon"
            {...register('vive_con', { required: 'Indicar con quién vive es obligatorio' })}
            className="form-input"
          />
          {errors.vive_con && <p className="error">{errors.vive_con.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="relacionesFamiliares">Relaciones Familiares</label>
          <select
            id="relacionesFamiliares"
            {...register('relaciones_familiares', { required: 'Indicar relaciones familiares es obligatorio' })}
            className="form-input"
          >
            <option value="Buena">Buena</option>
            <option value="Regular">Regular</option>
            <option value="Mala">Mala</option>
          </select>
          {errors.relaciones_familiares && <p className="error">{errors.relaciones_familiares.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            {...register('observaciones', { required: 'Las observaciones son obligatorias' })}
            className="form-input"
          />
          {errors.observaciones && <p className="error">{errors.observaciones.message}</p>}
        </div>

        <button type="submit" className="submit-btn">Registrar Ficha Médica</button>
      </form>
    </div>
  );
};

export default RegistrarFichaMedica;
