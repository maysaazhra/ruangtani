import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, desaInfo } = useApp();

  return (
    <footer className="bg-[#0a1f14] text-white pt-16 pb-8 border-t border-[#1c4234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Kolom 1: Brand & Deskripsi */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              {/* LOGO DESA DITAMBAHKAN DI SINI */}
              <div className="w-12 h-12 bg-white rounded-xl p-1 shadow-md">
                <img
                  src="/logo-desa.jpeg"
                  alt="Logo Desa"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <h2 className="font-bold text-2xl tracking-tight">RuangTani</h2>
                <p className="text-sm text-gray-400">Desa Dawuhan</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Sistem informasi terpadu untuk pencatatan setoran panen, pengelolaan stok lumbung gabah, dan transparansi distribusi hasil pertanian Kelompok Tani Marsudi Among Tani Desa Dawuhan.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c4234]/50 border border-[#2d6a4f] text-[#95d5b2] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#95d5b2]"></span>
              Komunitas Tani & Lumbung Pangan Desa
            </div>
          </div>

          {/* Kolom 2: Menu Navigasi */}
          <div className="space-y-4">
            <h3 className="text-[#c9a96e] font-bold text-sm uppercase tracking-wider">Menu Navigasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Beranda</button></li>
              <li><button onClick={() => navigateTo('tentang-desa')} className="hover:text-white transition-colors">Profil Desa</button></li>
              <li><button onClick={() => navigateTo('program')} className="hover:text-white transition-colors">Program & Hasil Panen</button></li>
              <li><button onClick={() => navigateTo('katalog')} className="hover:text-white transition-colors">Katalog Produk</button></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Sekretariat */}
          <div className="space-y-4">
            <h3 className="text-[#c9a96e] font-bold text-sm uppercase tracking-wider">Sekretariat & Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#95d5b2] shrink-0 mt-0.5" />
                <span>{desaInfo.alamatSekretariat}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#95d5b2] shrink-0" />
                {/* NOMOR WA PAK SUKIRNO / ADMIN DISESUAIKAN */}
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  +62 812-3456-7890 (Pak SUKIRNO)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#95d5b2] shrink-0" />
                <a href="mailto:marsudiamongtani@gmail.com" className="hover:text-white transition-colors">
                  marsudiamongtani@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#1c4234] text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kelompok Tani Marsudi Among Tani. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};