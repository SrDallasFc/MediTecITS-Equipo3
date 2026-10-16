import React, { useState } from "react";
import {
  Users,
  SquareUser,
  Pill,
  Monitor,
  Activity,
  LogOut,
  Search,
  Plus,
  Ban,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  Trash2
} from "lucide-react";

type View = "usuarios" | "pacientes" | "farmacia" | "kiosco" | "auditoria";

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState<View>("usuarios");

  const views = [
    { id: "usuarios", label: "Gestión de Usuarios y Roles", icon: Users },
    { id: "pacientes", label: "Control de Pacientes", icon: SquareUser },
    { id: "farmacia", label: "Control de Farmacia e Inventario Global", icon: Pill },
    { id: "kiosco", label: "Monitoreo del Kiosco", icon: Monitor },
    { id: "auditoria", label: "Supervisión de Consultas y Atenciones", icon: Activity },
  ] as const;

  return (
    <div className="flex h-screen w-full bg-[#f3f8f7] font-sans">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-[#dce8e6] bg-white flex flex-col">
        <div className="p-6 border-b border-[#dce8e6]">
          <h1 className="text-2xl font-bold tracking-tight text-[#163a38]">
            MediTec<span className="text-[#0f8b81]">-ITS</span>
          </h1>
          <p className="text-xs font-medium text-[#647876] mt-1">Panel de Administración General</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {views.map((view) => {
            const Icon = view.icon;
            const isActive = currentView === view.id;
            return (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#0f766e] text-white shadow-md shadow-[#0f766e]/20"
                    : "text-[#54706d] hover:bg-[#edf3f2] hover:text-[#2d4c49]"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-[#718683]"} />
                {view.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#dce8e6]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#b91c1c] hover:bg-[#fef2f2] transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-[#dce8e6] flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#163a38]">
            {views.find((v) => v.id === currentView)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#2d4c49]">Administrador</p>
              <p className="text-xs text-[#647876]">Ing. Juan Pérez</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold shadow-inner">
              JP
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {currentView === "usuarios" && <UsuariosRolesView />}
            {currentView === "pacientes" && <PacientesView />}
            {currentView === "farmacia" && <FarmaciaInventarioView />}
            {currentView === "kiosco" && <KioscoView />}
            {currentView === "auditoria" && <AuditoriaView />}
          </div>
        </div>
      </main>
    </div>
  );
}

// Submódulo: Gestión de Usuarios y Roles
function UsuariosRolesView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: 1, nomina: "20101543", nombre: "Dra. María Sánchez", correo: "msanchez@saltillo.tecnm.mx", rol: "Médico", activo: true },
    { id: 2, nomina: "18290312", nombre: "Lic. Laura Torres", correo: "ltorres@saltillo.tecnm.mx", rol: "Enfermera", activo: true },
    { id: 3, nomina: "19302211", nombre: "Dr. Carlos Ruiz", correo: "cruiz@saltillo.tecnm.mx", rol: "Odontólogo", activo: false },
    { id: 4, nomina: "17200445", nombre: "Mtra. Patricia López", correo: "plopez@saltillo.tecnm.mx", rol: "Nutrióloga", activo: true },
  ]);

  const [formNomina, setFormNomina] = useState("");
  const [formNombre, setFormNombre] = useState("");
  const [formCorreo, setFormCorreo] = useState("");
  const [formRol, setFormRol] = useState("Médico");
  const [formActivo, setFormActivo] = useState(true);

  const handleToggleActive = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNomina || !formNombre || !formCorreo) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    const newUser = {
      id: Date.now(),
      nomina: formNomina,
      nombre: formNombre,
      correo: formCorreo,
      rol: formRol,
      activo: formActivo,
    };
    setUsers([newUser, ...users]);
    setFormNomina("");
    setFormNombre("");
    setFormCorreo("");
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(u =>
    u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.nomina.includes(searchQuery) ||
    u.rol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aadaa]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nómina, nombre o rol..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#dce8e6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f8b81] focus:border-transparent transition-all"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#0f766e] hover:bg-[#0b5c56] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          Registrar Usuario
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#dce8e6] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fbfa] border-b border-[#dce8e6]">
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase tracking-wider">Nómina</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase tracking-wider">Nombre Completo</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase tracking-wider">Correo Institucional</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase tracking-wider">Rol</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3f2]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-[#647876]">
                  No se encontraron usuarios coincidentes.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#fbfdfd] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#2d4c49]">{user.nomina}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#163a38]">{user.nombre}</td>
                  <td className="px-6 py-4 text-sm text-[#647876]">{user.correo}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#edf3f2] text-[#54706d]">
                      {user.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      user.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${user.activo ? 'bg-emerald-600' : 'bg-red-600'}`}></span>
                      {user.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    <button
                      onClick={() => handleToggleActive(user.id)}
                      className={`${user.activo ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50' : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'} p-1.5 rounded transition-colors`}
                      title={user.activo ? "Deshabilitar" : "Habilitar"}
                    >
                      <Ban size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#163a38]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#dce8e6] flex justify-between items-center bg-[#f8fbfa]">
              <h3 className="text-lg font-bold text-[#163a38]">Registrar Nuevo Usuario</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#9aadaa] hover:text-[#54706d] transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Número de Control / Nómina *</label>
                  <input
                    type="text"
                    required
                    value={formNomina}
                    onChange={(e) => setFormNomina(e.target.value)}
                    className="h-10 w-full px-3 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                    placeholder="Ej. 20101543"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    className="h-10 w-full px-3 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                    placeholder="Dra. Nombre Apellido"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Correo Institucional *</label>
                  <input
                    type="email"
                    required
                    value={formCorreo}
                    onChange={(e) => setFormCorreo(e.target.value)}
                    className="h-10 w-full px-3 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81]"
                    placeholder="usuario@saltillo.tecnm.mx"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Rol Asignado</label>
                    <select
                      value={formRol}
                      onChange={(e) => setFormRol(e.target.value)}
                      className="h-10 w-full px-3 border border-[#dce8e6] rounded-xl focus:outline-none focus:border-[#0f8b81] bg-white text-sm"
                    >
                      <option>Administrador</option>
                      <option>Enfermera</option>
                      <option>Médico</option>
                      <option>Nutrióloga</option>
                      <option>Odontólogo</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-[#2d4c49] mb-1">Estado</label>
                    <button
                      type="button"
                      onClick={() => setFormActivo(!formActivo)}
                      className={`h-10 w-full rounded-xl border flex items-center justify-center font-semibold text-sm transition-colors ${
                        formActivo ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-red-50 text-red-700 border-red-300"
                      }`}
                    >
                      {formActivo ? "Usuario Activo" : "Usuario Inactivo"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[#dce8e6] bg-[#f8fbfa] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-[#54706d] hover:bg-[#edf3f2] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#0f766e] hover:bg-[#0b5c56] transition-colors shadow-sm"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Submódulo: Control de Pacientes
function PacientesView() {
  const [search, setSearch] = useState("");
  const pacientes = [
    { control: "21300214", nombre: "Juan Carlos Pérez Morales", carrera: "Ing. Industrial", semestre: "6to", sangre: "O+", alergias: "Penicilina", atenciones: 4 },
    { control: "22100452", nombre: "Ana Sofía Gómez Ramos", carrera: "Ing. Mecatrónica", semestre: "4to", sangre: "A+", alergias: "Ninguna", atenciones: 2 },
    { control: "19233011", nombre: "Luis Fernando Martínez", carrera: "Ing. Sistemas Comp.", semestre: "8vo", sangre: "B+", alergias: "Polen", atenciones: 7 },
    { control: "20104423", nombre: "Karla Elena Durán Lozano", carrera: "Lic. Administración", semestre: "7mo", sangre: "O-", alergias: "Aspirina", atenciones: 3 },
  ];

  const filtered = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.control.includes(search) ||
    p.carrera.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aadaa]" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por matrícula o nombre..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#dce8e6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f8b81]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#dce8e6] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#dce8e6] bg-[#f8fbfa] flex justify-between items-center">
          <h3 className="font-bold text-[#163a38]">Expedientes Médicos de Estudiantes</h3>
          <span className="text-xs font-semibold text-[#0f766e] bg-[#eaf7f5] px-3 py-1 rounded-full">
            {filtered.length} expedientes registrados
          </span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#dce8e6] text-[#54706d] text-xs uppercase font-bold bg-[#fcfdfd]">
              <th className="px-6 py-4">No. Control</th>
              <th className="px-6 py-4">Estudiante</th>
              <th className="px-6 py-4">Carrera y Semestre</th>
              <th className="px-6 py-4">Sangre</th>
              <th className="px-6 py-4">Alergias</th>
              <th className="px-6 py-4 text-center">Consultas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3f2]">
            {filtered.map(p => (
              <tr key={p.control} className="hover:bg-[#fbfdfd] transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-[#0f766e]">{p.control}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#163a38]">{p.nombre}</td>
                <td className="px-6 py-4 text-sm text-[#54706d]">{p.carrera} ({p.semestre})</td>
                <td className="px-6 py-4 text-sm font-bold text-[#2d4c49]">{p.sangre}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    p.alergias === 'Ninguna' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {p.alergias}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm font-bold text-[#163a38]">{p.atenciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Submódulo: Control de Farmacia e Inventario
function FarmaciaInventarioView() {
  const [inventory, setInventory] = useState([
    { id: 1, codigo: "75010338", nombre: "Paracetamol 500mg", sustancia: "Paracetamol", tipo: "Medicamento", stock: 124, lote: "L-293", estado: "Normal" },
    { id: 2, codigo: "75099211", nombre: "Gasas Estériles", sustancia: "N/A", tipo: "Material", stock: 15, lote: "L-112", estado: "Stock Bajo" },
    { id: 3, codigo: "75088334", nombre: "Amoxicilina 250mg", sustancia: "Amoxicilina", tipo: "Medicamento", stock: 89, lote: "L-084", estado: "Próximo a Caducar" },
    { id: 4, codigo: "75044192", nombre: "Ibuprofeno 400mg", sustancia: "Ibuprofeno", tipo: "Medicamento", stock: 65, lote: "L-310", estado: "Normal" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newItem, setNewItem] = useState({ codigo: "", nombre: "", sustancia: "", tipo: "Medicamento", stock: 10, lote: "" });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.codigo || !newItem.nombre) return;
    setInventory([...inventory, {
      id: Date.now(),
      ...newItem,
      stock: Number(newItem.stock),
      estado: Number(newItem.stock) < 20 ? "Stock Bajo" : "Normal"
    }]);
    setIsAddOpen(false);
    setNewItem({ codigo: "", nombre: "", sustancia: "", tipo: "Medicamento", stock: 10, lote: "" });
  };

  const adjustStock = (id: number, amount: number) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + amount);
        let nuevoEstado = item.estado;
        if (newStock < 20) nuevoEstado = "Stock Bajo";
        else if (item.estado === "Stock Bajo") nuevoEstado = "Normal";
        return { ...item, stock: newStock, estado: nuevoEstado };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#dce8e6] shadow-sm flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#0f766e]/10 text-[#0f766e] flex items-center justify-center shrink-0">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#647876] mb-1">Insumos Registrados</p>
            <p className="text-3xl font-bold text-[#163a38]">{inventory.reduce((a, b) => a + b.stock, 0)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#dce8e6] shadow-sm flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#647876] mb-1">Alertas de Stock Bajo</p>
            <p className="text-3xl font-bold text-[#163a38]">{inventory.filter(i => i.stock < 20).length}</p>
            <p className="text-xs text-amber-600 font-medium mt-1">Requieren reabastecimiento</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#dce8e6] shadow-sm flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#647876] mb-1">Próximos a Caducar</p>
            <p className="text-3xl font-bold text-[#163a38]">{inventory.filter(i => i.estado === "Próximo a Caducar").length}</p>
            <p className="text-xs text-red-600 font-medium mt-1">Menos de 30 días</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#dce8e6] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#dce8e6] flex justify-between items-center bg-[#f8fbfa]">
          <h3 className="font-bold text-[#163a38]">Catálogo e Inventario General</h3>
          <button
            onClick={() => setIsAddOpen(true)}
            className="text-sm font-semibold text-white bg-[#0f766e] hover:bg-[#0b5c56] px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={16} /> Registrar Insumo
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#dce8e6]">
                <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Código</th>
                <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Nombre Comercial</th>
                <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Tipo</th>
                <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Stock Actual</th>
                <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Ajuste Rápido</th>
                <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf3f2]">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-[#fbfdfd] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#647876]">{item.codigo}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#163a38]">
                    {item.nombre}
                    <span className="block text-xs font-normal text-[#647876]">{item.sustancia} • Lote {item.lote}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#54706d]">{item.tipo}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#2d4c49]">{item.stock} unidades</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => adjustStock(item.id, -1)}
                      className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded font-bold hover:bg-red-100"
                    >
                      -1
                    </button>
                    <button
                      onClick={() => adjustStock(item.id, 5)}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold hover:bg-emerald-100"
                    >
                      +5
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {item.estado === 'Normal' && <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">Normal</span>}
                    {item.estado === 'Stock Bajo' && <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-semibold">Stock Bajo</span>}
                    {item.estado === 'Próximo a Caducar' && <span className="text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-xs font-semibold">Caduca pronto</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#163a38]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-[#163a38] mb-4">Agregar Insumo o Medicamento</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2d4c49] mb-1">Código de Barras</label>
                <input
                  type="text"
                  required
                  value={newItem.codigo}
                  onChange={e => setNewItem({ ...newItem, codigo: e.target.value })}
                  placeholder="75010022"
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2d4c49] mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  required
                  value={newItem.nombre}
                  onChange={e => setNewItem({ ...newItem, nombre: e.target.value })}
                  placeholder="Ej. Naproxeno 500mg"
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2d4c49] mb-1">Stock Inicial</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newItem.stock}
                    onChange={e => setNewItem({ ...newItem, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2d4c49] mb-1">Lote</label>
                  <input
                    type="text"
                    required
                    value={newItem.lote}
                    onChange={e => setNewItem({ ...newItem, lote: e.target.value })}
                    placeholder="L-401"
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#54706d]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-[#0f766e] text-white rounded-xl"
                >
                  Guardar Insumo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Submódulo: Monitoreo del Kiosco
function KioscoView() {
  const [areas, setAreas] = useState([
    { id: 'enfermeria', name: 'Atención de Enfermería', enabled: true },
    { id: 'medica', name: 'Consulta Médica', enabled: true },
    { id: 'nutricion', name: 'Consulta Nutricional', enabled: true },
    { id: 'odontologia', name: 'Consulta Odontológica', enabled: false },
  ]);

  const toggleArea = (id: string) => {
    setAreas(areas.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#163a38]">Estado de la Terminal Táctil</h3>
          <p className="text-sm text-[#647876] mt-1">Kiosco de Registro Estudiantil (Edificio Central)</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-semibold text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          En Línea / Operativa
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm p-6">
          <h3 className="font-bold text-[#163a38] mb-2">Disponibilidad de Servicios</h3>
          <p className="text-sm text-[#647876] mb-6">Activa o desactiva qué áreas se muestran a los alumnos en el kiosco.</p>
          <div className="space-y-4">
            {areas.map(area => (
              <div key={area.id} className="flex items-center justify-between p-4 rounded-xl border border-[#edf3f2] bg-[#fbfdfd]">
                <span className="font-semibold text-[#2d4c49]">{area.name}</span>
                <button
                  onClick={() => toggleArea(area.id)}
                  className={`w-14 h-7 rounded-full p-1 transition-all duration-200 flex items-center ${
                    area.enabled ? 'bg-[#0f766e] justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#dce8e6] shadow-sm p-6">
          <h3 className="font-bold text-[#163a38] mb-4">Estadísticas de Uso (Tiempo Real)</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-[#54706d]">Citas Generadas Hoy</span>
                <span className="font-bold text-[#0f766e]">42 turnos</span>
              </div>
              <div className="w-full bg-[#edf3f2] rounded-full h-2">
                <div className="bg-[#0f766e] h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-[#54706d]">Accesos de Alumnos</span>
                <span className="font-bold text-[#0f766e]">128 consultas</span>
              </div>
              <div className="w-full bg-[#edf3f2] rounded-full h-2">
                <div className="bg-[#14b8a6] h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#edf3f2]">
              <h4 className="font-semibold text-sm text-[#163a38] mb-4">Últimos Registros del Kiosco</h4>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-[#0f766e]" />
                    <span className="text-[#2d4c49] font-medium">No. Control 2110{300 + i}</span>
                    <span className="text-[#9aadaa] ml-auto">Hace {i * 12} min</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Submódulo: Auditoría y Supervisión
function AuditoriaView() {
  const [filterArea, setFilterArea] = useState("Todas");
  const atenciones = [
    { id: 1, fecha: "15/10/2026 09:30", area: "Enfermería", paciente: "21300214", motivo: "Toma de presión", estado: "Completado" },
    { id: 2, fecha: "15/10/2026 10:15", area: "Odontología", paciente: "19233011", motivo: "Limpieza", estado: "En Proceso" },
    { id: 3, fecha: "15/10/2026 10:45", area: "Médica", paciente: "20104423", motivo: "Cefalea y fiebre", estado: "Completado" },
    { id: 4, fecha: "15/10/2026 11:20", area: "Nutricional", paciente: "22100452", motivo: "Evaluación antropométrica", estado: "Completado" },
  ];

  const filtered = filterArea === "Todas" ? atenciones : atenciones.filter(a => a.area.toLowerCase().includes(filterArea.toLowerCase()));

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Fecha,Area,Matricula,Motivo,Estado", ...filtered.map(a => `${a.fecha},${a.area},${a.paciente},${a.motivo},${a.estado}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `informe_meditec_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-[#dce8e6] shadow-sm">
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54706d]" size={16} />
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="pl-9 pr-8 py-2 bg-[#f8fbfa] border border-[#dce8e6] rounded-xl text-sm font-semibold text-[#2d4c49] focus:outline-none focus:border-[#0f8b81]"
            >
              <option value="Todas">Todas las Áreas</option>
              <option value="Enfermería">Enfermería</option>
              <option value="Médica">Médica</option>
              <option value="Odontología">Odontología</option>
              <option value="Nutricional">Nutricional</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={handleExport}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#163a38] hover:bg-[#2d4c49] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
        >
          <Download size={16} />
          Exportar Informe CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#dce8e6] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fbfa] border-b border-[#dce8e6]">
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Fecha y Hora</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Área</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">No. Control</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Motivo</th>
              <th className="px-6 py-4 text-xs font-bold text-[#54706d] uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3f2]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#fbfdfd] transition-colors">
                <td className="px-6 py-4 text-sm text-[#647876] whitespace-nowrap">{item.fecha}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#163a38]">{item.area}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#0f766e]">{item.paciente}</td>
                <td className="px-6 py-4 text-sm text-[#54706d]">{item.motivo}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.estado === 'Completado' ? 'bg-[#eaf7f5] text-[#0f8b81]' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {item.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminDashboard;

