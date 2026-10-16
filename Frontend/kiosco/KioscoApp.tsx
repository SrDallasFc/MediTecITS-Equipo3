import { useState, useEffect } from "react";
import { Activity, Apple, Stethoscope, CheckCircle2, ChevronRight, Delete } from "lucide-react";

export default function KioscoApp({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [matricula, setMatricula] = useState("");
  const [turno, setTurno] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNumPress = (num: string) => {
    if (matricula.length < 8) {
      setMatricula((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setMatricula((prev) => prev.slice(0, -1));
  };

  const handleBuscar = () => {
    if (matricula.length >= 8) {
      setStep(2);
    }
  };

  const handleSelectService = (servicePrefix: string) => {
    setTurno(`${servicePrefix}-${Math.floor(Math.random() * 90) + 10}`);
    setStep(3);
  };

  // Auto reset after 6 seconds on step 3
  useEffect(() => {
    if (step === 3) {
      const reset = setTimeout(() => {
        setStep(1);
        setMatricula("");
        setTurno("");
      }, 6000);
      return () => clearInterval(reset);
    }
  }, [step]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#f3f8f7] font-sans selection:bg-transparent">
      {/* Header */}
      <header className="h-24 bg-white border-b-2 border-[#0f766e] flex items-center justify-between px-10 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f766e] shadow-lg shadow-[#0f766e]/30">
            <span className="text-2xl font-light text-white" aria-hidden="true">+</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#163a38]">
              MediTec<span className="text-[#0f8b81]">-ITS</span>
            </h1>
            <p className="text-xs font-semibold text-[#647876]">Módulo de Registro Estudiantil</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#0f766e]">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs font-semibold text-[#647876] uppercase tracking-wider">
            {time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div aria-hidden="true" className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0f766e]/5 blur-[100px]" />
        <div aria-hidden="true" className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#14b8a6]/10 blur-[100px]" />

        {step === 1 && (
          <div className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl shadow-[#0f766e]/10 border border-[#dce8e6] p-8 md:p-10 relative z-10">
            <h2 className="text-2xl font-bold text-center text-[#163a38] mb-6">
              Ingresa tu Número de Control
            </h2>
            
            <div className="mb-8 text-center">
              <div className={`text-4xl md:text-5xl font-mono font-bold tracking-[0.25em] h-16 border-b-4 mx-auto w-4/5 flex items-center justify-center transition-colors ${
                matricula ? 'text-[#0f766e] border-[#0f766e]' : 'text-[#9aadaa] border-[#dce8e6]'
              }`}>
                {matricula || "--------"}
              </div>
              <p className="text-xs text-[#718683] mt-2 font-medium">
                {matricula.length} de 8 dígitos ingresados
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleNumPress(num.toString())}
                  className="h-16 text-2xl font-bold text-[#2d4c49] bg-[#f8fbfa] rounded-2xl border border-[#dce8e6] hover:bg-[#edf3f2] hover:border-[#9bc8c3] active:bg-[#dce8e6] transition-all transform active:scale-95 shadow-sm"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={onExit}
                className="h-16 text-sm font-bold text-[#647876] bg-transparent hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all"
              >
                Salir
              </button>
              <button
                onClick={() => handleNumPress("0")}
                className="h-16 text-2xl font-bold text-[#2d4c49] bg-[#f8fbfa] rounded-2xl border border-[#dce8e6] hover:bg-[#edf3f2] hover:border-[#9bc8c3] active:bg-[#dce8e6] transition-all transform active:scale-95 shadow-sm"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="h-16 flex items-center justify-center text-[#2d4c49] bg-[#f8fbfa] rounded-2xl border border-[#dce8e6] hover:bg-[#edf3f2] hover:border-[#9bc8c3] active:bg-[#dce8e6] transition-all transform active:scale-95 shadow-sm"
                aria-label="Borrar dígito"
              >
                <Delete size={26} />
              </button>
            </div>

            <button
              onClick={handleBuscar}
              disabled={matricula.length < 8}
              className="w-full h-16 rounded-2xl bg-[#0f766e] text-xl font-bold text-white shadow-lg shadow-[#0f766e]/30 disabled:bg-[#dce8e6] disabled:text-[#9aadaa] disabled:shadow-none transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              Continuar <ChevronRight size={26} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-4xl relative z-10 animate-in fade-in duration-300">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-[#0f766e] bg-[#eaf7f5] px-4 py-1.5 rounded-full uppercase tracking-wider">
                Estudiante verificado • {matricula}
              </span>
              <h2 className="text-3xl font-bold text-[#163a38] mt-3 mb-2">¿Qué servicio necesitas hoy?</h2>
              <p className="text-base text-[#647876]">Selecciona el área para generar tu turno de atención</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleSelectService('E')}
                className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-[#0f766e]/20 hover:border-[#0f766e] hover:bg-[#0f766e] shadow-xl shadow-[#0f766e]/10 transition-all transform hover:-translate-y-1.5"
              >
                <div className="h-24 w-24 rounded-full bg-[#edf3f2] group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors">
                  <Activity size={44} className="text-[#0f766e] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#163a38] group-hover:text-white text-center mb-1">Enfermería / Triage</h3>
                <p className="text-xs text-[#647876] group-hover:text-teal-100 text-center font-medium">Toma de signos vitales, malestar general o curaciones</p>
              </button>
              
              <button
                onClick={() => handleSelectService('N')}
                className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-[#0f766e]/20 hover:border-[#0f766e] hover:bg-[#0f766e] shadow-xl shadow-[#0f766e]/10 transition-all transform hover:-translate-y-1.5"
              >
                <div className="h-24 w-24 rounded-full bg-[#edf3f2] group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors">
                  <Apple size={44} className="text-[#0f766e] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#163a38] group-hover:text-white text-center mb-1">Nutrición</h3>
                <p className="text-xs text-[#647876] group-hover:text-teal-100 text-center font-medium">Evaluación corporal, peso y planes de alimentación</p>
              </button>

              <button
                onClick={() => handleSelectService('O')}
                className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-[#0f766e]/20 hover:border-[#0f766e] hover:bg-[#0f766e] shadow-xl shadow-[#0f766e]/10 transition-all transform hover:-translate-y-1.5"
              >
                <div className="h-24 w-24 rounded-full bg-[#edf3f2] group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors">
                  <Stethoscope size={44} className="text-[#0f766e] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#163a38] group-hover:text-white text-center mb-1">Odontología</h3>
                <p className="text-xs text-[#647876] group-hover:text-teal-100 text-center font-medium">Revisión dental, profilaxis y salud bucal</p>
              </button>
            </div>
            
            <div className="mt-10 text-center">
              <button
                onClick={() => setStep(1)}
                className="text-base font-semibold text-[#54706d] hover:text-[#2d4c49] transition-colors"
              >
                ← Corregir número de control
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-lg bg-white rounded-[36px] shadow-2xl shadow-[#0f766e]/20 border border-[#dce8e6] p-12 text-center relative z-10 animate-in zoom-in duration-300">
            <CheckCircle2 size={80} className="text-[#0f766e] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#163a38] mb-2">¡Tu turno ha sido registrado!</h2>
            <p className="text-xs text-[#647876] font-semibold uppercase tracking-wider mb-6">
              Matrícula: {matricula}
            </p>
            <div className="text-7xl font-mono font-black text-[#0f766e] tracking-tight mb-6 bg-[#f3f8f7] py-6 rounded-2xl border border-[#dce8e6]">
              {turno}
            </div>
            <p className="text-sm text-[#54706d] font-medium leading-relaxed max-w-sm mx-auto mb-8">
              Toma asiento en la sala de espera. Te llamarán en la pantalla por tu turno.
            </p>
            
            <button
              onClick={() => {
                setStep(1);
                setMatricula("");
                setTurno("");
              }}
              className="w-full py-3.5 bg-[#0f766e] hover:bg-[#0b5c56] text-white font-bold rounded-2xl transition-colors shadow-md shadow-[#0f766e]/20"
            >
              Finalizar y Volver al Inicio
            </button>
          </div>
        )}
      </main>
    </div>
  );
}