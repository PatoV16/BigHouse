import axios from 'axios';

const API_URL = 'http://localhost:3000/asistencia'; // Asegúrate de que coincide con tu backend

// 🔹 Crear una nueva asistencia
export const createAsistencia = async (asistenciaData) => {
  try {
    const response = await axios.post(`${API_URL}`, asistenciaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear la asistencia';
  }
};

// 🔹 Obtener todas las asistencias
export const getAsistencias = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener las asistencias';
  }
};

// 🔹 Obtener una asistencia por ID
export const getAsistenciaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener la asistencia';
  }
};

// 🔹 Actualizar una asistencia
export const updateAsistencia = async (id, asistenciaData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, asistenciaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al actualizar la asistencia';
  }
};

// 🔹 Eliminar una asistencia
export const deleteAsistencia = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar la asistencia';
  }
};
