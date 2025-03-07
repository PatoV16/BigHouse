import { useState, useEffect } from 'react';
import { createEmpleado, getEmpleadoById, updateEmpleado } from '../../services/empleadosService';
import { createUsuario } from '../../services/usuariosService'; // Nuevo servicio para usuarios

const useRegistrarEmpleadoForm = (empleadoId = null) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    cargo: '',
    fecha_contratacion: '',
    telefono: '',
    correo: '',
    contraseña: '',  // Se agrega el campo de contraseña
    estado: 'Activo',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar los datos del empleado si es un formulario de actualización
  useEffect(() => {
    if (empleadoId) {
      const fetchEmpleado = async () => {
        try {
          const data = await getEmpleadoById(empleadoId);
          setFormData(data);
        } catch (err) {
          setError('Error al cargar los datos del empleado');
        }
      };

      fetchEmpleado();
    }
  }, [empleadoId]);

  // Función para manejar el cambio de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (empleadoId) {
        // Actualizar solo el empleado (no usuario)
        await updateEmpleado(empleadoId, formData);
        setSuccessMessage('Empleado actualizado correctamente');
      } else {
        // Crear el empleado y obtener el ID generado
        const empleado = await createEmpleado(formData);

        // Crear el usuario con el mismo correo y contraseña
        await createUsuario({
          id_empleado: empleado.id,  // Relacionar el usuario con el empleado
          correo: formData.correo,
          contraseña: formData.contraseña,
          nombre: formData.nombre,
          apellido: formData.apellido
        });

        setSuccessMessage('Empleado y usuario creados correctamente');
      }
    } catch (err) {
      setError('Error al guardar los datos');
    }
  };

  return {
    formData,
    error,
    successMessage,
    handleInputChange,
    handleSubmit,
  };
};

export default useRegistrarEmpleadoForm;
