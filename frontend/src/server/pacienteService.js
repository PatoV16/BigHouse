import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes'; // Cambia la URL si es necesario

// Crear un paciente
export const createPaciente = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear paciente:', error);
    throw error;
  }
};

// Obtener todos los pacientes
export const getPacientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error;
  }
};

// Obtener un paciente por su ID
export const getPacienteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el paciente:', error);
    throw error;
  }
};

// Actualizar los datos de un paciente
export const updatePaciente = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    throw error;
  }
};

// Eliminar un paciente por su ID
export const deletePaciente = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    throw error;
  }
};
