import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MiniMentalExam = () => {
  const [formData, setFormData] = useState({
    orientacionTiempo: 0,
    orientacionEspacio: 0,
    memoria: 0,
    atencionCalculo: 0,
    memoriadiferida: 0,
    denominacion: 0,
    repeticionFrase: 0,
    comprensionEjecucion: 0,
    lectura: 0,
    escritura: 0,
    copiaDibujo: 0
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

  const mentalExamOptions = [
    { value: 0, label: 'Incorrecto/No realizado' },
    { value: 1, label: 'Correcto/Realizado' }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Mini Examen del Estado Mental (MMSE)</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          {[
            { name: 'orientacionTiempo', label: 'Orientación en Tiempo' },
            { name: 'orientacionEspacio', label: 'Orientación en Espacio' },
            { name: 'memoria', label: 'Memoria Inmediata' },
            { name: 'atencionCalculo', label: 'Atención y Cálculo' },
            { name: 'memoriadiferida', label: 'Memoria Diferida' },
            { name: 'denominacion', label: 'Denominación' },
            { name: 'repeticionFrase', label: 'Repetición de Frase' },
            { name: 'comprensionEjecucion', label: 'Comprensión y Ejecución' },
            { name: 'lectura', label: 'Lectura' },
            { name: 'escritura', label: 'Escritura' },
            { name: 'copiaDibujo', label: 'Copia de Dibujo' }
          ].map((item) => (
            <div key={item.name} className="mb-4">
              <label className="block mb-2">{item.label}</label>
              <select 
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {mentalExamOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          
          <div className="mt-4 font-bold">
            Puntaje Total: {calculateTotal()} / 11
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MiniMentalExam;