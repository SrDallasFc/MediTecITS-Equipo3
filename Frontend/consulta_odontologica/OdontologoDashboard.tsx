import { useState } from "react";
import { Activity, Users, History, Save, XCircle, CheckCircle2 } from "lucide-react";
import StaffLayout, { StaffViewItem } from "../components/StaffLayout";

export function OdontologoDashboard({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState("odontograma");
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [toothConditions, setToothConditions] = useState<Record<number, string>>({
    16: 'Caries',
    21: 'Resina',
    36: 'Extracción',
  });
  const [notes, setNotes] = useState("Limpieza dental ultrasónica y obturación con resina fotocurable.");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Standard FDI notation teeth
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const views: StaffViewItem[] = [
    { id: "odontograma", label: "Odontograma Dinámico", icon: Activity },
    { id: "espera", label: "Pacientes en Espera", icon: Users },
    { id: "historial", label: "Historial de Procedimientos", icon: History },
  ];

  const handleSetCondition = (cond: string) => {
    if (selectedTooth !== null) {
      if (cond === 'Sano') {
        const copy = { ...toothConditions };
        delete copy[selectedTooth];
        setToothConditions(copy);
      } else {
        setToothConditions({ ...toothConditions, [selectedTooth]: cond });
      }
      setSelectedTooth(null);
    }
  };

  const getToothStyle = (tooth: number) => {
    const cond = toothConditions[tooth];
    if (cond === 'Caries') return 'bg-red-100 border-red-500 text-red-700';
    if (cond === 'Resina') return 'bg-blue-100 border-blue-500 text-blue-700';
    if (cond === 'Extracción') return 'bg-gray-200 border-gray-500 text-gray-500 line-through';
    if (cond === 'Amalgama') return 'bg-purple-100 border-purple-500 text-purple-700';
    return 'bg-white border-[#dce8e6] text-[#2d4c49] hover:border-[#0f766e]';
  };

  return (
    <StaffLayout
      title="Consultorio Odontológico"
      roleName="Odontólogo/a"
      userName="Dr. Carlos Ruiz"
      views={views}
      currentView={currentView}
      setCurrentView={setCurrentView}
      onLogout={onLogout}
    >
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">Odontograma y notas de evolución guardadas exitosamente.</span>
        </div>
      )}

      {currentView === "odontograma" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="font-bold text-[#163a38]">Odontograma del Paciente (Notación FDI)</h3>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#647876]">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div> Caries</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-400"></div> Resina</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-purple-400"></div> Amalgama</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-gray-400"></div> Extracción</span>
              </div>
            </div>
            
            <div className="p-8 bg-[#fbfdfd] flex flex-col items-center gap-8 overflow-x-auto">
              <div>
                <p className="text-xs font-bold text-center text-[#9aadaa] uppercase mb-2">Arcada Superior</p>
                <div className="flex gap-1.5">
                  {upperTeeth.map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelectedTooth(t)}
                      className={`w-9 h-12 rounded-t-lg border-2 flex flex-col items-center justify-center font-bold text-xs transition-transform hover:scale-105 ${getToothStyle(t)}`}
                      title={`Pieza ${t}: ${toothConditions[t] || 'Sano'}`}
                    >
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex gap-1.5">
                  {lowerTeeth.map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelectedTooth(t)}
                      className={`w-9 h-12 rounded-b-lg border-2 flex flex-col items-center justify-center font-bold text-xs transition-transform hover:scale-105 ${getToothStyle(t)}`}
                      title={`Pieza ${t}: ${toothConditions[t] || 'Sano'}`}
                    >
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs font-bold text-center text-[#9aadaa] uppercase mt-2">Arcada Inferior</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
              <h3 className="font-bold text-[#163a38]">Registro del Procedimiento Realizado</h3>
            </div>
            <div className="p-6">
              <label className="block text-sm font-semibold text-[#2d4c49] mb-2">Detalles del Tratamiento</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] resize-y text-sm"
              />
            </div>
            <div className="p-4 border-t border-[#dce8e6] bg-[#f8fbfa] flex justify-end">
              <button
                onClick={() => { setSavedSuccess(true); setTimeout(() => setSavedSuccess(false), 3000); }}
                className="bg-[#163a38] hover:bg-[#2d4c49] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save size={18} /> Guardar Progreso Odontológico
              </button>
            </div>
          </div>

          {selectedTooth && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#163a38]/40 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa] flex justify-between items-center">
                  <h3 className="font-bold text-[#163a38]">Pieza Dental {selectedTooth}</h3>
                  <button onClick={() => setSelectedTooth(null)} className="text-[#9aadaa] hover:text-[#54706d]">
                    <XCircle size={20} />
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  {['Sano', 'Caries', 'Resina', 'Amalgama', 'Extracción'].map(estado => (
                    <button
                      key={estado}
                      onClick={() => handleSetCondition(estado)}
                      className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-[#edf3f2] font-semibold text-sm text-[#2d4c49] transition-colors"
                    >
                      Marcar como: <span className="font-bold text-[#0f766e]">{estado}</span>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-[#dce8e6] flex justify-end">
                  <button onClick={() => setSelectedTooth(null)} className="px-4 py-2 text-xs font-semibold text-[#54706d]">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView !== "odontograma" && (
        <div className="bg-white rounded-2xl border border-[#dce8e6] p-8 text-center text-[#647876]">
          Módulo odontológico activo.
        </div>
      )}
    </StaffLayout>
  );
}
export default OdontologoDashboard;

