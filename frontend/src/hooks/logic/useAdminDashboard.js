import { useState, useEffect } from 'react';
import { getDashboardMetrics } from '../../services/dashboardService'; // Servicio para métricas del dashboard

const useAdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalEmpleados: 0,
    totalUsuarios: 0,
    totalIngresos: 0,
    totalGastos: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('resumen'); // Controla la pestaña activa

  // Cargar métricas al montar el dashboard
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        setError('Error al cargar las métricas del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Manejar el cambio de pestañas en el dashboard
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return {
    metrics,
    loading,
    error,
    activeTab,
    handleTabChange,
  };
};

export default useAdminDashboard;
