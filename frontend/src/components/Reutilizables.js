import React from 'react';
import '../components/Styles.css'
// 🎨 Componente para Botones
export const Button = ({ label, type = "button", variant = "primary", onClick }) => {
  const styles = {
    primary: "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",
    secondary: "bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600",
    cancel: "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
  };

  return (
    <button type={type} className={styles[variant]} onClick={onClick}>
      {label}
    </button>
  );
};

// 🏷️ Etiqueta para Botón (opcional si se requiere en algún lugar)
export const ButtonLabel = ({ text }) => (
  <span className="text-sm font-semibold">{text}</span>
);

// 🏆 Título Principal
export const Title = ({ text }) => (
  <h1 className="text-3xl font-bold text-gray-800">{text}</h1>
);

// 📌 Subtítulo
export const Subtitle = ({ text }) => (
  <h2 className="text-xl font-semibold text-gray-600">{text}</h2>
);

// ✍️ Entrada de Texto Reutilizable
export const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '' }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="text-sm font-semibold">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
    />
  </div>
);

// 🔽 Campo Select Reutilizable
// Components/Reutilizables/SelectField.jsx
export const SelectField = ({ label, name, value, options, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Seleccione una opción</option>
        {options && options.length > 0 ? (
          options.map((option) => {
            // Asegúrate de manejar tanto valores simples como objetos
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })
        ) : (
          <option disabled>No hay opciones disponibles</option>
        )}
      </select>
    </div>
  );
};

// ⚠️ Mensaje de Alerta
export const AlertMessage = ({ message, type }) => {
  if (!message) return null;

  const alertStyles = type === 'success' 
    ? 'bg-green-200 text-green-800'
    : 'bg-red-200 text-red-800';

  return (
    <div className={`p-4 rounded-md ${alertStyles}`}>
      <p>{message}</p>
    </div>
  );
};

