import React from 'react';
import useListarEmpleados from '../../components/logic/useListarEmpleados';
import Layout from '../../components/Layout';
import { Title } from '../../components/Reutilizables';
import { Button } from '../../components/Reutilizables';

function ListarEmpleadosPage() {
  const { empleados, loading, error, cargarEmpleados } = useListarEmpleados();

  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <Title text="Lista de Empleados" />
        <Button label="Recargar lista" variant="primary" onClick={cargarEmpleados} />
        
        {loading && <p className="text-gray-600">Cargando lista de empleados...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Apellido</th>
                  <th className="border p-2">Cédula</th>
                  <th className="border p-2">Cargo</th>
                  <th className="border p-2">Fecha de Contratación</th>
                  <th className="border p-2">Teléfono</th>
                  <th className="border p-2">Correo</th>
                  <th className="border p-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.id} className="hover:bg-gray-100">
                    <td className="border p-2">{empleado.nombre}</td>
                    <td className="border p-2">{empleado.apellido}</td>
                    <td className="border p-2">{empleado.cedula}</td>
                    <td className="border p-2">{empleado.cargo}</td>
                    <td className="border p-2">{empleado.fecha_contratacion}</td>
                    <td className="border p-2">{empleado.telefono}</td>
                    <td className="border p-2">{empleado.correo}</td>
                    <td className="border p-2">{empleado.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ListarEmpleadosPage;
