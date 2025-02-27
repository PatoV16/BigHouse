import React from 'react';
import useActaCompromisoForm from '../../components/logic/useActaCompromisoForm';
import { Title, Button, AlertMessage, InputField, SelectField } from '../../components/Reutilizables';
import Layout from '../../components/Layout';

const ActaCompromisoForm = ({ initialData = {} }) => {
  const { formData, handleChange, handleSubmit, loading, error, pacientes = [] } = useActaCompromisoForm(initialData);

  return (
    <Layout>
      <Title text={formData.id ? 'Actualizar Acta de Compromiso' : 'Registrar Acta de Compromiso'} />

      <SelectField 
  label="Paciente"
  name="id_paciente"
  value={formData.id_paciente || ''}
  options={pacientes.map(paciente => ({
    value: paciente.id_paciente, // Asegúrate de que este es el campo correcto
    label: `${paciente.nombre} ${paciente.apellido || ''}`
  }))}
  onChange={handleChange}
  required
/>


      <InputField label="Nombre Completo" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
      <InputField label="Cédula de Identidad" name="cedulaIdentidad" value={formData.cedulaIdentidad} onChange={handleChange} required />
      <InputField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} required />
      <InputField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} required />

      {error && <AlertMessage message={typeof error === 'object' ? error.message || 'Ocurrió un error' : error} type="error" />}


      <Button 
        label={loading ? 'Guardando...' : 'Guardar'}
        type="button"
        variant={loading ? 'secondary' : 'primary'}
        onClick={handleSubmit}
        disabled={loading}
      />
    </Layout>
  );
};

export default ActaCompromisoForm;
