import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  console.log('Estado del usuario:', user);
  
  if (!user) {
    console.log('Redirigiendo a login...');
    return <Navigate to="/login" />;
  }
  
  console.log('Mostrando contenido protegido...');
  return children;
}

export default ProtectedRoute;