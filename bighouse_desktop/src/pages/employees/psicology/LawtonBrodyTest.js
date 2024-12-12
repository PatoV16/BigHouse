import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LawtonBrodyScale = () => {
  const [formData, setFormData] = useState({
    usoTelefono: 0,
    hacerCompras: 0,
    prepararComida: 0,
    cuidadoCasa: 0,
    lavadoRopa: 0,
    usoTransporte: 0,
    responsabilidadMedicacion: 0,
    capacidadDinero: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const calculateTotal = () => {
    return Object.values(formData).reduce((a, b) => a + b, 0);
  };

  const lawtonOptions = [
    { value: 0, label: 'Dependencia Total' },
    { value: 1, label: 'Dependencia Severa' },
    { value: 2, label: 'Dependencia Moderada' },
    { value: 3, label: 'Independencia' }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Escala de Lawton y Brody (Actividades Instrumentales)</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          {[
            { name: 'usoTelefono', label: 'Uso de Teléfono' },
            { name: 'hacerCompras', label: 'Hacer Compras' },
            { name: 'prepararComida', label: 'Preparar Comida' },
            { name: 'cuidadoCasa', label: 'Cuidado de Casa' },
            { name: 'lavadoRopa', label: 'Lavado de Ropa' },
            { name: 'usoTransporte', label: 'Uso de Transporte' },
            { name: 'responsabilidadMedicacion', label: 'Responsabilidad Medicación' },
            { name: 'capacidadDinero', label: 'Capacidad de Manejar Dinero' }
          ].map((item) => (
            <div key={item.name} className="mb-4">
              <label className="block mb-2">{item.label}</label>
              <select 
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {lawtonOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          
          <div className="mt-4 font-bold">
            Puntaje Total: {calculateTotal()} / 24
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LawtonBrodyScale;