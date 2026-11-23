import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  ArrowRight,
  MapPin,
  BarChart3,
  ChevronRight
} from 'lucide-react';

export const HomePage = () => {
  const { products, navigateTo, desaInfo } = useApp();

  return (
    <div className="font-manrope">
      {/* HERO SECTION (SESUAI FOTO LAPTOPMU) */}
      <section className="relative bg-[#1c4234] text-white overflow-hidden min-h-[80vh] flex items-center">

        {/* Efek Titik-titik di Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Bagian Kiri (Teks & Statistik) */}
            <div className="lg:w-3/5 space-y-8">

              {/* Badge Atas */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#40916c] bg-[#2d6a4f]/50 text-[#95d5b2] text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#95d5b2]"></span>
                Sistem Informasi Pertanian Terpadu • Desa Dawuhan
              </div>

              {/* Judul Utama (Font Serif) */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight">
                Kelompok Tani <br />
                <span className="text-[#c9a96e] italic">Marsudi Among Tani</span>
              </h1>

              {/* Deskripsi */}
              <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                Platform transparansi hasil panen, pemantauan stok lumbung pangan desa, dan distribusi gabah berkualitas langsung dari petani lokal binaan Kelompok Tani Marsudi Among Tani Desa Dawuhan.
              </p>

              {/* 3 Kotak Statistik */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-[#2d6a4f]/60 backdrop-blur-sm border border-[#40916c]/50 p-5 rounded-2xl">
                  <div className="text-3xl font-bold text-[#95d5b2] mb-1">11.380 <span className="text-sm font-normal text-white">kg</span></div>
                  <div className="text-sm text-gray-200 font-medium">Stok Lumbung</div>
                </div>
                <div className="bg-[#2d6a4f]/60 backdrop-blur-sm border border-[#40916c]/50 p-5 rounded-2xl">
                  <div className="text-3xl font-bold text-[#95d5b2] mb-1">48+</div>
                  <div className="text-sm text-gray-200 font-medium">Petani Terdaftar</div>
                </div>
                <div className="bg-[#2d6a4f]/60 backdrop-blur-sm border border-[#40916c]/50 p-5 rounded-2xl">
                  <div className="text-3xl font-bold text-[#95d5b2] mb-1">42.5 <span className="text-sm font-normal text-white">Ha</span></div>
                  <div className="text-sm text-gray-200 font-medium">Luas Lahan Binaan</div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => navigateTo('katalog')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#95d5b2] hover:bg-[#74c69d] text-[#0a1f14] font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Katalog Gabah & Beras
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateTo('program')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/30 hover:border-white hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Rekap Panen Bulanan
                </button>
              </div>

            </div>

            {/* Bagian Kanan (Gambar Card - Sesuai Foto) */}
            <div className="lg:w-2/5 w-full hidden lg:block">
              <div className="bg-[#0a1f14] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative h-[500px]">
                {/* Gambar Sawah */}
                <img
                  src="/sawah.jpeg"
                  alt="Lumbung Beras & Palawija"
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14] via-[#0a1f14]/40 to-transparent"></div>

                {/* Teks di Bawah Gambar */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c9a96e] mb-2">
                    <MapPin className="w-4 h-4" />
                    Kec. Banyumas, Kab. Banyumas
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    Lumbung Beras & Palawija
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    Persawahan subur dengan tata kelola irigasi teknis. Menghasilkan gabah kualitas kering giling bernas untuk kesejahteraan petani.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUK UNGGULAN */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#1c4234]">Produk Unggulan</h2>
              <p className="text-gray-500 mt-2">Hasil panen terbaik dari lahan kelompok tani Dawuhan.</p>
            </div>
            <button
              onClick={() => navigateTo('katalog')}
              className="text-[#1c4234] font-bold flex items-center gap-1 hover:text-[#40916c] transition-colors"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={prod.gambar}
                    alt={prod.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-[#1c4234]">
                    {prod.kategori}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-[#1c4234] text-lg line-clamp-2 mb-2">
                    {prod.nama}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">Mulai dari</span>
                      <div className="font-bold text-[#2d6a4f]">
                        Rp {prod.harga.toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-500">/kg</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigateTo('katalog')}
                      className="w-10 h-10 rounded-full bg-[#f0fdf4] text-[#1c4234] flex items-center justify-center hover:bg-[#1c4234] hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};