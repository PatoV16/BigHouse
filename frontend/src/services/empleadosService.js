import axios from 'axios';

const API_URL = 'http://localhost:3000/empleados'; // Ajusta la URL según tu backend

// 🔹 Crear un nuevo empleado
export const createEmpleado = async (empleadoData) => {
  try {
    const response = await axios.post(`${API_URL}`, empleadoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear el empleado';
  }
};

// 🔹 Obtener todos los empleados
export const getEmpleados = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener empleados';
  }
};

// 🔹 Obtener un empleado por ID
export const getEmpleadoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener el empleado';
  }
};

// 🔹 Actualizar un empleado
export const updateEmpleado = async (id, empleadoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, empleadoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al actualizar el empleado';
  }
};

// 🔹 Eliminar un empleado
export const deleteEmpleado = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar el empleado';
  }
};
