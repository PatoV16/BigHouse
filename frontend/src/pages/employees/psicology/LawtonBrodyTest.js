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
  Alert
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LawtonBrodyScale = ({ idPaciente }) => {
  const [formData, setFormData] = useState({
    usoTelefono: 0,
    hacerCompras: 0,
    prepararComida: 0,
    cuidadoCasa: 0,
    lavadoRopa: 0,
    usoTransporte: 0,
    responsabilidadMedicacion: 0,
    capacidadDinero: 0,
    puntajeTotal: 0
  });
  const navigate = useNavigate();
  const lawtonOptions = {
    usoTelefono: [
      { value: 0, label: 'Incapaz de utilizar el teléfono' },
      { value: 1, label: 'Puede contestar el teléfono pero no marcar' },
      { value: 2, label: 'Puede marcar algunos números conocidos' },
      { value: 3, label: 'Utiliza el teléfono por iniciativa propia' }
    ],
    hacerCompras: [
      { value: 0, label: 'Totalmente incapaz de hacer compras' },
      { value: 1, label: 'Necesita compañía para realizar cualquier compra' },
      { value: 2, label: 'Realiza con autonomía pequeñas compras' },
      { value: 3, label: 'Realiza todas las compras necesarias con independencia' }
    ],
    prepararComida: [
      { value: 0, label: 'Necesita que le preparen y sirvan la comida' },
      { value: 1, label: 'Calienta y sirve comidas preparadas' },
      { value: 2, label: 'Prepara comidas si le proporcionan ingredientes' },
      { value: 3, label: 'Planea, prepara y sirve comidas adecuadas independientemente' }
    ],
    cuidadoCasa: [
      { value: 0, label: 'No participa en ninguna labor doméstica' },
      { value: 1, label: 'Necesita ayuda en todas las tareas de la casa' },
      { value: 2, label: 'Realiza tareas ligeras pero no mantiene un nivel de limpieza adecuado' },
      { value: 3, label: 'Mantiene la casa solo o con ayuda ocasional' }
    ],
    lavadoRopa: [
      { value: 0, label: 'Todo el lavado de ropa debe ser realizado por otros' },
      { value: 1, label: 'Lava pequeñas prendas' },
      { value: 2, label: 'Lava por sí solo toda su ropa' },
      { value: 3, label: 'Lava por sí solo toda su ropa y la de otros' }
    ],
    usoTransporte: [
      { value: 0, label: 'No viaja en absoluto' },
      { value: 1, label: 'Viaja en transporte público/taxi cuando va acompañado' },
      { value: 2, label: 'Utiliza transporte público/taxi independientemente' },
      { value: 3, label: 'Conduce vehículo propio' }
    ],
    responsabilidadMedicacion: [
      { value: 0, label: 'No es capaz de administrarse medicación' },
      { value: 1, label: 'Toma la medicación si se la preparan previamente' },
      { value: 2, label: 'Es capaz de tomar su medicación a la hora y dosis correcta' },
      { value: 3, label: 'Es responsable en el uso de la medicación en dosis y horarios' }
    ],
    capacidadDinero: [
      { value: 0, label: 'Incapaz de manejar dinero' },
      { value: 1, label: 'Maneja gastos cotidianos pero necesita ayuda con operaciones mayores' },
      { value: 2, label: 'Maneja sus asuntos financieros con independencia' },
      { value: 3, label: 'Se encarga de sus asuntos económicos por completo' }
    ]
  };

  const getDependencyLevel = (score) => {
    if (score <= 8) return { level: 'Dependencia Total', severity: 'error' };
    if (score <= 16) return { level: 'Dependencia Moderada', severity: 'warning' };
    if (score <= 24) return { level: 'Independencia', severity: 'success' };
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
      uso_telefono: formData.usoTelefono,
      hacer_compras: formData.hacerCompras,
      preparar_comida: formData.prepararComida,
      cuidado_casa: formData.cuidadoCasa,
      lavado_ropa: formData.lavadoRopa,
      uso_transporte: formData.usoTransporte,
      responsabilidad_medicacion: formData.responsabilidadMedicacion,
      capacidad_dinero: formData.capacidadDinero,
      puntaje_total: formData.puntajeTotal
    };
    
    try {
      const response = await axios.post('http://localhost:3000/lawton-brody', dataToSend);
      alert('Evaluación guardada exitosamente');
      navigate('/DashboardPsicology');
    } catch (error) {
      alert('Error al guardar la evaluación: ' + error.message);
    }
  };

  const dependencyInfo = useMemo(() => 
    getDependencyLevel(formData.puntajeTotal),
    [formData.puntajeTotal]
  );

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Escala de Lawton y Brody (Actividades Instrumentales)
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.entries(lawtonOptions).map(([name, options]) => (
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
            <Alert severity={dependencyInfo?.severity} sx={{ mt: 2 }}>
              <Typography variant="h6">
                Puntaje Total: {formData.puntajeTotal} / 24
              </Typography>
              <Typography>
                Nivel de Dependencia: {dependencyInfo?.level}
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

export default LawtonBrodyScale;