import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatRupiah, formatNumber } from '../../utils/formatters';
import { 
  Wheat, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Boxes, 
  Users, 
  MessageSquare, 
  Sparkles,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const HomePage = () => {
  const { products, navigateTo, desaInfo, currentStocks, harvests } = useApp();

  const totalPanenAll = harvests.reduce((acc, h) => acc + (Number(h.jumlahKg) || 0), 0);
  const totalStokAll = (currentStocks.Padi || 0) + (currentStocks.Jagung || 0) + (currentStocks.Kedelai || 0);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-900 via-green-800 to-green-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-2xl border border-green-700/40">
        
        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#86efac_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-green-700/60 border border-green-500/50 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-200 backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Sistem Informasi Pertanian Terpadu Desa Dawuhan
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Kelompok Tani <br className="hidden sm:inline" />
              <span className="text-amber-300 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300">
                Marsudi Among Tani
              </span>
            </h1>

            <p className="text-base sm:text-lg text-green-100/90 max-w-2xl leading-relaxed">
              Pusat transparansi data hasil panen, ketersediaan stok gabah lumbung desa, dan saluran pemesanan langsung komoditas pertanian unggulan dari petani Desa Dawuhan, Padamara, Purbalingga.
            </p>

            {/* Quick stats in Hero */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="bg-green-900/80 border border-green-700/60 p-3 sm:p-4 rounded-2xl">
                <div className="text-xl sm:text-2xl font-black text-amber-300">{formatNumber(totalStokAll)} <span className="text-xs font-normal text-white">kg</span></div>
                <div className="text-xs text-green-200 font-medium">Stok Tersedia</div>
              </div>
              <div className="bg-green-900/80 border border-green-700/60 p-3 sm:p-4 rounded-2xl">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">48+</div>
                <div className="text-xs text-green-200 font-medium">Petani Binaan</div>
              </div>
              <div className="bg-green-900/80 border border-green-700/60 p-3 sm:p-4 rounded-2xl">
                <div className="text-xl sm:text-2xl font-black text-yellow-300">42.5 <span className="text-xs font-normal text-white">Ha</span></div>
                <div className="text-xs text-green-200 font-medium">Luas Lahan</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('katalog')}
                className="bg-amber-400 hover:bg-amber-300 text-green-950 font-extrabold px-7 py-4 rounded-2xl text-base transition-all shadow-xl hover:shadow-amber-400/20 flex items-center gap-2 group cursor-pointer"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('program')}
                className="bg-green-800/80 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-2xl text-base transition-all border border-green-600/60 flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-5 h-5 text-emerald-300" />
                <span>Data Hasil Panen</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-3xl blur-lg opacity-40 animate-pulse"></div>
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-green-950">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80"
                  alt="Hamparan sawah subur Desa Dawuhan"
                  className="w-full h-80 object-cover"
                />
                <div className="p-5 bg-gradient-to-t from-green-950 via-green-900/90 to-transparent text-left">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Lereng Gunung Slamet
                    </span>
                    <span className="bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-200">
                      Irigasi Terawat
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base">
                    Lumbung Beras & Palawija Organik Dawuhan
                  </h3>
                  <p className="text-xs text-green-200/80 mt-1">
                    Tanah vulkanis alami dengan air mata air pegunungan menghasilkan padi berbulir utuh, pulen, dan minim residu kimia.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section: Nilai Utama & Transparansi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-green-950 mb-2">Pencatatan Panen Real-Time</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Data panen dicatat langsung oleh operator kelompok tani per petani dan per komoditas, menjamin transparansi hasil bumi desa.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-green-950 mb-2">Manajemen Stok Lumbung</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ketersediaan gabah dan palawija dipantau ketat, mencegah kelangkaan serta menjaga stabilitas harga jual bagi petani dan pembeli.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-green-950 mb-2">Pesan Langsung via WhatsApp</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pembeli, koperasi, dan pengrajin pangan dapat memesan langsung tanpa perantara tengkulak melalui saluran resmi pengurus kelompok.
            </p>
          </div>
        </div>
      </section>

      {/* Section: PRODUK UNGGULAN (3 Kartu Produk: Padi, Jagung, Kedelai) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100/80 px-3 py-1 rounded-full mb-2">
              <Wheat className="w-3.5 h-3.5" />
              Komoditas Andalan Desa Dawuhan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-green-950">
              Produk Unggulan Kelompok Tani
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Hasil panen pilihan dengan standar mutu terjaga, siap kirim langsung dari lumbung petani.
            </p>
          </div>

          <button
            onClick={() => navigateTo('katalog')}
            className="inline-flex items-center gap-2 text-green-800 font-bold hover:text-green-900 transition-colors group text-sm sm:text-base"
          >
            <span>Buka Katalog Lengkap</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((prod) => {
            const waMessage = encodeURIComponent(`Halo Admin Kelompok Tani Marsudi Among Tani Desa Dawuhan, saya mau pesan ${prod.nama}. Apakah stok masih tersedia?`);
            const waUrl = `https://wa.me/${desaInfo.kontakWA}?text=${waMessage}`;

            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl overflow-hidden border border-green-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={prod.gambar}
                    alt={prod.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-green-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Stok: {formatNumber(prod.stok)} {prod.satuan}
                  </div>
                  <div className="absolute top-4 left-4 bg-amber-400 text-green-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                    {prod.kategori}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-800 transition-colors line-clamp-1">
                      {prod.nama}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-green-800">
                        {formatRupiah(prod.harga)}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">/ {prod.satuan}</span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {prod.deskripsi}
                    </p>

                    {/* Features list */}
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                      {prod.keunggulan?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Button via WA */}
                  <div className="mt-6 pt-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm transition-all shadow-md hover:shadow-emerald-700/20 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Pesan via WA</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Teaser Program & Hasil Panen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 sm:p-12 border border-green-200/80 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-green-800 bg-green-200/60 px-3 py-1 rounded-full">
              Transparansi Panen Desa
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-green-950">
              Pantau Rekapitulasi Panen & Penjualan Bulanan
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Masyarakat dan pembeli dapat melihat riwayat panen padi, jagung, dan kedelai setiap bulan, lengkap dengan arsip bulan-bulan sebelumnya serta data petani aktif.
            </p>
          </div>

          <button
            onClick={() => navigateTo('program')}
            className="shrink-0 bg-green-800 hover:bg-green-900 text-white font-extrabold px-8 py-4 rounded-2xl text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <span>Buka Rekapitulasi Program</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};
