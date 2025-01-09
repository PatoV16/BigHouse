import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación
import './LoginForm.css'; 
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: email,
        password,
      });
  
      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('id_empleado', data.id)

        // Redirigir según el cargo
        if (data.cargo === 'Médico') {
          navigate('/DashboardMedicScreen'); // Ruta para Gerente
        } else if (data.cargo === 'Administrador') {
          navigate('/DashboardAdmin'); // Ruta para Empleado
        }else if (data.cargo === 'Psicólogo') {
          navigate('/DashboardPsicology'); // Ruta por defecto o para otros cargos
        }else if(data.cargo === 'Trabajador Social'){
          navigate('/DashboardSocialWorker')
        } 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bienvenido al Centro Gerontológico Casa Grande</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              disabled={loading}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
