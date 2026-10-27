import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, ShieldAlert, Sprout } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, desaInfo, isAdmin } = useApp();

  return (
    <footer className="bg-[#0a1f14] text-white/90 border-t border-white/10 mt-20 pt-16 pb-12 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Col 1: Identity & RuangTani */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1c4234] flex items-center justify-center text-white shadow-md border border-white/10">
                <Sprout className="w-5 h-5 text-[#95d5b2]" />
              </div>
              <div className="text-left">
                <span className="font-poppins font-bold text-lg text-white tracking-tight">
                  Ruang<span className="text-[#95d5b2]">Tani</span>
                </span>
                <p className="text-[10px] text-white/60 font-manrope font-medium leading-none">
                  Desa Dawuhan
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Sistem informasi terpadu untuk pencatatan setoran panen, pengelolaan stok lumbung gabah, dan transparansi distribusi hasil pertanian Kelompok Tani Marsudi Among Tani Desa Dawuhan.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-[11px] text-[#95d5b2] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95d5b2] animate-pulse"></span>
                <span>Komunitas Tani & Lumbung Pangan Desa</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs uppercase tracking-widest text-[#c9a96e]">
              Menu Layanan
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-[#95d5b2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  › Beranda RuangTani
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tentang-desa')}
                  className="hover:text-[#95d5b2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  › Profil Desa Dawuhan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sejarah-kelompok')}
                  className="hover:text-[#95d5b2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  › Sejarah Kelompok Tani
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('program')}
                  className="hover:text-[#95d5b2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  › Rekap Panen & Penjualan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('katalog')}
                  className="hover:text-[#95d5b2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  › Katalog Gabah & Beras
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sekretariat & Kontak */}
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs uppercase tracking-widest text-[#c9a96e]">
              Sekretariat & Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c9a96e] shrink-0 mt-0.5" />
                <span>{desaInfo.alamatSekretariat}, {desaInfo.kecamatan}, {desaInfo.kabupaten}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#95d5b2] shrink-0" />
                <a
                  href={`https://wa.me/${desaInfo.kontakWA}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#95d5b2] transition-colors font-semibold"
                >
                  {desaInfo.teleponDisplay} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#95d5b2] shrink-0" />
                <span>{desaInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Akses Khusus & Status */}
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs uppercase tracking-widest text-[#c9a96e]">
              Akses Operator
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Pencatatan setoran panen dan penyesuaian stok gabah dibatasi khusus untuk pengurus kelompok tani.
            </p>
            {isAdmin ? (
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="w-full bg-[#1c4234] hover:bg-[#235341] text-white font-poppins font-semibold py-2.5 px-4 rounded-full text-xs transition-all border border-[#2d6a4f] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Dashboard Admin
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-poppins font-semibold py-2.5 px-4 rounded-full text-xs transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#c9a96e]" />
                <span>Login Operator Admin</span>
              </button>
            )}
            
            <div className="text-[11px] text-white/50 pt-1 font-mono">
              Lokasi Server: Indonesia (ID-JKT) · Sistem Online
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3">
          <p>© 2026 RuangTani · Kelompok Tani Marsudi Among Tani Desa Dawuhan</p>
          <p className="text-white/50 text-[11px]">
            Sistem Informasi Sains Data untuk Masyarakat
          </p>
        </div>
      </div>
    </footer>
  );
};
