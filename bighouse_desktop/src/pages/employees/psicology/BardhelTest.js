import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BarthelScale = () => {
  const [formData, setFormData] = useState({
    comer: 0,
    traslado: 0,
    aseoPersonal: 0,
    usoRetrete: 0,
    bañarse: 0,
    desplazarse: 0,
    subirEscaleras: 0,
    vestirse: 0,
    controlHeces: 0,
    controlOrina: 0
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

  const barthelOptions = [
    { value: 0, label: 'Dependencia Total' },
    { value: 5, label: 'Dependencia Severa' },
    { value: 10, label: 'Dependencia Moderada' },
    { value: 15, label: 'Dependencia Leve' },
    { value: 20, label: 'Independencia' }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Escala de Barthel (Valoración de Dependencia)</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          {[
            { name: 'comer', label: 'Comer' },
            { name: 'traslado', label: 'Traslado Silla/Cama' },
            { name: 'aseoPersonal', label: 'Aseo Personal' },
            { name: 'usoRetrete', label: 'Uso del Retrete' },
            { name: 'bañarse', label: 'Bañarse' },
            { name: 'desplazarse', label: 'Desplazamiento' },
            { name: 'subirEscaleras', label: 'Subir Escaleras' },
            { name: 'vestirse', label: 'Vestirse' },
            { name: 'controlHeces', label: 'Control de Heces' },
            { name: 'controlOrina', label: 'Control de Orina' }
          ].map((item) => (
            <div key={item.name} className="mb-4">
              <label className="block mb-2">{item.label}</label>
              <select 
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {barthelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          
          <div className="mt-4 font-bold">
            Puntaje Total: {calculateTotal()} / 100
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BarthelScale;