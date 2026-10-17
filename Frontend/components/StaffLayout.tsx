import React from "react";
import { LogOut, LucideIcon } from "lucide-react";

export interface StaffViewItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface StaffLayoutProps {
  title: string;
  roleName: string;
  userName: string;
  views: StaffViewItem[];
  currentView: string;
  setCurrentView: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function StaffLayout({
  title,
  roleName,
  userName,
  views,
  currentView,
  setCurrentView,
  onLogout,
  children,
}: StaffLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[#f3f8f7] font-sans">
      {/* Barra lateral de navegación (Sidebar) */}
      <aside className="w-72 flex-shrink-0 border-r border-[#dce8e6] bg-white flex flex-col">
        <div className="p-6 border-b border-[#dce8e6]">
          <h1 className="text-2xl font-bold tracking-tight text-[#163a38]">
            MediTec<span className="text-[#0f8b81]">-ITS</span>
          </h1>
          <p className="text-xs font-medium text-[#647876] mt-1">{title}</p>
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

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Cabecera superior con información del profesional */}
        <header className="h-20 bg-white border-b border-[#dce8e6] flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#163a38]">
            {views.find((v) => v.id === currentView)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#2d4c49]">{roleName}</p>
              <p className="text-xs text-[#647876]">{userName}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold shadow-inner">
              {userName.split(" ").map((n) => n[0]).join("").substring(0, 2)}
            </div>
          </div>
        </header>

        {/* Área scrolleable de trabajo */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

