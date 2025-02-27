import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes'; // Asegúrate de que la URL del backend sea correcta

// 🔹 Crear un nuevo paciente
export const createPaciente = async (pacienteData) => {
  try {
    const response = await axios.post(`${API_URL}`, pacienteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear el paciente';
  }
};

// 🔹 Obtener todos los pacientes
export const getPacientes = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener pacientes';
  }
};

// 🔹 Obtener un paciente por ID
export const getPacienteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener el paciente';
  }
};

// 🔹 Actualizar un paciente
export const updatePaciente = async (id, pacienteData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, pacienteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al actualizar el paciente';
  }
};

// 🔹 Eliminar un paciente
export const deletePaciente = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar el paciente';
  }
};

// 🔹 Obtener todos los pacientes (alternativa con nombre más descriptivo)
export const fetchPacientes = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener pacientes';
  }
};