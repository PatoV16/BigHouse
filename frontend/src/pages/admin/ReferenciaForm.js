import React, { useState } from 'react';
import useReferenciaForm from '../../components/logic/useReferenciaForm';
import { Button, InputField, SelectField, AlertMessage, Title } from '../../components/Reutilizables';

const ReferenciaForm = ({ initialData }) => {
  const { formData, handleChange, handleSubmit, loading, error, pacientes, loadingPacientes } = useReferenciaForm(initialData);
  const [message] = useState(null);
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <Title text={formData.id ? 'Editar Referencia' : 'Nueva Referencia'} />
      
      {/* Mensaje de Error o Éxito */}
      <AlertMessage message={message} type={error ? 'error' : 'success'} />

      {/* Select de Pacientes */}
      <SelectField 
        label="Paciente"
        name="id_paciente"
        value={formData.id_paciente}
        options={pacientes.map(paciente => ({
          value: paciente.id_paciente,
          label: `${paciente.nombre} ${paciente.apellido || ''}`
        }))}
        onChange={handleChange}
        required
        disabled={loadingPacientes}
      />

      {/* Otros campos del formulario */}
      <InputField
        label="Zona"
        name="zona"
        value={formData.zona}
        onChange={handleChange}
      />

      <InputField
        label="Distrito"
        name="distrito"
        value={formData.distrito}
        onChange={handleChange}
      />
      
      <InputField
        label="Ciudad"
        name="ciudad"
        value={formData.ciudad}
        onChange={handleChange}
      />
      
      <InputField
        label="Canton"
        name="canton"
        value={formData.canton}
        onChange={handleChange}
      />

      <InputField
        label="Parroquia"
        name="parroquia"
        value={formData.parroquia}
        onChange={handleChange}
      />

      <InputField
        label="Nombre de la Institución"
        name="nombreInstitucion"
        value={formData.nombreInstitucion}
        onChange={handleChange}
      />

      <InputField
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
      />
      
      <InputField
        label="Teléfono"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
      />
      
      <InputField
        label="Razón Social"
        name="razonSocial"
        value={formData.razonSocial}
        onChange={handleChange}
      />
      
      <InputField
        label="Director/Coordinador"
        name="directorCoordinador"
        value={formData.directorCoordinador}
        onChange={handleChange}
      />
      
      <InputField
        label="Familiar Acompañante"
        name="familiarAcompanante"
        value={formData.familiarAcompanante}
        onChange={handleChange}
      />

      <InputField
        label="Institución Transfiere"
        name="institucionTransfiere"
        value={formData.institucionTransfiere}
        onChange={handleChange}
      />
      
      <InputField
        label="Modalidad de Servicios"
        name="modalidadServicios"
        value={formData.modalidadServicios}
        onChange={handleChange}
      />
      
      <InputField
        label="Motivo de Referencia"
        name="motivoReferencia"
        value={formData.motivoReferencia}
        onChange={handleChange}
      />
      
      <InputField
        label="Profesional que Refiera"
        name="profesionalRefiere"
        value={formData.profesionalRefiere}
        onChange={handleChange}
      />
      
      <InputField
        label="Personal Acompañante"
        name="personalAcompanante"
        value={formData.personalAcompanante}
        onChange={handleChange}
      />
      
      <InputField
        label="Teléfono Fijo"
        name="telefonoFijo"
        value={formData.telefonoFijo}
        onChange={handleChange}
      />
      
      <InputField
        label="Teléfono Celular"
        name="telefonoCelular"
        value={formData.telefonoCelular}
        onChange={handleChange}
      />

      <InputField
        label="Recomendaciones"
        name="recomendaciones"
        value={formData.recomendaciones}
        onChange={handleChange}
      />

      <InputField
        label="Fecha"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        type="date"
      />

      <Button
        label={loading ? 'Guardando...' : 'Guardar'}
        type="submit"
        variant="primary"
        disabled={loading || loadingPacientes}
      />
    </form>
  );
};

export default ReferenciaForm;
