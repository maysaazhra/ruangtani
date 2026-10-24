import React from 'react';
import { useApp } from '../context/AppContext';
import { Wheat, MapPin, Phone, Mail, ExternalLink, ShieldAlert, Heart } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, desaInfo, isAdmin } = useApp();

  return (
    <footer className="bg-green-950 text-green-100 border-t-4 border-green-700 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-green-800 text-amber-300 flex items-center justify-center shadow-lg">
                <Wheat className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Marsudi Among Tani</h3>
                <p className="text-xs text-green-300 font-medium">Desa Dawuhan • Sejak 2014</p>
              </div>
            </div>
            <p className="text-sm text-green-200/80 leading-relaxed">
              Mewujudkan kedaulatan pangan desa melalui tata kelola panen transparan, lumbung gabah modern, dan produk pertanian organik bermutu tinggi.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300 font-medium bg-green-900/60 p-2.5 rounded-xl border border-green-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistem Informasi Tani Berbasis Sains Data Masyarakat
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-sm border-b border-green-800 pb-2">
              Jelajahi Portal
            </h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  › Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tentang-desa')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  › Profil Desa Dawuhan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sejarah-kelompok')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  › Sejarah Kelompok Tani
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('program')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  › Rekap Panen & Penjualan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('katalog')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  › Katalog Gabah & Beras
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sekretariat & Kontak */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-sm border-b border-green-800 pb-2">
              Sekretariat & Kontak
            </h4>
            <div className="space-y-2.5 text-sm text-green-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-1" />
                <span>{desaInfo.alamatSekretariat}, {desaInfo.kecamatan}, {desaInfo.kabupaten}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${desaInfo.kontakWA}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors font-semibold"
                >
                  {desaInfo.teleponDisplay} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <span>{desaInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Akses Khusus Petugas */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-sm border-b border-green-800 pb-2">
              Akses Administrasi
            </h4>
            <p className="text-xs text-green-300/80 leading-relaxed">
              Area input data panen dan manajemen stok hanya dapat diakses oleh petugas pengurus kelompok tani.
            </p>
            {isAdmin ? (
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                Masuk Dashboard Admin
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="w-full bg-green-900/80 hover:bg-green-800 border border-green-700 text-green-100 font-semibold py-2.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Login Petugas Admin
              </button>
            )}
            <div className="text-xs text-green-400/60 pt-1">
              Demo login: admin / admin123
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-green-900 flex flex-col sm:flex-row items-center justify-between text-xs text-green-400/80 gap-3">
          <p>© 2026 Kelompok Tani Marsudi Among Tani Desa Dawuhan. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibangun dengan <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> untuk Kemakmuran Petani Desa Dawuhan
          </p>
        </div>
      </div>
    </footer>
  );
};
