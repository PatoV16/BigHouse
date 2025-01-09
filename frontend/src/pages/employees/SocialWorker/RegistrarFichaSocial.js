import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import './RegistrarFichaSocialStyle.css'
import axios from 'axios';

const RegistrarFichaSocial = () => {

  const { id_paciente } = useParams();
  const [formData, setFormData] = useState({
    ocupa_tiempo_libre: false,
    actividades_tiempo_libre: '',
    pertenece_asociacion: false,
    nombre_organizacion: '',
    frecuencia_acude_asociacion: '',
    actividad_asociacion: '',
    
    recibe_pension: false,
    tipo_pension: '',
    tiene_otros_ingresos: false,
    monto_otros_ingresos: '',
    fuente_ingresos: '',
    quien_cobra_ingresos: '',
    destino_recursos: '',
    
    tipo_vivienda: '',
    acceso_vivienda: '',
    
    se_alimenta_bien: false,
    numero_comidas_diarias: '',
    especificar_comidas: '',
    
    estado_salud: '',
    enfermedad_catastrofica: false,
    especificar_enfermedad: '',
    discapacidad: false,
    toma_medicamento_constante: false,
    especificar_medicamento: '',
    utiliza_ayuda_tecnica: false,
    especificar_ayuda_tecnica: '',
    
    desea_servicio_residencial: false,
    desea_servicio_diurno: false,
    desea_espacios_socializacion: false,
    desea_atencion_domiciliaria: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const fichaSocialData = {
      ...formData,
      id_paciente:id_paciente
    }

    try {
      const response = await  axios.post('http://localhost:3000/fichasocial', fichaSocialData);

      if (response.ok) {

        alert('Error al registrar la ficha social.');
      } else {
        alert('Ficha social registrada exitosamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión al servidor.');
    }
  };

  return (
    <div className="scroll-container">
      <form onSubmit={handleSubmit} className="bg-white p-8 w-full max-w-7xl grid grid-cols-2 gap-8">
        <h1 className="text-2xl font-semibold mb-6 col-span-2 text-center">Registro de Ficha Social</h1>

        {/* Red social de apoyo */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Red Social de Apoyo</h3>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="ocupa_tiempo_libre"
              name="ocupa_tiempo_libre"
              checked={formData.ocupa_tiempo_libre}
              onChange={handleInputChange}
            />
            <label htmlFor="ocupa_tiempo_libre">¿Ocupa su tiempo libre?</label>
          </div>

          <div className="space-y-2">
            <label>Actividades de tiempo libre</label>
            <input
              type="text"
              name="actividades_tiempo_libre"
              value={formData.actividades_tiempo_libre}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="pertenece_asociacion"
              name="pertenece_asociacion"
              checked={formData.pertenece_asociacion}
              onChange={handleInputChange}
            />
            <label htmlFor="pertenece_asociacion">¿Pertenece a alguna asociación?</label>
          </div>

          <div className="space-y-2">
            <label>Nombre de la organización</label>
            <input
              type="text"
              name="nombre_organizacion"
              value={formData.nombre_organizacion}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label>Frecuencia de asistencia</label>
            <input
              type="text"
              name="frecuencia_acude_asociacion"
              value={formData.frecuencia_acude_asociacion}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label>Actividad en la asociación</label>
            <input
              type="text"
              name="actividad_asociacion"
              value={formData.actividad_asociacion}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
        </section>

        {/* Situación económica */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Situación Económica</h3>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recibe_pension"
              name="recibe_pension"
              checked={formData.recibe_pension}
              onChange={handleInputChange}
            />
            <label htmlFor="recibe_pension">¿Recibe pensión?</label>
          </div>

          <div className="space-y-2">
            <label>Tipo de pensión</label>
            <input
              type="text"
              name="tipo_pension"
              value={formData.tipo_pension}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="tiene_otros_ingresos"
              name="tiene_otros_ingresos"
              checked={formData.tiene_otros_ingresos}
              onChange={handleInputChange}
            />
            <label htmlFor="tiene_otros_ingresos">¿Tiene otros ingresos?</label>
          </div>

          <div className="space-y-2">
            <label>Monto de otros ingresos</label>
            <input
              type="text"
              name="monto_otros_ingresos"
              value={formData.monto_otros_ingresos}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label>Fuente de ingresos</label>
            <input
              type="text"
              name="fuente_ingresos"
              value={formData.fuente_ingresos}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label>¿Quién cobra los ingresos?</label>
            <input
              type="text"
              name="quien_cobra_ingresos"
              value={formData.quien_cobra_ingresos}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label>Destino de los recursos</label>
            <input
              type="text"
              name="destino_recursos"
              value={formData.destino_recursos}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
        </section>

        {/* Vivienda */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Vivienda</h3>

          <div className="space-y-2">
            <label>Tipo de vivienda</label>
            <select
              name="tipo_vivienda"
              value={formData.tipo_vivienda}
              onChange={handleInputChange}
              className="border p-2 w-full"
            >
              <option value="propia">Propia</option>
              <option value="alquilada">Alquilada</option>
              <option value="familiar">Familiar</option>
            </select>
          </div>

          <div className="space-y-2">
            <label>Acceso a la vivienda</label>
            <input
              type="text"
              name="acceso_vivienda"
              value={formData.acceso_vivienda}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
        </section>

        {/* Nutrición */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Nutrición</h3>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="se_alimenta_bien"
              name="se_alimenta_bien"
              checked={formData.se_alimenta_bien}
              onChange={handleInputChange}
            />
            <label htmlFor="se_alimenta_bien">¿Se alimenta bien?</label>
          </div>

          <div className="space-y-2">
            <label>Número de comidas diarias</label>
            <input
              type="number"
              name="numero_comidas_diarias"
              value={formData.numero_comidas_diarias}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label>Especificar las comidas</label>
            <input
              type="text"
              name="especificar_comidas"
              value={formData.especificar_comidas}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
        </section>

        {/* Salud */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Salud</h3>

          <div className="space-y-2">
            <label>Estado de salud</label>
            <input
              type="text"
              name="estado_salud"
              value={formData.estado_salud}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enfermedad_catastrofica"
              name="enfermedad_catastrofica"
              checked={formData.enfermedad_catastrofica}
              onChange={handleInputChange}
            />
            <label htmlFor="enfermedad_catastrofica">¿Enfermedad catastrófica?</label>
          </div>

          <div className="space-y-2">
            <label>Especificar enfermedad</label>
            <input
              type="text"
              name="especificar_enfermedad"
              value={formData.especificar_enfermedad}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="discapacidad"
              name="discapacidad"
              checked={formData.discapacidad}
              onChange={handleInputChange}
            />
            <label htmlFor="discapacidad">¿Tiene discapacidad?</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="toma_medicamento_constante"
              name="toma_medicamento_constante"
              checked={formData.toma_medicamento_constante}
              onChange={handleInputChange}
            />
            <label htmlFor="toma_medicamento_constante">¿Toma medicamento constantemente?</label>
          </div>

          <div className="space-y-2">
            <label>Especificar medicamento</label>
            <input
              type="text"
              name="especificar_medicamento"
              value={formData.especificar_medicamento}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="utiliza_ayuda_tecnica"
              name="utiliza_ayuda_tecnica"
              checked={formData.utiliza_ayuda_tecnica}
              onChange={handleInputChange}
            />
            <label htmlFor="utiliza_ayuda_tecnica">¿Utiliza ayuda técnica?</label>
          </div>

          <div className="space-y-2">
            <label>Especificar ayuda técnica</label>
            <input
              type="text"
              name="especificar_ayuda_tecnica"
              value={formData.especificar_ayuda_tecnica}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
        </section>

        {/* Servicios requeridos */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Servicios Requeridos</h3>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="desea_servicio_residencial"
              name="desea_servicio_residencial"
              checked={formData.desea_servicio_residencial}
              onChange={handleInputChange}
            />
            <label htmlFor="desea_servicio_residencial">¿Desea servicio residencial?</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="desea_servicio_diurno"
              name="desea_servicio_diurno"
              checked={formData.desea_servicio_diurno}
              onChange={handleInputChange}
            />
            <label htmlFor="desea_servicio_diurno">¿Desea servicio diurno?</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="desea_espacios_socializacion"
              name="desea_espacios_socializacion"
              checked={formData.desea_espacios_socializacion}
              onChange={handleInputChange}
            />
            <label htmlFor="desea_espacios_socializacion">¿Desea espacios de socialización?</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="desea_atencion_domiciliaria"
              name="desea_atencion_domiciliaria"
              checked={formData.desea_atencion_domiciliaria}
              onChange={handleInputChange}
            />
            <label htmlFor="desea_atencion_domiciliaria">¿Desea atención domiciliaria?</label>
          </div>
        </section>

        <div className="col-span-2 text-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarFichaSocial;
