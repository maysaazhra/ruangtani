import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronDown, 
  Lock, 
  Menu, 
  X, 
  TrendingUp, 
  ShoppingBag, 
  Home, 
  MapPin, 
  ShieldCheck,
  PhoneCall,
  ExternalLink,
  BookOpen,
  Sprout
} from 'lucide-react';

export const Navbar = () => {
  const { currentView, navigateTo, isAdmin } = useApp();
  const [tentangOpen, setTentangOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const tentangRef = useRef(null);
  const programRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="sticky top-0 z-50 transition-all duration-300">
      
      {/* Top Info Micro-bar */}
      <div className="bg-[#0a1f14] text-[#95d5b2] border-b border-white/10 px-4 py-1.5 text-xs font-manrope hidden sm:flex justify-between items-center max-w-full">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4">
          <span className="flex items-center gap-2 text-white/80">
            <span className="inline-flex items-center gap-1.5 text-[#95d5b2] font-semibold">
              <Sprout className="w-3.5 h-3.5 text-[#95d5b2]" />
              <span>Sistem Informasi Pertanian Terpadu</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="text-white/70">Kelompok Tani Marsudi Among Tani</span>
          </span>

          <span className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-1 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#c9a96e]" />
              Desa Dawuhan, Purbalingga
            </span>
            <span className="text-white/30">|</span>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#c9a96e] hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3" /> Hubungi: 0812-3456-7890
            </a>
          </span>
        </div>
      </div>

      {/* Main Floating Glass Navbar */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-[#ffffff]/95 backdrop-blur-md shadow-md py-3 border-b border-gray-200/80' 
          : 'bg-[#ffffff]/90 backdrop-blur-sm py-4 border-b border-gray-100'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand: RuangTani Marsudi Among Tani */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1c4234] flex items-center justify-center text-white shadow-md shadow-[#1c4234]/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-[#95d5b2]" />
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-poppins font-bold text-xl text-[#1c4234] tracking-tight leading-none">
                    Ruang<span className="text-[#40916c]">Tani</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase bg-[#dbf0e3] text-[#1c4234] px-1.5 py-0.5 rounded-md">
                    Dawuhan
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-manrope font-medium leading-none mt-1">
                  Marsudi Among Tani
                </p>
              </div>
            </div>

            {/* Orbitani Floating Nav Pill (Center) */}
            <div className="hidden lg:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200 shadow-xs font-manrope">
              
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-[#1c4234] text-white shadow-sm'
                    : 'text-gray-700 hover:text-[#1c4234] hover:bg-white/80'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                Beranda
              </button>

              {/* Tentang Kami (Dropdown) */}
              <div className="relative" ref={tentangRef}>
                <button
                  onClick={() => {
                    setTentangOpen(!tentangOpen);
                    setProgramOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center gap-1 cursor-pointer ${
                    isTentangActive
                      ? 'bg-[#1c4234] text-white shadow-sm'
                      : 'text-gray-700 hover:text-[#1c4234] hover:bg-white/80'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Tentang Kami
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${tentangOpen ? 'rotate-180' : ''}`} />
                </button>

                {tentangOpen && (
                  <div className="absolute left-0 mt-3 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => handleNavClick('tentang-desa')}
                      className="w-full text-left px-4 py-3 hover:bg-[#f0fdf4] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-xl bg-[#dbf0e3] text-[#1c4234] group-hover:bg-[#1c4234] group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-[#1c4234] text-sm font-poppins">
                          Profil Desa Dawuhan
                        </div>
                        <div className="text-xs text-gray-500 font-manrope">
                          Potensi geografis & lahan
                        </div>
                      </div>
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    <button
                      onClick={() => handleNavClick('sejarah-kelompok')}
                      className="w-full text-left px-4 py-3 hover:bg-[#f0fdf4] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-xl bg-[#f5ece0] text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-white transition-colors">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-[#1c4234] text-sm font-poppins">
                          Sejarah Kelompok Tani
                        </div>
                        <div className="text-xs text-gray-500 font-manrope">
                          Visi misi & kepengurusan
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Program (Dropdown) */}
              <div className="relative" ref={programRef}>
                <button
                  onClick={() => {
                    setProgramOpen(!programOpen);
                    setTentangOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center gap-1 cursor-pointer ${
                    isProgramActive
                      ? 'bg-[#1c4234] text-white shadow-sm'
                      : 'text-gray-700 hover:text-[#1c4234] hover:bg-white/80'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Program
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${programOpen ? 'rotate-180' : ''}`} />
                </button>

                {programOpen && (
                  <div className="absolute left-0 mt-3 w-72 rounded-2xl bg-white shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => handleNavClick('program')}
                      className="w-full text-left px-4 py-3 hover:bg-[#f0fdf4] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-xl bg-[#dbf0e3] text-[#1c4234] group-hover:bg-[#1c4234] group-hover:text-white transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-[#1c4234] text-sm font-poppins">
                          Hasil Panen & Penjualan
                        </div>
                        <div className="text-xs text-gray-500 font-manrope">
                          Rekapitulasi bulanan & arsip
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Katalog Produk */}
              <button
                onClick={() => handleNavClick('katalog')}
                className={`px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'katalog'
                    ? 'bg-[#1c4234] text-white shadow-sm'
                    : 'text-gray-700 hover:text-[#1c4234] hover:bg-white/80'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Katalog Produk
              </button>
            </div>

            {/* Orbitani Action CTA: Login Admin / Panel Admin */}
            <div className="hidden lg:flex items-center gap-3">
              {isAdmin ? (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="inline-flex items-center gap-2 bg-[#1c4234] hover:bg-[#0a1f14] text-white px-5 py-2.5 rounded-full font-poppins font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer border border-[#2d6a4f]"
                >
                  <ShieldCheck className="w-4 h-4 text-[#95d5b2]" />
                  <span>Panel Admin</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('login')}
                  className="inline-flex items-center gap-2 bg-[#1c4234] hover:bg-[#0a1f14] text-white px-5 py-2.5 rounded-full font-poppins font-bold text-xs tracking-wide shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#95d5b2]" />
                  <span>Login Admin</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-gray-700 hover:text-[#1c4234] hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 font-manrope">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center gap-3 ${
              currentView === 'home' ? 'bg-[#1c4234] text-white' : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            Beranda
          </button>

          <div className="border-l-2 border-[#1c4234] ml-4 pl-3 py-1 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 px-2 py-1">
              Tentang Kami
            </div>
            <button
              onClick={() => handleNavClick('tentang-desa')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'tentang-desa' ? 'bg-[#dbf0e3] text-[#1c4234] font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Profil Desa Dawuhan
            </button>
            <button
              onClick={() => handleNavClick('sejarah-kelompok')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'sejarah-kelompok' ? 'bg-[#dbf0e3] text-[#1c4234] font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Sejarah Kelompok Tani
            </button>
          </div>

          <div className="border-l-2 border-[#1c4234] ml-4 pl-3 py-1 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 px-2 py-1">
              Program
            </div>
            <button
              onClick={() => handleNavClick('program')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'program' ? 'bg-[#dbf0e3] text-[#1c4234] font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Hasil Panen & Penjualan
            </button>
          </div>

          <button
            onClick={() => handleNavClick('katalog')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center gap-3 ${
              currentView === 'katalog' ? 'bg-[#1c4234] text-white' : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Katalog Produk
          </button>

          <div className="pt-2">
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="w-full text-center bg-[#1c4234] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow"
              >
                <ShieldCheck className="w-5 h-5 text-[#95d5b2]" />
                Panel Admin
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="w-full text-center bg-[#1c4234] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow"
              >
                <Lock className="w-5 h-5 text-[#95d5b2]" />
                Login Admin
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
