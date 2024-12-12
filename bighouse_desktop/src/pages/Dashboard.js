import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Box, AppBar, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";

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
          <ListItemText primary="Registar Usuarios" />
        </ListItem>
        <ListItem button component={Link} to="/DashboardMedicScreen">
          <ListItemText primary="Médico" />
        </ListItem>
        <ListItem button component={Link} to="/DashboardSocialWorker">
          <ListItemText primary="Trabajador Social" />
        </ListItem>
        <ListItem button component={Link} to="/DashboardPsicology">
          <ListItemText primary="DashboardPsicology" />
        </ListItem>
      </List>
    </Box>
  </Drawer>
);

const DashboardScreen = () => (
  <Box sx={{ display: "flex" }}>
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Panel Administrativo
        </Typography>
      </Toolbar>
    </AppBar>
    <Sidebar />
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}
    >
      <Toolbar />
      <Routes>
        <Route path="/" element={<div>Bienvenido al Dashboard</div>} />
        <Route path="/registerEmployees" element={<div>Registrar Usuarios</div>} />
        <Route path="/DashboardMedicScreen" element={<div>Médico</div>} />
        <Route path="/DashboardSocialWorker" element={<div>Trabajador Social</div>} />
        <Route path="/DashboardPsicology" element={<div>Psicólogo</div>} />
      </Routes>
    </Box>
  </Box>
);

export default DashboardScreen;
