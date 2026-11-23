import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Boxes,
  FileSpreadsheet,
  LogOut,
  Globe,
  Menu,
  X,
  UserCheck,
  ChevronRight,
  BarChart3
} from 'lucide-react';

export const AdminSidebar = () => {
  // Ambil adminRole dari context
  const { currentView, navigateTo, logout, adminRole } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'admin-input-panen', label: 'Input Panen', icon: PlusCircle, badge: 'Cepat' },
    { id: 'admin-riwayat', label: 'Riwayat Panen', icon: History, badge: null },
    { id: 'admin-stok', label: 'Stok Gabah', icon: Boxes, badge: null },
    { id: 'admin-laporan', label: 'Laporan & Ekspor', icon: FileSpreadsheet, badge: null },
    { id: 'admin-analytics', label: 'Analitik & Laporan', icon: BarChart3, badge: null }
  ];

  const handleSelect = (viewId) => {
    navigateTo(viewId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#0a1f14] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md border-b border-white/10 font-manrope">
        <div className="flex items-center gap-2">
          <img src="/logo-desa.jpeg" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-poppins font-bold text-sm tracking-tight">Admin RuangTani</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-[#1c4234] text-white hover:bg-[#2d6a4f] transition-colors cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a1f14] text-white flex flex-col justify-between border-r border-white/10 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 font-manrope ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 bg-[#1c4234]/30">
            <div className="flex items-center gap-3">
              <img src="/logo-desa.jpeg" alt="Logo" className="w-8 h-8 object-contain" />
              <div>
                <span className="text-[10px] font-poppins font-bold uppercase tracking-widest text-[#c9a96e] bg-[#c9a96e]/15 px-2 py-0.5 rounded-full border border-[#c9a96e]/30">
                  Panel Operator
                </span>
                <h2 className="text-base font-poppins font-bold text-white leading-tight mt-1">
                  RuangTani Dawuhan
                </h2>
                <p className="text-[11px] text-[#95d5b2] font-medium font-manrope">Marsudi Among Tani</p>
              </div>
            </div>
          </div>

          {/* User info card (DINAMIS BERDASARKAN ROLE) */}
          <div className="mx-4 my-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1c4234] flex items-center justify-center text-[#95d5b2]">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-semibold text-[#95d5b2]">
                {adminRole === 'superadmin' ? 'Super Admin (UI/UX)' : 'Admin Balai Desa'}
              </div>
              <div className="text-xs font-poppins font-bold text-white truncate">
                {adminRole === 'superadmin' ? 'Pengelola Website' : 'Operator Lumbung'}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Sistem Aktif
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-2 space-y-1.5">
            <div className="text-[10px] font-poppins font-bold uppercase tracking-wider text-white/40 px-3 py-1">
              Menu Utama
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-full font-poppins font-medium text-xs transition-all cursor-pointer group ${isActive
                      ? 'bg-[#1c4234] text-white shadow-md border border-[#2d6a4f]'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110 text-[#95d5b2]' : 'text-white/50 group-hover:text-[#95d5b2]'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#95d5b2] text-[#0a1f14]' : 'bg-[#c9a96e] text-black'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-[#95d5b2]' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#0a1f14]">
          <button
            onClick={() => handleSelect('home')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-poppins font-semibold text-[#95d5b2] bg-white/5 hover:bg-white/10 hover:text-white transition-all border border-white/10 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Lihat Website Publik</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-poppins font-semibold text-rose-300 bg-rose-950/30 hover:bg-rose-900/50 hover:text-white transition-all border border-rose-900/40 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
};