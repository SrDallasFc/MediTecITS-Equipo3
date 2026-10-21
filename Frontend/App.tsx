import { useState } from "react";
import Login from "./inicio_de_sesion/Login";
import AdminDashboard from "./administracion/AdminDashboard";
import EnfermeriaDashboard from "./atencion_enfermeria/EnfermeriaDashboard";
import MedicoDashboard from "./consulta_medica/MedicoDashboard";
import NutriologoDashboard from "./consulta_nutricional/NutriologoDashboard";
import OdontologoDashboard from "./consulta_odontologica/OdontologoDashboard";
import KioscoApp from "./kiosco/KioscoApp";

export default function App() {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [isKioscoActive, setIsKioscoActive] = useState(false);

  const handleLogout = () => {
    setActiveRole(null);
    setIsKioscoActive(false);
  };

  // 1. Interfaz de Kiosco para Estudiantes (Terminal de Autoservicio)
  if (isKioscoActive) {
    return <KioscoApp onExit={handleLogout} />;
  }

  // 2. Interfaces de Roles Profesionales
  if (activeRole === "administrador") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (activeRole === "enfermeria") {
    return <EnfermeriaDashboard onLogout={handleLogout} />;
  }

  if (activeRole === "medico") {
    return <MedicoDashboard onLogout={handleLogout} />;
  }

  if (activeRole === "nutriologo") {
    return <NutriologoDashboard onLogout={handleLogout} />;
  }

  if (activeRole === "odontologo") {
    return <OdontologoDashboard onLogout={handleLogout} />;
  }

  // 3. Interfaz de Login General
  return (
    <Login
      onLoginSuccess={(role) => setActiveRole(role)}
      onOpenKiosco={() => setIsKioscoActive(true)}
    />
  );
}