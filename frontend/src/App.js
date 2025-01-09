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
import FichaMedicaPaciente from "./pages/employees/medic/VerFichaMedica";
import BarthelRecord from "./pages/employees/psicology/barthelRecord";
import LawtonBrodyRecord from "./pages/employees/psicology/LawtonBrodyRecord";
import MiniExamenRecord from "./pages/employees/psicology/MiniExamenRecord";
import MenuPsicologo from "./pages/employees/psicology/menu";
import FichaSocial from "./pages/employees/SocialWorker/FichaSocial";
import ActaCompromisoComponent from "./pages/employees/admin/ActaCompromiso";
import ActaCompromisoVisualizar from "./pages/employees/admin/ActaCompromisoVisualizar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registerEmployees" element={<RegisterEmployeeScreen/>}/>
        <Route path="/DashboardMedicScreen" element={<DoctorDashboard/>}/>
        <Route path="/RegistrarFichaMedica" element={<RegistrarFichaMedica/>}/>
        <Route path="/DashboardSocialWorker" element={<DashboardTrabajadorSocial/>}/>
        <Route path="/RegistrarFichaSocial/:id_paciente" element={<RegistrarFichaSocial />} />
        <Route path="/DashboardPsicology" element={<DashboardPsicology />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>}/>
        <Route path="/RegisterPatientScreen" element={<RegisterPatientScreen/>}/>
        <Route path="/PacientesList" element={<PacientesList/>}/>
        <Route path="/LoginForm" element={<LoginForm/>}/>
        <Route path="/ficha-medica/:idPaciente" element={<FichaMedicaPaciente />} />
        <Route path="/BarthelRecord/:idPaciente" element={<BarthelRecord />} />
        <Route path="/LawtonBrodyRecord/:idPaciente" element={<LawtonBrodyRecord />} />
        <Route path="/MiniExamenRecord/:idPaciente" element={<MiniExamenRecord />} />
        <Route path="/MenuPsicologo/:idPaciente" element={<MenuPsicologo />} />
        <Route path="/FichaSocial/:idPaciente" element={<FichaSocial />} />
        <Route path="/ActaCompromiso/:idPaciente" element={<ActaCompromisoComponent />} />
        <Route path="/ActaCompromisoScreen/:idPaciente" element={<ActaCompromisoVisualizar />} />
      </Routes>
    </Router>
  );
}

export default App;
