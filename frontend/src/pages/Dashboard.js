import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Box, AppBar, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import { fetchEmpleados } from '../server/empleadosService'; // Importa la función para obtener los empleados

const drawerWidth = 240;

const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: "auto" }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/registerEmployees">
          <ListItemText primary="Registrar Usuarios" />
        </ListItem>
        <ListItem button component={Link} to="/DashboardMedicScreen">
          <ListItemText primary="Médico" />
        </ListItem>
        <ListItem button component={Link} to="/DashboardSocialWorker">
          <ListItemText primary="Trabajador Social" />
        </ListItem>
        <ListItem button component={Link} to="/DashboardPsicology">
          <ListItemText primary="Psicólogo" />
        </ListItem>
        <ListItem button component={Link} to="/DashboardAdmin">
          <ListItemText primary="Administrador" />
        </ListItem>
      </List>
    </Box>
  </Drawer>
);

const DashboardScreen = () => {
  const [empleados, setEmpleados] = useState([]); // Estado para almacenar los empleados

  // Función para cargar empleados
  const loadEmpleados = async () => {
    try {
      const data = await fetchEmpleados();
      setEmpleados(data); // Guardar los empleados en el estado
    } catch (error) {
      console.error("Error al cargar los empleados", error);
    }
  };

  // Cargar los empleados al montar el componente
  useEffect(() => {
    loadEmpleados();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Panel Administrativo
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Typography variant="h5" gutterBottom>
                  Lista de Empleados
                </Typography>
                <List>
                  {empleados.length > 0 ? (
                    empleados.map((empleado) => (
                      <ListItem key={empleado.id}>
                        <ListItemText primary={`${empleado.nombre} ${empleado.apellido}`} />
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body1">No hay empleados disponibles.</Typography>
                  )}
                </List>
              </div>
            }
          />
          <Route path="/registerEmployees" element={<div>Registrar Usuarios</div>} />
          <Route path="/DashboardMedicScreen" element={<div>Médico</div>} />
          <Route path="/DashboardSocialWorker" element={<div>Trabajador Social</div>} />
          <Route path="/DashboardPsicology" element={<div>Psicólogo</div>} />
          <Route path="/DashboardAdmin" element={<div>Administrador</div>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default DashboardScreen;
