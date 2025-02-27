import { useState, useEffect } from 'react';
import { getEmpleados } from '../../services/empleadosService'; // Servicio para obtener empleados

const useListarEmpleados = () => {
  const [empleados, setEmpleados] = useState([]); // Estado para almacenar la lista de empleados
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para cargar la lista de empleados
  const cargarEmpleados = async () => {
    try {
      const data = await getEmpleados(); // Obtener la lista de empleados desde el servicio
      setEmpleados(data); // Actualizar el estado con los empleados
      setLoading(false); // Indicar que la carga ha terminado
    } catch (err) {
      setError('Error al cargar la lista de empleados'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado (incluso si hay un error)
    }
  };

  // Cargar los empleados al montar el componente
  useEffect(() => {
    cargarEmpleados();
  }, []);

  return {
    empleados,
    loading,
    error,
    cargarEmpleados, // Opcional: Para recargar la lista manualmente
  };
};

export default useListarEmpleados;