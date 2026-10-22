import { useState } from "react";
import { Users, ClipboardList, History, CheckCircle2 } from "lucide-react";
import StaffLayout, { StaffViewItem } from "../components/StaffLayout";

export function EnfermeriaDashboard({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState("cola");
  const [queue, setQueue] = useState([
    { id: 1, turno: "E-14", matricula: "21300214", nombre: "Juan Carlos Pérez", carrera: "Ing. Industrial", motivo: "Cefalea intensa y mareos", tiempo: "12 min", urgencia: "Media" },
    { id: 2, turno: "E-15", matricula: "22100452", nombre: "Ana Gómez Ramos", carrera: "Ing. Mecatrónica", motivo: "Revisión de presión arterial", tiempo: "8 min", urgencia: "Baja" },
    { id: 3, turno: "E-16", matricula: "19233011", nombre: "Luis Martínez", carrera: "Ing. Sistemas", motivo: "Laceración en palma de mano", tiempo: "3 min", urgencia: "Alta" },
  ]);

  const [activePatient, setActivePatient] = useState(queue[0]);
  const [notification, setNotification] = useState("");
  const [history, setHistory] = useState([
    { id: 101, hora: "08:45 AM", matricula: "20104423", nombre: "Karla Elena Durán", derivacion: "Consulta Médica", temp: "38.2°C", presion: "120/80" },
    { id: 102, hora: "09:10 AM", matricula: "18290312", nombre: "Roberto Valdez", derivacion: "Alta / Signos Normales", temp: "36.6°C", presion: "115/75" },
  ]);

  const views: StaffViewItem[] = [
    { id: "cola", label: "Cola de Espera Kiosco", icon: Users },
    { id: "triage", label: "Registro de Atención (Triage)", icon: ClipboardList },
    { id: "historial", label: "Historial de Atenciones", icon: History },
  ];

  const handleSelectTriage = (patient: typeof queue[0]) => {
    setActivePatient(patient);
    setCurrentView("triage");
  };

  const handleFinishTriage = (derivacion: string, vitales: { peso: string; talla: string; presion: string; temp: string }) => {
    setHistory([
      {
        id: Date.now(),
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        matricula: activePatient.matricula,
        nombre: activePatient.nombre,
        derivacion,
        temp: `${vitales.temp || '36.5'}°C`,
        presion: vitales.presion || '120/80',
      },
      ...history
    ]);
    setQueue(queue.filter(q => q.id !== activePatient.id));
    setNotification(`Paciente ${activePatient.nombre} derivado exitosamente a: ${derivacion}`);
    setCurrentView("cola");
    setTimeout(() => setNotification(""), 4000);
  };

  return (
    <StaffLayout
      title="Panel de Enfermería y Triage"
      roleName="Enfermero/a"
      userName="Lic. Laura Torres"
      views={views}
      currentView={currentView}
      setCurrentView={setCurrentView}
      onLogout={onLogout}
    >
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {currentView === "cola" && (
        <div className="bg-white rounded-2xl border border-[#dce8e6] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa] flex justify-between items-center">
            <h3 className="font-bold text-[#163a38]">Pacientes en Espera (Turnos del Kiosco)</h3>
            <span className="text-xs font-bold text-[#0f766e] bg-[#eaf7f5] px-3 py-1 rounded-full">
              {queue.length} en espera
            </span>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#dce8e6] text-[#54706d] text-xs uppercase font-bold">
                <th className="px-6 py-4">Turno</th>
                <th className="px-6 py-4">Matrícula</th>
                <th className="px-6 py-4">Alumno</th>
                <th className="px-6 py-4">Motivo</th>
                <th className="px-6 py-4">Espera</th>
                <th className="px-6 py-4">Prioridad</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf3f2]">
              {queue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-[#647876]">
                    No hay pacientes en la cola en este momento.
                  </td>
                </tr>
              ) : (
                queue.map((q) => (
                  <tr key={q.id} className="hover:bg-[#fbfdfd] transition-colors">
                    <td className="px-6 py-4 font-bold text-[#0f766e]">{q.turno}</td>
                    <td className="px-6 py-4 text-sm text-[#647876]">{q.matricula}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#163a38]">
                      {q.nombre}
                      <span className="block text-xs font-normal text-[#54706d]">{q.carrera}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#54706d]">{q.motivo}</td>
                    <td className="px-6 py-4 text-sm text-[#54706d] font-medium">{q.tiempo}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        q.urgencia === 'Alta' ? 'bg-red-100 text-red-700' :
                        q.urgencia === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {q.urgencia}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSelectTriage(q)}
                        className="text-sm font-semibold text-white bg-[#0f766e] hover:bg-[#0b5c56] px-4 py-1.5 rounded-xl transition-colors shadow-sm"
                      >
                        Llamar a Triage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {currentView === "triage" && (
        <EnfermeriaTriageForm
          patient={activePatient}
          onDerive={handleFinishTriage}
          onCancel={() => setCurrentView("cola")}
        />
      )}

      {currentView === "historial" && (
        <div className="bg-white rounded-2xl border border-[#dce8e6] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
            <h3 className="font-bold text-[#163a38]">Historial de Atenciones de Hoy</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#dce8e6] text-xs font-bold text-[#54706d] uppercase">
                <th className="px-6 py-4">Hora</th>
                <th className="px-6 py-4">Matrícula</th>
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Presión / Temp</th>
                <th className="px-6 py-4">Destino / Derivación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf3f2]">
              {history.map((h) => (
                <tr key={h.id}>
                  <td className="px-6 py-4 text-sm text-[#647876]">{h.hora}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#0f766e]">{h.matricula}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#163a38]">{h.nombre}</td>
                  <td className="px-6 py-4 text-sm text-[#2d4c49]">{h.presion} • {h.temp}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-[#eaf7f5] text-[#0f766e] px-2.5 py-1 rounded-full text-xs font-semibold">
                      {h.derivacion}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </StaffLayout>
  );
}

function EnfermeriaTriageForm({
  patient,
  onDerive,
  onCancel
}: {
  patient: { matricula: string; nombre: string; carrera?: string };
  onDerive: (area: string, vitales: { peso: string; talla: string; presion: string; temp: string }) => void;
  onCancel: () => void;
}) {
  const [peso, setPeso] = useState("70");
  const [talla, setTalla] = useState("1.72");
  const [presion, setPresion] = useState("120/80");
  const [temp, setTemp] = useState("36.5");
  const [motivo, setMotivo] = useState("");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#dce8e6] p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#edf3f2] rounded-2xl flex items-center justify-center text-[#0f766e] font-bold text-xl">
            {patient.nombre.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#163a38]">{patient.nombre}</h3>
            <p className="text-[#54706d] text-sm">No. Control: {patient.matricula} • {patient.carrera || "Estudiante Tecnológico"}</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-sm font-semibold text-[#54706d] hover:text-[#2d4c49] px-3 py-1 rounded-lg"
        >
          Volver a la cola
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa]">
          <h3 className="font-bold text-[#163a38]">Captura de Signos Vitales y Triage</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Peso (kg)</label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                placeholder="70"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Estatura (m)</label>
              <input
                type="number"
                step="0.01"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
                className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                placeholder="1.72"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Presión Arterial</label>
              <input
                type="text"
                value={presion}
                onChange={(e) => setPresion(e.target.value)}
                className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Temperatura (°C)</label>
              <input
                type="number"
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                placeholder="36.5"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Observaciones / Cuadro Inicial</label>
            <textarea
              rows={3}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-3 py-2 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] resize-none"
              placeholder="Describa síntomas y hallazgos preliminares..."
            />
          </div>
        </div>
        <div className="p-4 border-t border-[#dce8e6] bg-[#f8fbfa] flex flex-wrap gap-3">
          <button
            onClick={() => onDerive("Médico General", { peso, talla, presion, temp })}
            className="flex-1 bg-[#163a38] hover:bg-[#2d4c49] text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Derivar a Médico
          </button>
          <button
            onClick={() => onDerive("Nutrióloga", { peso, talla, presion, temp })}
            className="flex-1 bg-white border border-[#0f766e] text-[#0f766e] font-semibold py-2.5 rounded-xl hover:bg-[#f3f8f7] transition-colors"
          >
            Derivar a Nutrióloga
          </button>
          <button
            onClick={() => onDerive("Odontólogo", { peso, talla, presion, temp })}
            className="flex-1 bg-white border border-[#0f766e] text-[#0f766e] font-semibold py-2.5 rounded-xl hover:bg-[#f3f8f7] transition-colors"
          >
            Derivar a Odontólogo
          </button>
          <button
            onClick={() => onDerive("Alta / Toma de Signos", { peso, talla, presion, temp })}
            className="flex-1 bg-[#edf3f2] hover:bg-[#dce8e6] text-[#2d4c49] font-semibold py-2.5 rounded-xl transition-colors"
          >
            Solo Signos / Alta
          </button>
        </div>
      </div>
    </div>
  );
}
export default EnfermeriaDashboard;

