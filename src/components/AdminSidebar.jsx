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
  Wheat,
  Menu,
  X,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export const AdminSidebar = () => {
  const { currentView, navigateTo, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      id: 'admin-dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'admin-input-panen',
      label: 'Input Panen',
      icon: PlusCircle,
      badge: 'Cepat'
    },
    {
      id: 'admin-riwayat',
      label: 'Riwayat Panen',
      icon: History,
      badge: null
    },
    {
      id: 'admin-stok',
      label: 'Stok Gabah',
      icon: Boxes,
      badge: null
    },
    {
      id: 'admin-laporan',
      label: 'Laporan & Ekspor',
      icon: FileSpreadsheet,
      badge: null
    }
  ];

  const handleSelect = (viewId) => {
    navigateTo(viewId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar for Admin */}
      <div className="lg:hidden bg-green-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-amber-300">
            <Wheat className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm tracking-tight">Admin Marsudi Among Tani</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-green-800 text-white hover:bg-green-700 transition-colors"
          aria-label="Buka Menu Admin"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-green-950 text-white flex flex-col justify-between border-r border-green-800 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-green-900 bg-green-900/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-700 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
                <Wheat className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Panel Admin
                </span>
                <h2 className="text-lg font-black text-white leading-tight mt-1">
                  Marsudi Among Tani
                </h2>
                <p className="text-xs text-green-300/80 font-medium">Desa Dawuhan</p>
              </div>
            </div>
          </div>

          {/* User info card */}
          <div className="mx-4 my-4 p-3.5 rounded-2xl bg-green-900/60 border border-green-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-200">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-green-300">Petugas Operator</div>
              <div className="text-sm font-bold text-white truncate">Admin Kelompok Tani</div>
              <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Mode Input Aktif
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-2 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-green-400 px-3 py-1">
              Menu Navigasi
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 translate-x-1'
                      : 'text-green-100 hover:bg-green-900/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-white' : 'text-green-400 group-hover:text-amber-300'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white text-emerald-800' : 'bg-amber-400 text-green-950'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-green-900 space-y-2 bg-green-950">
          {/* Quick link to public web */}
          <button
            onClick={() => handleSelect('home')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-green-300 bg-green-900/50 hover:bg-green-800 hover:text-white transition-all border border-green-800"
          >
            <Globe className="w-4 h-4" />
            <span>Lihat Website Publik</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 hover:text-white transition-all border border-rose-900/50"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
};
