import React from "react";
import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";
const PacientesList = () => {
const users = [
  { id: 1, name: "Juan Pérez", email: "juan@ejemplo.com" },
  { id: 2, name: "María López", email: "maria@ejemplo.com" },
  { id: 3, name: "Carlos García", email: "carlos@ejemplo.com" },
  { id: 4, name: "Ana Martínez", email: "ana@ejemplo.com" },
];


  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Paper elevation={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default PacientesList;
