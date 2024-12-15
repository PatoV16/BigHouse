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

const MiniMentalExam = () => {
  const [formData, setFormData] = useState({
    orientacionTiempo: 0,
    orientacionEspacio: 0,
    memoria: 0,
    atencionCalculo: 0,
    memoriadiferida: 0,
    denominacion: 0,
    repeticionFrase: 0,
    comprensionEjecucion: 0,
    lectura: 0,
    escritura: 0,
    copiaDibujo: 0
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

  const mentalExamOptions = [
    { value: 0, label: 'Incorrecto/No realizado' },
    { value: 1, label: 'Correcto/Realizado' }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Mini Examen del Estado Mental (MMSE)
      </Typography>
      <form>
        <Grid container spacing={2}>
          {[
            { name: 'orientacionTiempo', label: 'Orientación en Tiempo' },
            { name: 'orientacionEspacio', label: 'Orientación en Espacio' },
            { name: 'memoria', label: 'Memoria Inmediata' },
            { name: 'atencionCalculo', label: 'Atención y Cálculo' },
            { name: 'memoriadiferida', label: 'Memoria Diferida' },
            { name: 'denominacion', label: 'Denominación' },
            { name: 'repeticionFrase', label: 'Repetición de Frase' },
            { name: 'comprensionEjecucion', label: 'Comprensión y Ejecución' },
            { name: 'lectura', label: 'Lectura' },
            { name: 'escritura', label: 'Escritura' },
            { name: 'copiaDibujo', label: 'Copia de Dibujo' }
          ].map((item) => (
            <Grid item xs={12} key={item.name}>
              <FormControl fullWidth>
                <InputLabel>{item.label}</InputLabel>
                <Select
                  name={item.name}
                  value={formData[item.name]}
                  onChange={handleChange}
                >
                  {mentalExamOptions.map((option) => (
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
            Puntaje Total: {calculateTotal()} / 11
          </Typography>
        </Box>
      </form>
    </Paper>
  );
};

export default MiniMentalExam;
