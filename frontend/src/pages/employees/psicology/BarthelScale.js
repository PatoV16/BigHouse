import React, { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Alert
} from '@mui/material';
import axios from 'axios';

const BarthelScale = ({ idPaciente }) => {
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
    controlOrina: 0,
    sillaDeRuedas: false,
    puntajeTotal: 0
  });

  const barthelOptions = {
    comer: [
      { value: 0, label: 'Incapaz' },
      { value: 5, label: 'Necesita ayuda para cortar, extender mantequilla, usar condimentos, etc.' },
      { value: 10, label: 'Independiente: Puede comer solo' },
    ],
    traslado: [
      { value: 0, label: 'Incapaz, no se mantiene sentado' },
      { value: 5, label: 'Necesita ayuda importante (una persona entrenada o dos personas), puede estar sentado' },
      { value: 10, label: 'Necesita algo de ayuda (una pequeña ayuda física o verbal)' },
      { value: 15, label: 'Independiente' },
    ],
    aseoPersonal: [
      { value: 0, label: 'Necesita ayuda con el aseo personal' },
      { value: 5, label: 'Independiente para lavarse la cara, las manos y los dientes, peinarse y afeitarse' },
    ],
    usoRetrete: [
      { value: 0, label: 'Dependiente' },
      { value: 5, label: 'Necesita alguna ayuda, pero puede hacer algo solo' },
      { value: 10, label: 'Independiente (entrar y salir, limpiarse y vestirse)' },
    ],
    bañarse: [
      { value: 0, label: 'Dependiente' },
      { value: 5, label: 'Independiente para bañarse o ducharse' },
    ],
    desplazarse: [
      { value: 0, label: 'Inmóvil' },
      { value: 5, label: 'Independiente en silla de ruedas en 50 metros' },
      { value: 10, label: 'Anda con pequeña ayuda de una persona (física o verbal)' },
      { value: 15, label: 'Independiente al menos 50 metros con cualquier tipo de muleta excepto andador' },
    ],
    subirEscaleras: [
      { value: 0, label: 'Incapaz' },
      { value: 5, label: 'Necesita ayuda física o verbal, puede llevar cualquier tipo de muleta' },
      { value: 10, label: 'Independiente para subir y bajar' },
    ],
    vestirse: [
      { value: 0, label: 'Dependiente' },
      { value: 5, label: 'Necesita ayuda, pero puede hacer la mitad aproximadamente sin ayuda' },
      { value: 10, label: 'Independiente incluyendo botones, cremalleras (cierres) y cordones' },
    ],
    controlHeces: [
      { value: 0, label: 'Incontinente (o necesita que le suministren enema)' },
      { value: 5, label: 'Accidente excepcional (uno por semana)' },
      { value: 10, label: 'Continente' },
    ],
    controlOrina: [
      { value: 0, label: 'Incontinente o sondado incapaz de cambiarse la bolsa' },
      { value: 5, label: 'Accidente excepcional (máximo uno por 24 horas)' },
      { value: 10, label: 'Continente, durante al menos 7 días' },
    ],
  };

  const getDependencyLevel = (score, usesWheelchair) => {
    const maxScore = usesWheelchair ? 90 : 100;
    
    if (score <= 20) return { level: 'Dependencia Total', severity: 'error' };
    if (score <= 60) return { level: 'Dependencia Severa', severity: 'error' };
    if (score <= 90) return { level: 'Dependencia Moderada', severity: 'warning' };
    if (score < maxScore) return { level: 'Dependencia Escasa', severity: 'info' };
    return { level: 'Independencia', severity: 'success' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: parseInt(value, 10)
      };

      const totalScore = Object.entries(newData)
        .filter(([key]) => key !== 'sillaDeRuedas' && key !== 'puntajeTotal')
        .reduce((sum, [_, value]) => sum + value, 0);

      return {
        ...newData,
        puntajeTotal: totalScore
      };
    });
  };

  const handleSillaDeRuedasChange = (e) => {
    setFormData(prev => ({
      ...prev,
      sillaDeRuedas: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calcular el puntaje total
    const totalScore = 
      formData.comer + 
      formData.traslado + 
      formData.aseoPersonal + 
      formData.usoRetrete + 
      formData.bañarse + 
      formData.desplazarse + 
      formData.subirEscaleras + 
      formData.vestirse + 
      formData.controlHeces + 
      formData.controlOrina;
    
    // Preparar los datos para enviar al backend
    const dataToSend = {
      id_paciente: idPaciente,
      comer: formData.comer,
      traslado: formData.traslado,
      aseo_personal: formData.aseoPersonal,
      uso_retrete: formData.usoRetrete,
      bañarse: formData.bañarse,
      desplazarse: formData.desplazarse,
      subir_escaleras: formData.subirEscaleras,
      vestirse: formData.vestirse,
      control_heces: formData.controlHeces,
      control_orina: formData.controlOrina,
      puntaje_total: totalScore
    };
    
    try {
      const response = await axios.post('http://localhost:3000/barthel', dataToSend);
      alert('Evaluación guardada exitosamente');
    } catch (error) {
      alert('Error al guardar la evaluación: ' + error.message);
    }
  };

  const dependencyInfo = useMemo(() => 
    getDependencyLevel(formData.puntajeTotal, formData.sillaDeRuedas),
    [formData.puntajeTotal, formData.sillaDeRuedas]
  );

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Escala de Barthel (Valoración de Dependencia)
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.entries(barthelOptions).map(([name, options]) => (
            <Grid item xs={12} sm={6} key={name}>
              <FormControl fullWidth>
                <InputLabel>{name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}</InputLabel>
                <Select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  label={name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.sillaDeRuedas}
                  onChange={handleSillaDeRuedasChange}
                  color="primary"
                />
              }
              label="Uso silla de ruedas"
            />
          </Grid>

          <Grid item xs={12}>
            <Alert severity={dependencyInfo.severity} sx={{ mt: 2 }}>
              <Typography variant="h6">
                Puntaje Total: {formData.puntajeTotal} / {formData.sillaDeRuedas ? '90' : '100'}
              </Typography>
              <Typography>
                Nivel de Dependencia: {dependencyInfo.level}
              </Typography>
            </Alert>
          </Grid>
        </Grid>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ mt: 3 }}
          fullWidth
        >
          Guardar Evaluación
        </Button>
      </form>
    </Paper>
  );
};

export default BarthelScale;