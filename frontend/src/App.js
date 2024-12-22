import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardScreen from "./pages/Dashboard";
import RegisterEmployeeScreen from "./pages/employees/RegisterEmployeeScreen";
import DoctorDashboard from "./pages/employees/medic/DashboardMedicScreen";
import RegistrarFichaMedica from "./pages/employees/medic/RegisterNewFicha";
import DashboardTrabajadorSocial from "./pages/employees/SocialWorker/DashboardSocialWorkerScreen";
import RegistrarFichaSocial from "./pages/employees/SocialWorker/RegistrarFichaSocial";
import DashboardPsicology from "./pages/employees/psicology/DashboardPsicology";
import DashboardAdmin from "./pages/employees/admin/DashboardAdmin";
import RegisterPatientScreen from "./pages/employees/admin/RegisterPatientScreen";
import PacientesList from "./pages/employees/admin/ListaPacientesScreen";
import LoginForm from "./pages/employees/LoginForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
        <Route path="/registerEmployees" element={<RegisterEmployeeScreen/>}/>
        <Route path="/DashboardMedicScreen" element={<DoctorDashboard/>}/>
        <Route path="/RegistrarFichaMedica" element={<RegistrarFichaMedica/>}/>
        <Route path="/DashboardSocialWorker" element={<DashboardTrabajadorSocial/>}/>
        <Route path="/RegistrarFichaSocial" element={<RegistrarFichaSocial />} />
        <Route path="/DashboardPsicology" element={<DashboardPsicology />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>}/>
        <Route path="/RegisterPatientScreen" element={<RegisterPatientScreen/>}/>
        <Route path="/PacientesList" element={<PacientesList/>}/>
        <Route path="/LoginForm" element={<LoginForm/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
