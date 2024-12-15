import axios from 'axios';

const API_URL = 'http://localhost:3000/empleados';

export const fetchEmpleados = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEmpleado = async (empleado) => {
  const response = await axios.post(API_URL, empleado);
  return response.data;
};

export const updateEmpleado = async (id, empleado) => {
  const response = await axios.put(`${API_URL}/${id}`, empleado);
  return response.data;
};

export const deleteEmpleado = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
