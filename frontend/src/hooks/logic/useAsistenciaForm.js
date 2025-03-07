import { useState, useEffect } from 'react';
import { createAsistencia } from '../../services/asistenciaService';
import { getPacientes } from '../../services/pacienteService';

const useAsistenciaForm = () => {
    const [formData, setFormData] = useState({
        id_paciente: '',
        semanaInicio: '',
        semanaFin: '',
        mes: '',
        anio: '',
        horarioTrabajo: '',
        nombreCentro: '',
        modalidadAtencion: '',
        distrito: '',
        diasAsistencia: Array(5).fill(false),
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar pacientes solo una vez
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                setLoading(true);
                const data = await getPacientes();
                setPacientes(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Error al cargar la lista de pacientes');
                setPacientes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (index) => {
        setFormData(prevData => ({
            ...prevData,
            diasAsistencia: prevData.diasAsistencia.map((checked, i) => 
                i === index ? !checked : checked
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createAsistencia(formData);
            setSuccessMessage('Asistencia registrada con éxito');
            // Limpiar el formulario después de guardar
            setFormData({
                id_paciente: '',
                semanaInicio: '',
                semanaFin: '',
                mes: '',
                anio: '',
                horarioTrabajo: '',
                nombreCentro: '',
                modalidadAtencion: '',
                distrito: '',
                diasAsistencia: Array(5).fill(false),
            });
        } catch (err) {
            setError(err.message || 'Error al guardar la asistencia');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        error,
        successMessage,
        handleInputChange,
        handleCheckboxChange,
        handleSubmit,
        pacientes,
        loading
    };
};

export default useAsistenciaForm;