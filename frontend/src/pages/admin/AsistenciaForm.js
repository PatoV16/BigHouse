import React from 'react';
import useAsistenciaForm from '../../components/logic/useAsistenciaForm';
import { Title, Button, AlertMessage, InputField, SelectField } from '../../components/Reutilizables';
import Layout from '../../components/Layout'; // Importa el Layout

const AsistenciaForm = ({ initialData = {} }) => {
  const { formData, handleChange, handleSubmit, loading, error, pacientes = [] } = useAsistenciaForm(initialData);

  return (
    <Layout> {/* Envuelve el contenido en el Layout */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <Title text={formData.id ? 'Actualizar Asistencia' : 'Registrar Asistencia'} />

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
        />

        <InputField label="Semana Inicio" name="semanaInicio" value={formData.semanaInicio} onChange={handleChange} required />
        <InputField label="Semana Fin" name="semanaFin" value={formData.semanaFin} onChange={handleChange} required />
        <InputField label="Mes" name="mes" value={formData.mes} onChange={handleChange} required />
        <InputField label="Año" name="anio" value={formData.anio} onChange={handleChange} type="number" required />
        <InputField label="Horario de Trabajo" name="horarioTrabajo" value={formData.horarioTrabajo} onChange={handleChange} required />
        <InputField label="Nombre del Centro" name="nombreCentro" value={formData.nombreCentro} onChange={handleChange} required />
        <InputField label="Modalidad de Atención" name="modalidadAtencion" value={formData.modalidadAtencion} onChange={handleChange} required />
        <InputField label="Distrito" name="distrito" value={formData.distrito} onChange={handleChange} required />

        <div className="space-y-2">
          <label className="text-sm font-semibold">Días de Asistencia (Lunes a Viernes):</label>
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((dia, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.diasAsistencia[index]}
                onChange={() => handleChange({ target: { name: 'diasAsistencia', value: index } })}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>{dia}</span>
            </label>
          ))}
        </div>

        {error && <AlertMessage message={error} type="error" />}

        <Button 
          label={loading ? 'Guardando...' : 'Guardar'}
          type="submit"
          variant={loading ? 'secondary' : 'primary'}
          disabled={loading}
        />
      </form>
    </Layout>
  );
};

export default AsistenciaForm;