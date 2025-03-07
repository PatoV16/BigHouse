import { useState } from 'react';
import { createPaciente } from '../../services/pacienteService'; // Asegúrate de importar la función para crear pacientes

const useRegistroPaciente = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fecha_nacimiento: "",
    estado_civil: "",
    nivel_instruccion: "",
    profesion_ocupacion: "",
    telefono: "",
    direccion: "",
    fecha_ingreso: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newPaciente = await createPaciente(formData);
      setSuccessMessage("Paciente registrado correctamente.");
      // Limpiar el formulario después de enviar
      setFormData({
        nombre: "",
        apellido: "",
        cedula: "",
        fecha_nacimiento: "",
        estado_civil: "",
        nivel_instruccion: "",
        profesion_ocupacion: "",
        telefono: "",
        direccion: "",
        fecha_ingreso: "",
      });
    } catch (err) {
      setError("Error al registrar el paciente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  };
};

export default useRegistroPaciente;
