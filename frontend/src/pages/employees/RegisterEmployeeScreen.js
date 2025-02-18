import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Importa Axios
import './RegisterEmployeeStyle.css'; // Asegúrate de que esta ruta sea correcta

const RegisterEmployeeScreen = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();  // Destructura reset
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    try {
      // Registrar empleado y obtener su ID
      const empleadoResponse = await axios.post('http://localhost:3000/empleados', {
        nombre: data.nombre,
        apellido: data.apellido,
        cargo: data.cargo,
        fecha_contratacion: data.fechaContratacion,
        telefono: data.telefono,
        correo: data.correo,
        estado: data.estado,
      });
  
      const idEmpleado = empleadoResponse.data.id_empleado; // Obtén el ID del empleado creado
  
      // Registrar usuario asociado al empleado
      await axios.post('http://localhost:3000/usuarios', {
        id_empleado: idEmpleado, // Asociar el ID del empleado
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        contraseña: data.contraseña,
      });
  
      setSuccess('Empleado y usuario registrados con éxito');
      setError('');
      reset();
    } catch (err) {
      console.error(err);
      setError('Hubo un error al registrar al empleado o al usuario.');
      setSuccess('');
    }
  };
  

  return (
    <div className="register-employee-screen">
      <div className="form-container">
        <h2>Registrar Empleado</h2>
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
            <label htmlFor="cargo">Cargo</label>
            <select
              id="cargo"
              {...register('cargo', { required: 'El cargo es obligatorio' })}
              className="form-input"
            >
              <option value="Médico">Médico</option>
              <option value="Psicólogo">Psicólogo</option>
              <option value="Trabajador Social">Trabajador Social</option>
              <option value="Enfermera">Enfermera</option>
              <option value="Administrador">Administrador</option>
              <option value="Cocinero">Cocinero</option>
              <option value="Terapista">Terapista</option>
            </select>
            {errors.cargo && <p className="error">{errors.cargo.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fechaContratacion">Fecha de Contratación</label>
            <input
              type="date"
              id="fechaContratacion"
              {...register('fechaContratacion', { required: 'La fecha de contratación es obligatoria' })}
              className="form-input"
            />
            {errors.fechaContratacion && <p className="error">{errors.fechaContratacion.message}</p>}
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
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              {...register('correo', { 
                required: 'Correo es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'El correo debe ser válido'
                }
              })}
              className="form-input"
            />
            {errors.correo && <p className="error">{errors.correo.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              {...register('estado', { required: 'El estado es obligatorio' })}
              className="form-input"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            {errors.estado && <p className="error">{errors.estado.message}</p>}
          </div>
<div className="form-group">
  <label htmlFor="contraseña">Contraseña</label>
  <input
    type="password"
    id="contraseña"
    {...register('contraseña', { 
      required: 'La contraseña es obligatoria',
      minLength: {
        value: 8,
        message: 'La contraseña debe tener al menos 8 caracteres',
      },
    })}
    className="form-input"
  />
  {errors.contraseña && <p className="error">{errors.contraseña.message}</p>}
</div>


          <button type="submit" className="submit-btn">Registrar Empleado</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmployeeScreen;
