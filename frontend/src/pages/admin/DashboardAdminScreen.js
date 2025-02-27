import React from "react";
import Layout from '../../components/Layout';
import { Title, Subtitle, Button, AlertMessage } from '../../components/Reutilizables';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="space-y-6">

                {/* Encabezado */}
                <Title text="Bienvenido, Administrador" />

                {/* Acciones Rápidas */}
                <div className="flex space-x-4">
                    <Button label="Registrar Empleado" variant="primary" onClick={() => navigate('/registrarEmpleado')} />
                    <Button label="Listar Empleados" variant="secondary" onClick={() => navigate('/list')} />
                    <Button label="Asistencia" variant="primary" onClick={() => navigate('/registrarAsistenciaPaciente')} />
                    <Button label="Avisos" variant="secondary" onClick={() => navigate('/list')} />
                    <Button label="Acta" variant="secondary" onClick={() => navigate('/registrarActaCompromiso')} />
                    <Button label="Registrar Paciente" variant="secondary" onClick={() => navigate('/registrarPaciente')} />
                    <Button label="Referencia" variant="secondary" onClick={() => navigate('/referencia')} />
                </div>

                {/* Resumen de Empleados */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold">Total Empleados</h3>
                        <p className="text-2xl font-bold">120</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold">Activos</h3>
                        <p className="text-2xl font-bold">98</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold">Inactivos</h3>
                        <p className="text-2xl font-bold">22</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;