import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Importa Axios
import './RegisterPatientStyle.css'; // Asegúrate de que esta ruta sea correcta

const RegisterPatientScreen = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();  // Destructura reset
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    try {
      // Registrar los datos en la consola antes de enviarlos
      const response = await axios.post('http://localhost:3000/pacientes', {
        nombre: data.nombre,
        apellido: data.apellido,
        fecha_nacimiento: data.fechaNacimiento,
        estado_civil: data.estadoCivil,
        nivel_instruccion: data.nivelInstruccion,
        profesion_ocupacion: data.profesionOcupacion,
        telefono: data.telefono,
        direccion: data.direccion,
        fecha_ingreso: data.fechaIngreso,
      });
  
      
        setSuccess('Paciente registrado con éxito');
        setError('');
        reset(); // Resetear el formulario después del registro exitoso
      
    } catch (err) {
      console.error(err);
      setError('Hubo un error al registrar al paciente.');
      setSuccess('');
    }
  };
  
  
  return (
    <div className="register-patient-screen">
      <div className="form-container">
        <h2>Registrar Paciente</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              {...register('nombre', { required: 'Nombre es obligatorio' })}
              className="form-input"
            />
            {errors.nombre && <p className="error">{errors.nombre.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              {...register('apellido', { required: 'Apellido es obligatorio' })}
              className="form-input"
            />
            {errors.apellido && <p className="error">{errors.apellido.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              {...register('fechaNacimiento', { required: 'La fecha de nacimiento es obligatoria' })}
              className="form-input"
            />
            {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="estadoCivil">Estado Civil</label>
            <select
              id="estadoCivil"
              {...register('estadoCivil', { required: 'El estado civil es obligatorio' })}
              className="form-input"
            >
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Viudo">Viudo</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Unión Libre">Unión Libre</option>
            </select>
            {errors.estadoCivil && <p className="error">{errors.estadoCivil.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="nivelInstruccion">Nivel de Instrucción</label>
            <select
              id="nivelInstruccion"
              {...register('nivelInstruccion', { required: 'El nivel de instrucción es obligatorio' })}
              className="form-input"
            >
              <option value="Analfabeto">Analfabeto</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Superior">Superior</option>
            </select>
            {errors.nivelInstruccion && <p className="error">{errors.nivelInstruccion.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="profesionOcupacion">Profesión u Ocupación</label>
            <input
              type="text"
              id="profesionOcupacion"
              {...register('profesionOcupacion')}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              {...register('telefono', { 
                required: 'Teléfono es obligatorio', 
                pattern: {
                  value: /^\d+$/,
                  message: 'El teléfono debe ser un número válido'
                } 
              })}
              className="form-input"
            />
            {errors.telefono && <p className="error">{errors.telefono.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <textarea
              id="direccion"
              {...register('direccion', { required: 'La dirección es obligatoria' })}
              className="form-input"
            ></textarea>
            {errors.direccion && <p className="error">{errors.direccion.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
            <input
              type="date"
              id="fechaIngreso"
              {...register('fechaIngreso', { required: 'La fecha de ingreso es obligatoria' })}
              className="form-input"
            />
            {errors.fechaIngreso && <p className="error">{errors.fechaIngreso.message}</p>}
          </div>

          <button type="submit" className="submit-btn">Registrar Paciente</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatientScreen;
