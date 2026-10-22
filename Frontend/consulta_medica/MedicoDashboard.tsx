import { useState } from "react";
import {
  Stethoscope,
  Users,
  History,
  Weight,
  HeartPulse,
  Thermometer,
  FileCheck,
  Plus,
  Save,
  CheckCircle2,
} from "lucide-react";
import StaffLayout, { StaffViewItem } from "../components/StaffLayout";

export function MedicoDashboard({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState("consulta");
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, med: "Paracetamol 500mg", indicacion: "1 tableta cada 8 horas por 3 días" },
  ]);
  const [medInput, setMedInput] = useState("");
  const [indInput, setIndInput] = useState("");
  const [diagnostico, setDiagnostico] = useState("Faringitis aguda leve");
  const [tratamiento, setTratamiento] = useState("Hidratación abundante, reposo relativo por 48 horas.");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const views: StaffViewItem[] = [
    { id: "consulta", label: "Consulta Actual", icon: Stethoscope },
    { id: "espera", label: "Pacientes en Espera", icon: Users },
    { id: "historial", label: "Historial Clínico", icon: History },
  ];

  const handleAddMed = () => {
    if (!medInput.trim() || !indInput.trim()) return;
    setPrescriptions([...prescriptions, { id: Date.now(), med: medInput, indicacion: indInput }]);
    setMedInput("");
    setIndInput("");
  };

  const handleRemoveMed = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const handleSaveConsultation = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <StaffLayout
      title="Consultorio Médico"
      roleName="Médico"
      userName="Dra. María Sánchez"
      views={views}
      currentView={currentView}
      setCurrentView={setCurrentView}
      onLogout={onLogout}
    >
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">
            Consulta guardada con éxito y receta médica emitida para el alumno Luis Martínez (19233011).
          </span>
        </div>
      )}

      {currentView === "consulta" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#dce8e6] shadow-sm flex items-center gap-3">
              <Weight className="text-[#0f766e]" />
              <div>
                <p className="text-xs text-[#647876] font-semibold">Peso / Estatura</p>
                <p className="text-lg font-bold text-[#163a38]">72 kg / 1.75 m</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#dce8e6] shadow-sm flex items-center gap-3">
              <HeartPulse className="text-[#0f766e]" />
              <div>
                <p className="text-xs text-[#647876] font-semibold">Presión Arterial</p>
                <p className="text-lg font-bold text-[#163a38]">120/80</p>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm flex items-center gap-3">
              <Thermometer className="text-amber-600" />
              <div>
                <p className="text-xs text-amber-600 font-semibold">Temperatura</p>
                <p className="text-lg font-bold text-amber-700">37.8 °C</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#dce8e6] shadow-sm flex items-center gap-3">
              <FileCheck className="text-[#0f766e]" />
              <div>
                <p className="text-xs text-[#647876] font-semibold">Paciente Actual</p>
                <p className="text-sm font-bold text-[#163a38]">Luis Martínez (19233011)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
              <h3 className="font-bold text-[#163a38]">Diagnóstico y Tratamiento</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Diagnóstico Clínico</label>
                <textarea
                  rows={2}
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Plan de Tratamiento / Indicaciones</label>
                <textarea
                  rows={2}
                  value={tratamiento}
                  onChange={(e) => setTratamiento(e.target.value)}
                  className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] resize-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
              <h3 className="font-bold text-[#163a38]">Receta Médica Digital</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Insumo / Medicamento</label>
                  <input
                    type="text"
                    value={medInput}
                    onChange={(e) => setMedInput(e.target.value)}
                    placeholder="Ej. Ibuprofeno 400mg"
                    className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Dosis e Intervalo</label>
                  <input
                    type="text"
                    value={indInput}
                    onChange={(e) => setIndInput(e.target.value)}
                    placeholder="1 tableta c/8h por 3 días"
                    className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] text-sm"
                  />
                </div>
                <button
                  onClick={handleAddMed}
                  className="bg-[#0f766e] hover:bg-[#0b5c56] text-white font-semibold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 h-10 shadow-sm"
                >
                  <Plus size={16} /> Agregar
                </button>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#dce8e6] text-[#54706d] text-xs uppercase font-bold">
                    <th className="py-2">Medicamento</th>
                    <th className="py-2">Indicaciones</th>
                    <th className="py-2 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf3f2]">
                  {prescriptions.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 text-sm font-semibold text-[#163a38]">{p.med}</td>
                      <td className="py-3 text-sm text-[#54706d]">{p.indicacion}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleRemoveMed(p.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-[#dce8e6] bg-[#f8fbfa] flex justify-end">
              <button
                onClick={handleSaveConsultation}
                className="bg-[#163a38] hover:bg-[#2d4c49] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save size={18} /> Guardar Consulta y Expedir Receta
              </button>
            </div>
          </div>
        </div>
      )}

      {currentView === "espera" && (
        <div className="bg-white rounded-2xl border border-[#dce8e6] p-6 shadow-sm">
          <h3 className="font-bold text-[#163a38] mb-4">Pacientes Derivados para Atención Médica</h3>
          <div className="space-y-3">
            {[
              { matricula: "19233011", nombre: "Luis Martínez", motivo: "Corte y fiebre leve", triage: "Lic. Laura Torres" },
              { matricula: "20104423", nombre: "Karla Durán", motivo: "Cefalea persistente", triage: "Lic. Laura Torres" },
            ].map(p => (
              <div key={p.matricula} className="flex justify-between items-center p-4 bg-[#f8fbfa] rounded-xl border border-[#edf3f2]">
                <div>
                  <p className="font-bold text-[#163a38]">{p.nombre} ({p.matricula})</p>
                  <p className="text-xs text-[#647876]">Motivo: {p.motivo} • Triage por: {p.triage}</p>
                </div>
                <button
                  onClick={() => setCurrentView("consulta")}
                  className="bg-[#0f766e] text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-[#0b5c56]"
                >
                  Pasar a Consulta
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === "historial" && (
        <div className="bg-white rounded-2xl border border-[#dce8e6] p-6 shadow-sm">
          <h3 className="font-bold text-[#163a38] mb-4">Historial de Consultas Médicas Concluidas</h3>
          <p className="text-sm text-[#647876]">Se han registrado 14 consultas concluidas en la jornada de hoy.</p>
        </div>
      )}
    </StaffLayout>
  );
}
export default MedicoDashboard;

