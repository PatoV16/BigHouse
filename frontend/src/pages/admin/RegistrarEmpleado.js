import React from 'react';
import useRegistrarEmpleadoForm from '../../components/logic/empleadoLogic';
import { Title, InputField, SelectField, Button, AlertMessage } from '../../components/Reutilizables'
import Layout from '../../components/Layout';

const cargoOptions = [
    "Médico", "Psicólogo", "Trabajador Social", "Enfermera", "Administrador",
    "Cocinero", "Terapista", "Cuidador", "Auxiliar de lavandería",
    "Servicios Generales", "Nutricionista"
];

const estadoOptions = ["Activo", "Inactivo"];

function RegistrarEmpleadoPage({ empleadoId }) {
    const { formData, error, successMessage, handleInputChange, handleSubmit } = useRegistrarEmpleadoForm(empleadoId);

    return (
        <Layout>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
                <Title text={empleadoId ? 'Actualizar empleado' : 'Registrar empleado'} />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField label="Nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
                    <InputField label="Apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} placeholder="Apellido" />
                    <InputField label="Cédula" name="cedula" value={formData.cedula} onChange={handleInputChange} placeholder="Cédula" />
                    <SelectField label="Cargo" name="cargo" options={cargoOptions} onChange={handleInputChange} />
                    <InputField label="Fecha de Contratación" name="fecha_contratacion" value={formData.fecha_contratacion} onChange={handleInputChange} type="date" />
                    <InputField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="Teléfono" />
                    <InputField label="Correo Electrónico" name="correo" value={formData.correo} onChange={handleInputChange} type="email" placeholder="Correo electrónico" />
                    <InputField label="Contraseña" name="contraseña" value={formData.contraseña} onChange={handleInputChange} type="password" placeholder="Contraseña" />
                    <SelectField label="Estado" name="estado" options={estadoOptions} onChange={handleInputChange} />
                    <Button type="submit" label={empleadoId ? 'Actualizar empleado' : 'Registrar empleado'} variant="primary" />
                </form>

                <AlertMessage message={error} type="error" />
                <AlertMessage message={successMessage} type="success" />
            </div>
        </Layout>
    );
}

export default RegistrarEmpleadoPage;
