  import React from 'react';
  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import Login from '../pages/auth/Login';
  import ProtectedRoute from '../components/ProtectedRoute';
  import ViewProfile from '../pages/Profile/ViewProfile';
  import RegistrarEmpleadoPage from '../pages/admin/RegistrarEmpleado';
  import HomeScreen from '../pages/HomeScreen';
  import ListarEmpleadosPage from '../pages/admin/ListarEmpleadosPage';
  import AdminDashboard from '../pages/admin/DashboardAdminScreen';
  import RegistroPaciente from '../pages/admin/RegistrarPacienteScreen';
  import AsistenciaForm from '../pages/admin/AsistenciaForm';
  import ActaCompromisoForm from '../pages/admin/ActaCompromisoForm';
  import ReferenciaForm from '../pages/admin/ReferenciaForm';
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/list" element={<ListarEmpleadosPage/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/registrarEmpleado" element={<RegistrarEmpleadoPage/>} />
          <Route path="/registrarPaciente" element={<RegistroPaciente/>} />
          <Route path="/registrarAsistenciaPaciente" element={<AsistenciaForm/>} />
          <Route path="/registrarActaCompromiso" element={<ActaCompromisoForm/>} />
          <Route path="/referencia" element={<ReferenciaForm/>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;
  