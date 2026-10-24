import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  ChevronDown, 
  Lock, 
  Menu, 
  X, 
  Wheat, 
  BookOpen, 
  TrendingUp, 
  ShoppingBag, 
  Home, 
  MapPin, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export const Navbar = () => {
  const { currentView, navigateTo, isAdmin } = useApp();
  const [tentangOpen, setTentangOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tentangRef = useRef(null);
  const programRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tentangRef.current && !tentangRef.current.contains(event.target)) {
        setTentangOpen(false);
      }
      if (programRef.current && !programRef.current.contains(event.target)) {
        setProgramOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view) => {
    navigateTo(view);
    setTentangOpen(false);
    setProgramOpen(false);
    setMobileMenuOpen(false);
  };

  const isTentangActive = currentView === 'tentang-desa' || currentView === 'sejarah-kelompok';
  const isProgramActive = currentView === 'program';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm transition-all">
      {/* Top micro banner */}
      <div className="bg-green-800 text-green-100 px-4 py-1.5 text-xs text-center font-medium hidden sm:flex justify-between items-center max-w-7xl mx-auto">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-green-300" />
          Kawasan Lumbung Pangan Desa Dawuhan, Kec. Padamara, Purbalingga
        </span>
        <span className="flex items-center gap-2">
          <span>Pusat Informasi & Penjualan Gabah Berkualitas</span>
          <span className="text-green-300">|</span>
          <span className="text-amber-300 font-semibold flex items-center gap-1">
            <PhoneCall className="w-3 h-3" /> WA: 0812-3456-7890
          </span>
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Kelompok Tani Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-800 to-green-600 flex items-center justify-center text-white shadow-md shadow-green-800/20 group-hover:scale-105 transition-transform duration-200">
              <Wheat className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  Sistem Informasi Tani
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-green-950 tracking-tight leading-snug">
                Marsudi Among Tani
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Desa Dawuhan • Kec. Padamara
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-all flex items-center gap-1.5 ${
                currentView === 'home'
                  ? 'bg-green-800 text-white shadow-sm'
                  : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            {/* Tentang Kami (Dropdown) */}
            <div className="relative" ref={tentangRef}>
              <button
                onClick={() => {
                  setTentangOpen(!tentangOpen);
                  setProgramOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-all flex items-center gap-1.5 ${
                  isTentangActive
                    ? 'bg-green-800 text-white shadow-sm'
                    : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Tentang Kami
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${tentangOpen ? 'rotate-180' : ''}`} />
              </button>

              {tentangOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('tentang-desa')}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-green-100 text-green-800 group-hover:bg-green-800 group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-green-900 text-sm">
                        Profil Desa Dawuhan
                      </div>
                      <div className="text-xs text-gray-500">
                        Potensi geografis & kesuburan lahan
                      </div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    onClick={() => handleNavClick('sejarah-kelompok')}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-amber-900 text-sm">
                        Sejarah Kelompok Tani
                      </div>
                      <div className="text-xs text-gray-500">
                        Asal-usul, visi misi & kepengurusan
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Program (Dropdown / Filter: Hasil Panen & Penjualan) */}
            <div className="relative" ref={programRef}>
              <button
                onClick={() => {
                  setProgramOpen(!programOpen);
                  setTentangOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-all flex items-center gap-1.5 ${
                  isProgramActive
                    ? 'bg-green-800 text-white shadow-sm'
                    : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Program
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${programOpen ? 'rotate-180' : ''}`} />
              </button>

              {programOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('program')}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-emerald-900 text-sm">
                        Hasil Panen & Penjualan
                      </div>
                      <div className="text-xs text-gray-500">
                        Rekapitulasi bulanan, filter periode & arsip
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Katalog Produk */}
            <button
              onClick={() => handleNavClick('katalog')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-all flex items-center gap-1.5 ${
                currentView === 'katalog'
                  ? 'bg-green-800 text-white shadow-sm'
                  : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Katalog Produk
            </button>
          </div>

          {/* Action Button: Login Admin / Mode Admin */}
          <div className="hidden lg:flex items-center gap-3">
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:from-emerald-700 hover:to-green-800 transition-all border border-emerald-500"
              >
                <ShieldCheck className="w-4 h-4" />
                Panel Admin
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="inline-flex items-center gap-2 bg-white text-green-900 border-2 border-green-800 px-5 py-2.5 rounded-xl font-bold text-base hover:bg-green-800 hover:text-white transition-all shadow-sm hover:shadow"
              >
                <Lock className="w-4 h-4 text-green-700 group-hover:text-white" />
                Login Admin
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-green-100 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center gap-3 ${
              currentView === 'home' ? 'bg-green-800 text-white' : 'text-gray-800 hover:bg-green-50'
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </button>

          <div className="border-l-2 border-green-700 ml-4 pl-3 py-1 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 px-2 py-1">
              Tentang Kami
            </div>
            <button
              onClick={() => handleNavClick('tentang-desa')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'tentang-desa' ? 'bg-green-100 text-green-900 font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Profil Desa Dawuhan
            </button>
            <button
              onClick={() => handleNavClick('sejarah-kelompok')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'sejarah-kelompok' ? 'bg-green-100 text-green-900 font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Sejarah Kelompok Tani
            </button>
          </div>

          <div className="border-l-2 border-green-700 ml-4 pl-3 py-1 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 px-2 py-1">
              Program
            </div>
            <button
              onClick={() => handleNavClick('program')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'program' ? 'bg-green-100 text-green-900 font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Hasil Panen & Penjualan
            </button>
          </div>

          <button
            onClick={() => handleNavClick('katalog')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center gap-3 ${
              currentView === 'katalog' ? 'bg-green-800 text-white' : 'text-gray-800 hover:bg-green-50'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Katalog Produk
          </button>

          <div className="pt-2">
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="w-full text-center bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow"
              >
                <ShieldCheck className="w-5 h-5" />
                Panel Admin
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="w-full text-center bg-green-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow"
              >
                <Lock className="w-5 h-5" />
                Login Admin
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
