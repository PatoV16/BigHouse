import  { useEffect, useState } from 'react';
import { createActaCompromiso, updateActaCompromiso } from '../../services/actaCompromisoService';
import { getPacientes } from '../../services/pacienteService';

const useActaCompromisoForm = (initialData = null) => {
  const [formData, setFormData] = useState(
    initialData || {
      nombreCompleto: '',
      cedulaIdentidad: '',
      telefono: '',
      direccion: '',
      id_paciente: '', // Asegúrate de que este campo esté vacío o contenga un valor válido
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);
  const [errorPacientes, setErrorPacientes] = useState(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientes();
        setPacientes(data || []);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
        setErrorPacientes("No se pudieron cargar los pacientes.");
      } finally {
        setLoadingPacientes(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí deberías ver el id_paciente correcto
    try {
      if (formData.id) {
        await updateActaCompromiso(formData.id, formData);
      } else {
        await createActaCompromiso(formData);
      }
      alert('Acta de compromiso guardada con éxito');
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };
  
  return { formData, handleChange, handleSubmit, loading, error, pacientes, loadingPacientes, errorPacientes };
};

export default useActaCompromisoForm;
