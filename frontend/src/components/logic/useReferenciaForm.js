import { useState, useEffect } from 'react';
import { createReferencia, updateReferencia } from '../../services/referenciaService';
import { fetchPacientes } from '../../services/pacienteService'; // Asegúrate de tener este servicio

const useReferenciaForm = (initialData = null) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState(
    initialData || {
      id_paciente: '',
      zona: '',
      distrito: '',
      ciudad: '',
      canton: '',
      parroquia: '',
      nombreInstitucion: '',
      direccion: '',
      telefono: '',
      razonSocial: '',
      directorCoordinador: '',
      familiarAcompanante: '',
      institucionTransfiere: '',
      modalidadServicios: '',
      motivoReferencia: '',
      profesionalRefiere: '',
      personalAcompanante: '',
      telefonoFijo: '',
      telefonoCelular: '',
      recomendaciones: '',
      fecha: '',
    }
  );

  // Estado para la lista de pacientes
  const [pacientes, setPacientes] = useState([]);

  // Estados para manejar la carga y errores
  const [loading, setLoading] = useState(false);
  const [loadingPacientes, setLoadingPacientes] = useState(false);
  const [error, setError] = useState(null);

  // Cargar la lista de pacientes al montar el componente
  useEffect(() => {
    const loadPacientes = async () => {
      setLoadingPacientes(true);
      try {
        const data = await fetchPacientes(); // Llama a tu servicio para obtener los pacientes
        setPacientes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoadingPacientes(false);
      }
    };

    loadPacientes();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.id) {
        await updateReferencia(formData.id, formData); // Actualizar referencia existente
      } else {
        await createReferencia(formData); // Crear nueva referencia
      }
      alert('Referencia guardada con éxito');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Retornar los estados y funciones necesarios
  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    pacientes,
    loadingPacientes,
  };
};

export default useReferenciaForm;