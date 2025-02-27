import React from "react";
import { Home, Users, Calendar, FileText, Settings, Bell, Search, Menu } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#2B4C7E] to-[#567EBB] shadow-md">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-white font-semibold text-xl">Casa Grande</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-1.5">
              <Search className="h-4 w-4 text-white/80" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-transparent border-none text-white placeholder-white/60 focus:outline-none ml-2"
              />
            </div>
            <div className="relative">
              <Bell className="h-6 w-6 text-white cursor-pointer" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Panel Izquierdo */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="p-4 space-y-1">
            <NavItem icon={<Home size={20} />} label="Inicio" active />
            <NavItem icon={<Users size={20} />} label="Pacientes" />
            <NavItem icon={<Settings size={20} />} label="Configuración" />
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {children}
          </div>
        </main>

        {/* Panel Derecho */}
        <aside className="hidden xl:block w-80 bg-white border-l border-gray-200 overflow-y-auto p-4">
          <h3 className="font-semibold text-gray-700 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <ActivityItem 
              title="Nueva cita programada"
              description="Juan Pérez - Consulta General"
              time="Hace 5 minutos"
            />
            <ActivityItem 
              title="Historia clínica actualizada"
              description="María García - Cardiología"
              time="Hace 15 minutos"
            />
            <ActivityItem 
              title="Resultado de laboratorio"
              description="Carlos López - Análisis de sangre"
              time="Hace 1 hora"
            />
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>© 2025 MediCenter. Todos los derechos reservados.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#2B4C7E]">Términos</a>
            <a href="#" className="hover:text-[#2B4C7E]">Privacidad</a>
            <a href="#" className="hover:text-[#2B4C7E]">Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Componente para items de navegación
const NavItem = ({ icon, label, active }) => (
  <button 
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
      ${active 
        ? 'bg-[#2B4C7E] text-white' 
        : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

// Componente para items de actividad
const ActivityItem = ({ title, description, time }) => (
  <div className="border-l-4 border-[#2B4C7E] pl-3 py-1">
    <h4 className="font-medium text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
    <span className="text-xs text-gray-500">{time}</span>
  </div>
);

export default Layout;