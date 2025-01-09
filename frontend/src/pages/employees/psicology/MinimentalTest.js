import React, { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Alert
} from '@mui/material';
import axios from 'axios';

const MiniMentalExam = ({ idPaciente }) => {
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
    copiaDibujo: 0,
    puntajeTotal: 0
  });

  const mentalExamOptions = {
    orientacionTiempo: [
      { value: 0, label: 'No orientado en tiempo' },
      { value: 1, label: 'Parcialmente orientado' },
      { value: 2, label: 'Completamente orientado' }
    ],
    orientacionEspacio: [
      { value: 0, label: 'No orientado en espacio' },
      { value: 1, label: 'Parcialmente orientado' },
      { value: 2, label: 'Completamente orientado' }
    ],
    memoria: [
      { value: 0, label: 'No recuerda ninguna palabra' },
      { value: 1, label: 'Recuerda 1-2 palabras' },
      { value: 2, label: 'Recuerda 3 palabras' }
    ],
    atencionCalculo: [
      { value: 0, label: 'No realiza cálculos' },
      { value: 1, label: 'Realiza 1-2 cálculos correctos' },
      { value: 2, label: 'Realiza 3 o más cálculos correctos' }
    ],
    memoriadiferida: [
      { value: 0, label: 'No recuerda palabras' },
      { value: 1, label: 'Recuerda parcialmente' },
      { value: 2, label: 'Recuerda completamente' }
    ],
    denominacion: [
      { value: 0, label: 'No identifica objetos' },
      { value: 1, label: 'Identifica parcialmente' },
      { value: 2, label: 'Identifica correctamente' }
    ],
    repeticionFrase: [
      { value: 0, label: 'No repite' },
      { value: 1, label: 'Repite parcialmente' },
      { value: 2, label: 'Repite correctamente' }
    ],
    comprensionEjecucion: [
      { value: 0, label: 'No comprende/ejecuta' },
      { value: 1, label: 'Ejecuta parcialmente' },
      { value: 2, label: 'Ejecuta correctamente' }
    ],
    lectura: [
      { value: 0, label: 'No lee' },
      { value: 1, label: 'Lee con dificultad' },
      { value: 2, label: 'Lee correctamente' }
    ],
    escritura: [
      { value: 0, label: 'No escribe' },
      { value: 1, label: 'Escribe con errores' },
      { value: 2, label: 'Escribe correctamente' }
    ],
    copiaDibujo: [
      { value: 0, label: 'No copia' },
      { value: 1, label: 'Copia con errores' },
      { value: 2, label: 'Copia correctamente' }
    ]
  };

  const getEstadoCognitivo = (score) => {
    if (score <= 9) return { level: 'Deterioro Cognitivo Severo', severity: 'error' };
    if (score <= 15) return { level: 'Deterioro Cognitivo Moderado', severity: 'warning' };
    if (score <= 19) return { level: 'Deterioro Cognitivo Leve', severity: 'info' };
    return { level: 'Normal', severity: 'success' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: parseInt(value, 10)
      };

      const totalScore = Object.entries(newData)
        .filter(([key]) => key !== 'puntajeTotal')
        .reduce((sum, [_, value]) => sum + value, 0);

      return {
        ...newData,
        puntajeTotal: totalScore
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = {
      id_paciente: idPaciente,
      orientacion_tiempo: formData.orientacionTiempo,
      orientacion_espacio: formData.orientacionEspacio,
      memoria: formData.memoria,
      atencion_calculo: formData.atencionCalculo,
      memoria_diferida: formData.memoriadiferida,
      denominacion: formData.denominacion,
      repeticion_frase: formData.repeticionFrase,
      comprension_ejecucion: formData.comprensionEjecucion,
      lectura: formData.lectura,
      escritura: formData.escritura,
      copia_dibujo: formData.copiaDibujo,
      puntaje_total: formData.puntajeTotal
    };
    
    try {
      await axios.post('http://localhost:3000/mini-examen', dataToSend);
      alert('Evaluación guardada exitosamente');
    } catch (error) {
      alert('Error al guardar la evaluación: ' + error.message);
    }
  };

  const estadoCognitivo = useMemo(() => 
    getEstadoCognitivo(formData.puntajeTotal),
    [formData.puntajeTotal]
  );

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Mini Examen del Estado Mental (MMSE)
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.entries(mentalExamOptions).map(([name, options]) => (
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
            <Alert severity={estadoCognitivo.severity} sx={{ mt: 2 }}>
              <Typography variant="h6">
                Puntaje Total: {formData.puntajeTotal} / 22
              </Typography>
              <Typography>
                Estado Cognitivo: {estadoCognitivo.level}
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

export default MiniMentalExam;