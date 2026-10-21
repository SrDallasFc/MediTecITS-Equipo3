import { useState } from "react";
import { Scale, Users, Apple, Printer, Save, CheckCircle2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StaffLayout, { StaffViewItem } from "../components/StaffLayout";

export function NutriologoDashboard({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState("evaluacion");
  const [peso, setPeso] = useState(71);
  const [estatura, setEstatura] = useState(1.75);
  const [plan, setPlan] = useState("Dieta normocalórica: Incremento de proteínas magras y verduras, reducción de carbohidratos refinados.");
  const [saved, setSaved] = useState(false);

  // Dynamic IMC calculation
  const imc = estatura > 0 ? (peso / (estatura * estatura)).toFixed(1) : "0.0";
  const numImc = parseFloat(imc);
  let imcStatus = "Normal";
  let imcColor = "text-emerald-600 bg-emerald-50";
  if (numImc < 18.5) { imcStatus = "Bajo peso"; imcColor = "text-blue-600 bg-blue-50"; }
  else if (numImc >= 25 && numImc < 30) { imcStatus = "Sobrepeso"; imcColor = "text-amber-600 bg-amber-50"; }
  else if (numImc >= 30) { imcStatus = "Obesidad"; imcColor = "text-red-600 bg-red-50"; }

  const chartData = [
    { month: 'Ene', peso: 75, imc: 24.5 },
    { month: 'Feb', peso: 74, imc: 24.1 },
    { month: 'Mar', peso: 72, imc: 23.5 },
    { month: 'Abr', peso: peso, imc: numImc },
  ];

  const views: StaffViewItem[] = [
    { id: "evaluacion", label: "Evaluación Antropométrica", icon: Scale },
    { id: "espera", label: "Pacientes en Espera", icon: Users },
    { id: "planes", label: "Planes Alimenticios", icon: Apple },
  ];

  return (
    <StaffLayout
      title="Consultorio Nutricional"
      roleName="Nutriólogo/a"
      userName="Mtra. Patricia López"
      views={views}
      currentView={currentView}
      setCurrentView={setCurrentView}
      onLogout={onLogout}
    >
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">Evaluación guardada y plan nutricional actualizado correctamente.</span>
        </div>
      )}

      {currentView === "evaluacion" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
                <h3 className="font-bold text-[#163a38]">Mediciones Actuales (Tiempo Real)</h3>
              </div>
              <div className="p-6 flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Peso (kg)</label>
                    <input
                      type="number"
                      value={peso}
                      onChange={(e) => setPeso(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Estatura (m)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={estatura}
                      onChange={(e) => setEstatura(Number(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-[#edf3f2] p-4 rounded-2xl text-center">
                    <p className="text-xs font-bold text-[#54706d] uppercase mb-1">IMC Calculado</p>
                    <p className="text-3xl font-bold text-[#0f766e]">{imc}</p>
                    <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${imcColor}`}>
                      {imcStatus}
                    </span>
                  </div>
                  <div className="bg-[#edf3f2] p-4 rounded-2xl text-center">
                    <p className="text-xs font-bold text-[#54706d] uppercase mb-1">% de Grasa Aprox.</p>
                    <p className="text-3xl font-bold text-[#0f766e]">
                      {numImc > 0 ? (1.2 * numImc + 0.23 * 22 - 16.2).toFixed(1) : "0"}%
                    </p>
                    <span className="inline-block mt-1 text-xs text-[#647876]">Composición Corporal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
                <h3 className="font-bold text-[#163a38]">Evolución del Paciente</h3>
              </div>
              <div className="p-6 flex-1 h-64 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#edf3f2" />
                    <XAxis dataKey="month" stroke="#9aadaa" fontSize={12} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#9aadaa" fontSize={12} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Line yAxisId="left" type="monotone" dataKey="peso" name="Peso (kg)" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line yAxisId="left" type="monotone" dataKey="imc" name="IMC" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
              <h3 className="font-bold text-[#163a38]">Plan Alimenticio Personalizado</h3>
            </div>
            <div className="p-6">
              <textarea
                rows={4}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full px-4 py-3 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] resize-y text-sm"
              />
            </div>
            <div className="p-4 border-t border-[#dce8e6] bg-[#f8fbfa] flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="bg-white border border-[#dce8e6] text-[#2d4c49] font-semibold py-2 px-4 rounded-xl hover:bg-[#edf3f2] transition-colors flex items-center gap-2"
              >
                <Printer size={16} /> Imprimir Plan
              </button>
              <button
                onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
                className="bg-[#0f766e] hover:bg-[#0b5c56] text-white font-semibold py-2 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save size={16} /> Guardar Evaluación
              </button>
            </div>
          </div>
        </div>
      )}

      {currentView !== "evaluacion" && (
        <div className="bg-white rounded-2xl border border-[#dce8e6] p-8 text-center text-[#647876]">
          Módulo de gestión de consultas nutricionales activo.
        </div>
      )}
    </StaffLayout>
  );
}
export default NutriologoDashboard;

