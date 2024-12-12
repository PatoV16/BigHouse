import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BarthelScale = () => {
  const [formData, setFormData] = useState({
    comer: 0, traslado: 0, aseoPersonal: 0, usoRetrete: 0, 
    bañarse: 0, desplazarse: 0, subirEscaleras: 0, vestirse: 0, 
    controlHeces: 0, controlOrina: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
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

const LawtonBrodyScale = () => {
  const [formData, setFormData] = useState({
    usoTelefono: 0, hacerCompras: 0, prepararComida: 0, 
    cuidadoCasa: 0, lavadoRopa: 0, usoTransporte: 0, 
    responsabilidadMedicacion: 0, capacidadDinero: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
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

const MiniMentalExam = () => {
  const [formData, setFormData] = useState({
    orientacionTiempo: 0, orientacionEspacio: 0, memoria: 0, 
    atencionCalculo: 0, memoriadiferida: 0, denominacion: 0, 
    repeticionFrase: 0, comprensionEjecucion: 0, lectura: 0, 
    escritura: 0, copiaDibujo: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
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

const GerontologicalDashboard = () => {
  const [activeScale, setActiveScale] = useState('barthel');

  const renderScale = () => {
    switch(activeScale) {
      case 'barthel':
        return <BarthelScale />;
      case 'lawtonBrody':
        return <LawtonBrodyScale />;
      case 'miniMental':
        return <MiniMentalExam />;
      default:
        return <BarthelScale />;
    }
  };

  return (
    <div className="dashboard-container p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Psicólogo Gerontológico</h2>
      
      <div className="flex mb-6">
        <button 
          className={`mr-4 p-2 rounded ${activeScale === 'barthel' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveScale('barthel')}
        >
          Escala de Barthel
        </button>
        <button 
          className={`mr-4 p-2 rounded ${activeScale === 'lawtonBrody' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveScale('lawtonBrody')}
        >
          Escala Lawton y Brody
        </button>
        <button 
          className={`p-2 rounded ${activeScale === 'miniMental' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveScale('miniMental')}
        >
          Mini Examen Mental
        </button>
      </div>

      {renderScale()}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notas e Interpretación</CardTitle>
        </CardHeader>
        <div className="p-4">
          <p>Interprete los resultados de las escalas de evaluación para determinar el nivel de dependencia y estado cognitivo del paciente.</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Barthel: 0-20 puntos indica dependencia total</li>
            <li>Lawton y Brody: 0-8 puntos refleja dependencia instrumental</li>
            <li>Mini Mental: 0-11 puntos sugiere deterioro cognitivo</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default GerontologicalDashboard;