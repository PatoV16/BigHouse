import axios from 'axios';

const API_URL = 'http://localhost:3000/referencia'; // Ajusta la URL según tu backend

// 🔹 Crear una nueva referencia
export const createReferencia = async (referenciaData) => {
  try {
    const response = await axios.post(API_URL, referenciaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear la referencia';
  }
};

// 🔹 Obtener todas las referencias
export const getReferencias = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener referencias';
  }
};

// 🔹 Obtener una referencia por ID
export const getReferenciaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener la referencia';
  }
};

// 🔹 Actualizar una referencia
export const updateReferencia = async (id, referenciaData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, referenciaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al actualizar la referencia';
  }
};

// 🔹 Eliminar una referencia
export const deleteReferencia = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar la referencia';
  }
};
