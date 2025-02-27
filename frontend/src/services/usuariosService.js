import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios'; // Ajusta la URL según tu backend

// 🔹 Crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}`, usuarioData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear el usuario';
  }
};

// 🔹 Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener usuarios';
  }
};

// 🔹 Obtener un usuario por ID
export const getUsuarioById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener el usuario';
  }
};

// 🔹 Obtener un usuario por correo (puedes usar esta función si necesitas buscar por correo)
export const getUsuarioByEmail = async (correo) => {
  try {
    const response = await axios.get(`${API_URL}/${correo}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener el usuario por correo';
  }
};

// 🔹 Actualizar un usuario
export const updateUsuario = async (id, usuarioData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al actualizar el usuario';
  }
};

// 🔹 Eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar el usuario';
  }
};
