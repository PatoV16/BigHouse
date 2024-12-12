import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const BarthelScale = () => {
  const { register, handleSubmit, watch } = useForm({ defaultValues: {
    comer: 0, traslado: 0, aseoPersonal: 0, usoRetrete: 0,
    banarse: 0, desplazarse: 0, subirEscaleras: 0, vestirse: 0,
    controlHeces: 0, controlOrina: 0
  }});

  const formData = watch();
  const calculateTotal = () => Object.values(formData).reduce((a, b) => parseInt(a) + parseInt(b), 0);

  const barthelOptions = [
    { value: 0, label: 'Dependencia Total' },
    { value: 5, label: 'Dependencia Severa' },
    { value: 10, label: 'Dependencia Moderada' },
    { value: 15, label: 'Dependencia Leve' },
    { value: 20, label: 'Independencia' }
  ];

  return (
    <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Escala de Barthel (Valoración de Dependencia)</h3>
      <form>
        {["comer", "traslado", "aseoPersonal", "usoRetrete", "banarse", "desplazarse", "subirEscaleras", "vestirse", "controlHeces", "controlOrina"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-2 text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <select 
              {...register(field)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              {barthelOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        ))}
        <div className="mt-4 text-lg font-bold text-gray-700">Puntaje Total: {calculateTotal()} / 100</div>
      </form>
    </div>
  );
};

const LawtonBrodyScale = () => {
  const { register, handleSubmit, watch } = useForm({ defaultValues: {
    usoTelefono: 0, hacerCompras: 0, prepararComida: 0,
    cuidadoCasa: 0, lavadoRopa: 0, usoTransporte: 0,
    responsabilidadMedicacion: 0, capacidadDinero: 0
  }});

  const formData = watch();
  const calculateTotal = () => Object.values(formData).reduce((a, b) => parseInt(a) + parseInt(b), 0);

  const lawtonOptions = [
    { value: 0, label: 'Dependencia Total' },
    { value: 1, label: 'Dependencia Severa' },
    { value: 2, label: 'Dependencia Moderada' },
    { value: 3, label: 'Independencia' }
  ];

  return (
    <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Escala de Lawton y Brody (Actividades Instrumentales)</h3>
      <form>
        {["usoTelefono", "hacerCompras", "prepararComida", "cuidadoCasa", "lavadoRopa", "usoTransporte", "responsabilidadMedicacion", "capacidadDinero"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-2 text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <select 
              {...register(field)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              {lawtonOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        ))}
        <div className="mt-4 text-lg font-bold text-gray-700">Puntaje Total: {calculateTotal()} / 24</div>
      </form>
    </div>
  );
};

const MiniMentalExam = () => {
  const { register, handleSubmit, watch } = useForm({ defaultValues: {
    orientacionTiempo: 0, orientacionEspacio: 0, memoria: 0,
    atencionCalculo: 0, memoriaDiferida: 0, denominacion: 0,
    repeticionFrase: 0, comprensionEjecucion: 0, lectura: 0,
    escritura: 0, copiaDibujo: 0
  }});

  const formData = watch();
  const calculateTotal = () => Object.values(formData).reduce((a, b) => parseInt(a) + parseInt(b), 0);

  const mentalExamOptions = [
    { value: 0, label: 'Incorrecto/No realizado' },
    { value: 1, label: 'Correcto/Realizado' }
  ];

  return (
    <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Mini Examen del Estado Mental (MMSE)</h3>
      <form>
        {["orientacionTiempo", "orientacionEspacio", "memoria", "atencionCalculo", "memoriaDiferida", "denominacion", "repeticionFrase", "comprensionEjecucion", "lectura", "escritura", "copiaDibujo"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-2 text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <select 
              {...register(field)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              {mentalExamOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        ))}
        <div className="mt-4 text-lg font-bold text-gray-700">Puntaje Total: {calculateTotal()} / 11</div>
      </form>
    </div>
  );
};

const GerontologicalDashboard = () => {
  const [activeScale, setActiveScale] = useState('barthel');

  return (
    <div className="dashboard-container bg-white p-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Dashboard Psicólogo Gerontológico</h2>
      <div className="flex justify-center space-x-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeScale === 'barthel' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setActiveScale('barthel')}
        >
          Escala de Barthel
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeScale === 'lawtonBrody' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setActiveScale('lawtonBrody')}
        >
          Escala Lawton y Brody
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeScale === 'miniMental' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setActiveScale('miniMental')}
        >
          Mini Examen Mental
        </button>
      </div>
      <div className="flex justify-center">
        {activeScale === 'barthel' && <BarthelScale />}
        {activeScale === 'lawtonBrody' && <LawtonBrodyScale />}
        {activeScale === 'miniMental' && <MiniMentalExam />}
      </div>
    </div>
  );
};

export default GerontologicalDashboard;
