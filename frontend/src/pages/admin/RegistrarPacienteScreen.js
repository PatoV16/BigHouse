import React from "react";
import { Button, InputField, SelectField, AlertMessage } from "../../components/Reutilizables";
import useRegistroPaciente from "../../components/logic/useRegistroPacientes"; // Importa el hook

const RegistroPaciente = () => {
  const {
    formData,
    loading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  } = useRegistroPaciente(); // Usa el hook

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      {error && <AlertMessage message={error} type="error" />}
      {successMessage && <AlertMessage message={successMessage} type="success" />}
      
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <InputField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <InputField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
        <InputField label="Cédula" name="cedula" value={formData.cedula} onChange={handleChange} required />
        <InputField name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} type="date" />
        <SelectField label="Estado Civil" name="estado_civil" options={["Soltero", "Casado", "Divorciado", "Viudo"]} onChange={handleChange} />
        <InputField label="Nivel de Instrucción" name="nivel_instruccion" value={formData.nivel_instruccion} onChange={handleChange} required />
        <InputField label="Profesión/Ocupación" name="profesion_ocupacion" value={formData.profesion_ocupacion} onChange={handleChange} required />
        <InputField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} required />
        <InputField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} required />
        <InputField name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} type="date" />
        
        {/* Botón de Enviar */}
        <Button type="submit" label={loading ? "Cargando..." : "Registrar Paciente"} variant="primary" />
      </form>
    </div>
  );
};

export default RegistroPaciente;
