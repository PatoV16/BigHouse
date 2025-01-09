import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardStyle.css";

const DashboardAdmin = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  // Función para manejar el cambio de sección
  const handleSectionChange = (section) => {
    setActiveSection(section);
    switch (section) {
      case "registerPatient":
        navigate("/RegisterPatientScreen");
        break;
      case "notices":
        navigate("/notices");
        break;
      case "editProfile":
        navigate("/edit-profile");
        break;
      case "patientList":
        navigate("/PacientesList");
        break;
      case "attendance":
        navigate("/attendance");
        break;
      case "logout":
        localStorage.clear();
        navigate("/LoginForm");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Panel de Administración</h2>
        <ul className="sidebar-menu">
          <li
            className={activeSection === "home" ? "active" : ""}
            onClick={() => handleSectionChange("home")}
          >
            🏠 Inicio
          </li>
          <li
            className={activeSection === "registerPatient" ? "active" : ""}
            onClick={() => handleSectionChange("registerPatient")}
          >
            ➕ Registrar Paciente
          </li>
          <li
            className={activeSection === "notices" ? "active" : ""}
            onClick={() => handleSectionChange("notices")}
          >
            📢 Gestionar Avisos
          </li>
          <li
            className={activeSection === "editProfile" ? "active" : ""}
            onClick={() => handleSectionChange("editProfile")}
          >
            ✏️ Editar Perfil
          </li>
          <li
            className={activeSection === "patientList" ? "active" : ""}
            onClick={() => handleSectionChange("patientList")}
          >
            📋 Lista de Pacientes
          </li>
          <li
            className={activeSection === "attendance" ? "active" : ""}
            onClick={() => handleSectionChange("attendance")}
          >
            ✅ Asistencia
          </li>
          <li onClick={() => handleSectionChange("logout")}>
            🚪 Cerrar Sesión
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activeSection === "home" && (
          <div className="section-container">
            <h3>Bienvenido al Panel de Administración</h3>
            <p>Selecciona una opción del menú para comenzar.</p>
          </div>
        )}
        {activeSection === "registerPatient" && (
          <div className="section-container">
            <h3>Registrar Paciente</h3>
            <p>Formulario para registrar un nuevo paciente.</p>
          </div>
        )}
        {activeSection === "notices" && (
          <div className="section-container">
            <h3>Gestionar Avisos</h3>
            <p>Crear y gestionar avisos.</p>
          </div>
        )}
        {activeSection === "editProfile" && (
          <div className="section-container">
            <h3>Editar Perfil</h3>
            <p>Actualizar tu información personal.</p>
          </div>
        )}
        {activeSection === "patientList" && (
          <div className="section-container">
            <h3>Lista de Pacientes</h3>
            <p>Consulta y administra la lista de pacientes.</p>
          </div>
        )}
        {activeSection === "attendance" && (
          <div className="section-container">
            <h3>Asistencia</h3>
            <p>Gestionar la asistencia de usuarios.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
