import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // Funciones para manejar las acciones
  const handleRegisterPatient = () => {
    navigate("/RegisterPatientScreen");
  };

  const handleManageNotices = () => {
    navigate("/notices");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handlePatientList = () => {
    navigate("/PacientesList");
  };

  const handleAttendance = () => {
    navigate("/attendance");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Administración</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card} onClick={handleRegisterPatient}>
          <h2 style={styles.cardTitle}>Registrar Paciente</h2>
          <p style={styles.cardDescription}>Añade nuevos pacientes al sistema.</p>
        </div>

        <div style={styles.card} onClick={handleManageNotices}>
          <h2 style={styles.cardTitle}>Gestionar Avisos</h2>
          <p style={styles.cardDescription}>Crea y administra los avisos para los usuarios.</p>
        </div>

        <div style={styles.card} onClick={handleEditProfile}>
          <h2 style={styles.cardTitle}>Editar Perfil</h2>
          <p style={styles.cardDescription}>Actualiza la información de tu perfil.</p>
        </div>

        <div style={styles.card} onClick={handlePatientList}>
          <h2 style={styles.cardTitle}>Lista de Pacientes</h2>
          <p style={styles.cardDescription}>Consulta y gestiona la lista de pacientes registrados.</p>
        </div>

        <div style={styles.card} onClick={handleAttendance}>
          <h2 style={styles.cardTitle}>Asistencia</h2>
          <p style={styles.cardDescription}>Administra y registra la asistencia de los usuarios.</p>
        </div>
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    height: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "250px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#007BFF",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#666",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
};

export default DashboardAdmin;
