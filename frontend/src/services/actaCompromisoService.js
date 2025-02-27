import axios from 'axios';

const API_URL = 'http://localhost:3000/actacompromiso'; // Asegúrate de que coincide con tu backend

// 🔹 Crear un acta de compromiso
export const createActaCompromiso = async (actaData) => {
  try {
    const response = await axios.post(`${API_URL}`, actaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear el acta de compromiso';
  }
};

// 🔹 Obtener todas las actas de compromiso
export const getActasCompromiso = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener las actas de compromiso';
  }
};

// 🔹 Obtener un acta de compromiso por ID
export const getActaCompromisoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener el acta de compromiso';
  }
};

// 🔹 Actualizar un acta de compromiso
export const updateActaCompromiso = async (id, actaData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, actaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al actualizar el acta de compromiso';
  }
};

// 🔹 Eliminar un acta de compromiso
export const deleteActaCompromiso = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar el acta de compromiso';
  }
};
