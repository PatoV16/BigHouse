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

const BarthelScale = () => {
  const [formData, setFormData] = useState({
    comer: 0,
    traslado: 0,
    aseoPersonal: 0,
    usoRetrete: 0,
    bañarse: 0,
    desplazarse: 0,
    subirEscaleras: 0,
    vestirse: 0,
    controlHeces: 0,
    controlOrina: 0
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

  const barthelOptions = [
    { value: 0, label: 'Dependencia Total' },
    { value: 5, label: 'Dependencia Severa' },
    { value: 10, label: 'Dependencia Moderada' },
    { value: 15, label: 'Dependencia Leve' },
    { value: 20, label: 'Independencia' }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Escala de Barthel (Valoración de Dependencia)
      </Typography>
      <form>
        <Grid container spacing={2}>
          {[
            { name: 'comer', label: 'Comer' },
            { name: 'traslado', label: 'Traslado Silla/Cama' },
            { name: 'aseoPersonal', label: 'Aseo Personal' },
            { name: 'usoRetrete', label: 'Uso del Retrete' },
            { name: 'bañarse', label: 'Bañarse' },
            { name: 'desplazarse', label: 'Desplazamiento' },
            { name: 'subirEscaleras', label: 'Subir Escaleras' },
            { name: 'vestirse', label: 'Vestirse' },
            { name: 'controlHeces', label: 'Control de Heces' },
            { name: 'controlOrina', label: 'Control de Orina' }
          ].map((item) => (
            <Grid item xs={12} key={item.name}>
              <FormControl fullWidth>
                <InputLabel>{item.label}</InputLabel>
                <Select
                  name={item.name}
                  value={formData[item.name]}
                  onChange={handleChange}
                >
                  {barthelOptions.map((option) => (
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
            Puntaje Total: {calculateTotal()} / 100
          </Typography>
        </Box>
      </form>
    </Paper>
  );
};

export default BarthelScale;
