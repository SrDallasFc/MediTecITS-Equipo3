import { FormEvent, useState } from "react";
import { Monitor, HelpCircle, ChevronRight, Lock, User } from "lucide-react";

// Base de usuarios preconfigurados según nómina/número de control
export const MOCK_ACCOUNTS: Record<string, { role: string; name: string; puesto: string }> = {
  "20101543": { role: "administrador", name: "Ing. Juan Pérez", puesto: "Administrador del Sistema" },
  "admin": { role: "administrador", name: "Ing. Juan Pérez", puesto: "Administrador del Sistema" },
  "18290312": { role: "enfermeria", name: "Lic. Laura Torres", puesto: "Enfermera y Triage" },
  "20101544": { role: "medico", name: "Dra. María Sánchez", puesto: "Médico General" },
  "17200445": { role: "nutriologo", name: "Mtra. Patricia López", puesto: "Nutrióloga Institucional" },
  "19302211": { role: "odontologo", name: "Dr. Carlos Ruiz", puesto: "Odontólogo General" },
};

interface LoginProps {
  onLoginSuccess: (role: string) => void;
  onOpenKiosco: () => void;
}

export default function Login({ onLoginSuccess, onOpenKiosco }: LoginProps) {
  const [controlNumber, setControlNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanNumber = controlNumber.trim().toLowerCase();

    if (!cleanNumber) {
      setMessage("Por favor ingresa tu número de control o nómina.");
      return;
    }
    if (!password.trim()) {
      setMessage("Por favor ingresa tu contraseña institucional.");
      return;
    }

    // El sistema busca el rol asignado al usuario en base a su nómina
    const account = MOCK_ACCOUNTS[cleanNumber];

    if (account) {
      setMessage("");
      onLoginSuccess(account.role);
    } else {
      setMessage("Credenciales no encontradas. Selecciona una cuenta de prueba a continuación.");
      setShowDemoAccounts(true);
    }
  }

  const handleQuickLogin = (num: string) => {
    setControlNumber(num);
    setPassword("123456");
    const account = MOCK_ACCOUNTS[num];
    if (account) {
      setMessage("");
      onLoginSuccess(account.role);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f8f7] px-4 py-10 sm:px-6">
      {/* Fondos decorativos difuminados */}
      <div
        aria-hidden="true"
        className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#0f766e]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-36 -right-20 h-96 w-96 rounded-full bg-[#14b8a6]/10 blur-3xl"
      />

      <section className="relative w-full max-w-[480px] overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_28px_80px_-28px_rgba(15,118,110,0.35)]">
        <div className="h-1.5 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#5eead4]" />

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <header className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f766e] shadow-[0_12px_24px_-10px_rgba(15,118,110,0.7)]">
              <span className="text-3xl font-light text-white" aria-hidden="true">
                +
              </span>
            </div>
            <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[#163a38]">
              MediTec<span className="text-[#0f8b81]">-ITS</span>
            </h1>
            <p className="mt-1.5 text-sm text-[#647876]">
              Sistema Institucional de Salud Integral
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="control-number"
                className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#2d4c49]"
              >
                <User size={16} className="text-[#0f766e]" />
                Número de control o nómina
              </label>
              <input
                id="control-number"
                name="controlNumber"
                type="text"
                value={controlNumber}
                onChange={(e) => {
                  setControlNumber(e.target.value);
                  setMessage("");
                }}
                autoComplete="username"
                placeholder="Ingresa tu número de control o nómina"
                required
                className="h-12 w-full rounded-xl border border-[#d6e3e1] bg-[#fbfdfd] px-4 text-[15px] text-[#173d39] outline-none transition placeholder:text-[#9aadaa] focus:border-[#0f8b81] focus:bg-white focus:ring-4 focus:ring-[#14b8a6]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#2d4c49]"
              >
                <Lock size={16} className="text-[#0f766e]" />
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  required
                  className="h-12 w-full rounded-xl border border-[#d6e3e1] bg-[#fbfdfd] px-4 pr-20 text-[15px] text-[#173d39] outline-none transition placeholder:text-[#9aadaa] focus:border-[#0f8b81] focus:bg-white focus:ring-4 focus:ring-[#14b8a6]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-0 px-4 text-xs font-semibold text-[#0f766e] hover:text-[#0b5c56] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f8b81]"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            {message && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600 animate-in fade-in">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-xl bg-[#0f766e] text-sm font-bold tracking-wide text-white shadow-[0_12px_24px_-12px_rgba(15,118,110,0.9)] transition hover:-translate-y-0.5 hover:bg-[#0b6963] hover:shadow-[0_16px_28px_-12px_rgba(15,118,110,0.75)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#14b8a6]/30 active:translate-y-0"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Acceso directo al Kiosco de Autoservicio */}
          <div className="mt-6 border-t border-[#edf3f2] pt-5">
            <button
              onClick={onOpenKiosco}
              className="group flex w-full items-center justify-between rounded-2xl border border-[#dce8e6] bg-[#f8fbfa] p-3.5 transition-all hover:border-[#0f766e] hover:bg-[#eaf7f5]"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0f766e] shadow-sm border border-[#dce8e6] group-hover:border-[#0f766e]">
                  <Monitor size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#163a38]">¿Eres estudiante?</p>
                  <p className="text-[11px] text-[#647876]">Acceder al Kiosco de turnos y atención médica</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#9aadaa] group-hover:text-[#0f766e] transition-colors" />
            </button>
          </div>

          {/* Selector de Cuentas de Demostración para evaluación */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#718683] hover:text-[#0f766e] transition-colors"
            >
              <HelpCircle size={14} />
              {showDemoAccounts ? "Ocultar cuentas de prueba" : "Ver cuentas de demostración"}
            </button>

            {showDemoAccounts && (
              <div className="mt-3 rounded-2xl border border-[#dce8e6] bg-[#fafcfb] p-3 text-left text-xs animate-in fade-in duration-200">
                <p className="font-semibold text-[#2d4c49] mb-2 text-center">
                  Haz clic en cualquier rol para autocompletar:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickLogin("20101543")}
                    className="p-2 bg-white rounded-xl border border-[#dce8e6] hover:border-[#0f766e] text-left transition-colors"
                  >
                    <p className="font-bold text-[#163a38]">Administrador</p>
                    <p className="text-[10px] text-[#647876]">Nómina: 20101543</p>
                  </button>
                  <button
                    onClick={() => handleQuickLogin("18290312")}
                    className="p-2 bg-white rounded-xl border border-[#dce8e6] hover:border-[#0f766e] text-left transition-colors"
                  >
                    <p className="font-bold text-[#163a38]">Enfermería</p>
                    <p className="text-[10px] text-[#647876]">Nómina: 18290312</p>
                  </button>
                  <button
                    onClick={() => handleQuickLogin("20101544")}
                    className="p-2 bg-white rounded-xl border border-[#dce8e6] hover:border-[#0f766e] text-left transition-colors"
                  >
                    <p className="font-bold text-[#163a38]">Médico</p>
                    <p className="text-[10px] text-[#647876]">Nómina: 20101544</p>
                  </button>
                  <button
                    onClick={() => handleQuickLogin("17200445")}
                    className="p-2 bg-white rounded-xl border border-[#dce8e6] hover:border-[#0f766e] text-left transition-colors"
                  >
                    <p className="font-bold text-[#163a38]">Nutrióloga</p>
                    <p className="text-[10px] text-[#647876]">Nómina: 17200445</p>
                  </button>
                  <button
                    onClick={() => handleQuickLogin("19302211")}
                    className="p-2 bg-white rounded-xl border border-[#dce8e6] hover:border-[#0f766e] text-left transition-colors col-span-1 sm:col-span-2"
                  >
                    <p className="font-bold text-[#163a38]">Odontólogo</p>
                    <p className="text-[10px] text-[#647876]">Nómina: 19302211</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="border-t border-[#e5efed] bg-[#f9fcfb] px-6 py-4 text-center text-xs text-[#738985]">
          Acceso seguro al sistema de salud institucional • MediTec-ITS
        </footer>
      </section>
    </main>
  );
}

