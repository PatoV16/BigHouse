import React, { useState } from 'react';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid
} from '@mui/material';

const LawtonBrodyScale = () => {
  const [formData, setFormData] = useState({
    usoTelefono: 0,
    hacerCompras: 0,
    prepararComida: 0,
    cuidadoCasa: 0,
    lavadoRopa: 0,
    usoTransporte: 0,
    responsabilidadMedicacion: 0,
    capacidadDinero: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };

  const calculateTotal = () => {
    return Object.values(formData).reduce((a, b) => a + b, 0);
  };

  const lawtonOptions = [
    { value: 0, label: 'Dependencia Total' },
    { value: 1, label: 'Dependencia Severa' },
    { value: 2, label: 'Dependencia Moderada' },
    { value: 3, label: 'Independencia' }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Escala de Lawton y Brody (Actividades Instrumentales)
      </Typography>
      <form>
        <Grid container spacing={2}>
          {[
            { name: 'usoTelefono', label: 'Uso de Teléfono' },
            { name: 'hacerCompras', label: 'Hacer Compras' },
            { name: 'prepararComida', label: 'Preparar Comida' },
            { name: 'cuidadoCasa', label: 'Cuidado de Casa' },
            { name: 'lavadoRopa', label: 'Lavado de Ropa' },
            { name: 'usoTransporte', label: 'Uso de Transporte' },
            { name: 'responsabilidadMedicacion', label: 'Responsabilidad Medicación' },
            { name: 'capacidadDinero', label: 'Capacidad de Manejar Dinero' }
          ].map((item) => (
            <Grid item xs={12} key={item.name}>
              <FormControl fullWidth>
                <InputLabel>{item.label}</InputLabel>
                <Select
                  name={item.name}
                  value={formData[item.name]}
                  onChange={handleChange}
                >
                  {lawtonOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold">
            Puntaje Total: {calculateTotal()} / 24
          </Typography>
        </Box>
      </form>
    </Paper>
  );
};

export default LawtonBrodyScale;
