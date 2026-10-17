import { useState } from "react";
import Login from "./auth/Login";
import AdminDashboard from "./dashboards/AdminDashboard";
import EnfermeriaDashboard from "./dashboards/EnfermeriaDashboard";
import MedicoDashboard from "./dashboards/MedicoDashboard";
import NutriologoDashboard from "./dashboards/NutriologoDashboard";
import OdontologoDashboard from "./dashboards/OdontologoDashboard";
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