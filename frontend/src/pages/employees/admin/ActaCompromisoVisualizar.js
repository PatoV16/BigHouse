import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ActaCompromisoVisualizarStyle.css";
import { useNavigate } from "react-router-dom";

const ActaCompromisoVisualizar = () => {
  const { idPaciente } = useParams();
  const [pacienteData, setPacienteData] = useState(null);
  const [actaData, setActaData] = useState(null);
  const [empleadoData, setEmpleadoData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacienteResponse = await axios.get(
          `http://localhost:3000/pacientes/${idPaciente}`
        );
        setPacienteData(pacienteResponse.data);

        const actaResponse = await axios.get(
          `http://localhost:3000/actacompromiso/paciente/${idPaciente}`
        );
        if (!actaResponse.data) {
          console.log("No se encontraron actas, redirigiendo...");
          navigate(`/ActaCompromiso/${idPaciente}`);
        } else {
          setActaData(actaResponse.data);
        }
        
        

        const idEmpleado = localStorage.getItem("id_empleado");
        if (idEmpleado) {
          const empleadoResponse = await axios.get(
            `http://localhost:3000/empleados/${idEmpleado}`
          );
          setEmpleadoData(empleadoResponse.data);
        } else {
          setError("No se encontró el ID del empleado en localStorage.");
        }
      } catch (err) {
        setError("Hubo un error al obtener los datos.");
      }
    };

    if (idPaciente) {
      fetchData();
    }
  }, [idPaciente]);
  
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!pacienteData || !actaData || !empleadoData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <button className="home-button" onClick={() => navigate('/DashboardAdmin')}>Home</button>
      <div className="border border-gray-300 p-4 rounded-lg mb-4">
        <h2 className="font-bold mb-2">INSTRUCCIONES:</h2>
        <p className="text-sm">
          Cuando ingresa la persona adulta mayor al Centro Gerontológico Diurno
          suscribe una carta de compromiso, en la cual se compromete a respetar
          los reglamentos y códigos de convivencia existentes, aceptar el apoyo
          e intervención profesional que requiera durante su permanencia en el
          centro o servicio, de acuerdo a los derechos establecidos en la
          Constitución de Ecuador y en la Norma Técnica.
        </p>
      </div>

      <table className="table-fixed border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="border border-gray-300 p-2 bg-gray-100 font-bold text-center"
            >
              Ficha N° 7 CARTA DE COMPROMISO Y ACEPTACIÓN DEL USUARIO/A /
              RESPONSABLE O REFERENTE
              <br />
              (CONSENTIMIENTO INFORMADO)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="border border-gray-300 p-2 text-justify">
              Yo, <b>{pacienteData.nombre} {pacienteData.apellido}</b> , ingreso
              voluntariamente al Centro o Servicio para personas adultas
              mayores, a partir de la presente fecha (día/mes/año). Además,
              manifiesto que he sido informado/a de los reglamentos y códigos de
              convivencia existentes en el Centro Gerontológico,
              comprometiéndome a través de la presente a cumplir con las
              responsabilidades y deberes, así como a aceptar las acciones del
              Plan de Atención Integral Individual que el equipo técnico
              programe, y colaborar para que este se cumpla. Además, me
              comprometo a mantener las instalaciones, muebles y equipos en
              buen estado, dando el trato adecuado para su conservación.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              <b>NOMBRE PERSONA ADULTA MAYOR:</b>
              <div className="border-b border-gray-400 h-8 mt-2">
                {pacienteData.nombre} {pacienteData.apellido}
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <b>NOMBRE DE LA PERSONA QUE LLEVÓ AL ADULTO MAYOR:</b>
              <div className="border-b border-gray-400 h-8 mt-2">
                {actaData.nombreCompleto || "No disponible"}
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              <b>FIRMA/HUELLA DIGITAL:</b>
              <div className="border-b border-gray-400 h-8 mt-2"></div>
            </td>
            <td className="border border-gray-300 p-2">
              <b>FIRMA:</b>
              <div className="border-b border-gray-400 h-8 mt-2"></div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              <b>C.I.:</b>
              <div className="border-b border-gray-400 h-8 mt-2">
                {pacienteData.cedula || "No disponible"}
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <b>CI:</b>
              <div className="border-b border-gray-400 h-8 mt-2">
                {actaData.cedulaIdentidad || "No disponible"}
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="border border-gray-300 p-2">
              <b>RESPONSABLE DEL REGISTRO:</b>
              <div className="border-b border-gray-400 h-8 mt-2">
                {empleadoData.nombre} {empleadoData.apellido}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ActaCompromisoVisualizar;
