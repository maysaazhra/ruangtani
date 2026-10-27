import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatRupiah, formatNumber } from '../../utils/formatters';
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Boxes, 
  MessageSquare, 
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  ExternalLink
} from 'lucide-react';

export const HomePage = () => {
  const { products, navigateTo, desaInfo, currentStocks, harvests } = useApp();

  const totalPanenAll = harvests.reduce((acc, h) => acc + (Number(h.jumlahKg) || 0), 0);
  const totalStokAll = (currentStocks.Padi || 0) + (currentStocks.Jagung || 0) + (currentStocks.Kedelai || 0);

  return (
    <div className="space-y-20 pb-20 font-manrope">
      
      {/* HERO SECTION — Orbitani Split Signature Style */}
      <section className="relative overflow-hidden bg-[#0a1f14] text-white">
        
        {/* Background Image with Orbitani Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f14] via-[#0a1f14]/90 to-[#0a1f14]/50 pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#95d5b2_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-7 text-left z-10">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-[#95d5b2]">
              <span className="w-2 h-2 rounded-full bg-[#95d5b2] animate-pulse"></span>
              <span>Sistem Informasi Pertanian Terpadu • Desa Dawuhan</span>
            </div>

            {/* Headline with Cormorant Garamond Serif */}
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08]">
              Kelompok Tani <br />
              <span className="text-[#c9a96e] italic font-serif">
                Marsudi Among Tani
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-xl font-manrope font-normal leading-relaxed">
              Platform transparansi hasil panen, pemantauan stok lumbung pangan desa, dan distribusi gabah berkualitas langsung dari petani lokal binaan Kelompok Tani Marsudi Among Tani Desa Dawuhan.
            </p>

            {/* Quick Metrics in Translucent Pill Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <div className="text-xl sm:text-2xl font-poppins font-bold text-[#c9a96e]">
                  {formatNumber(totalStokAll)} <span className="text-xs font-normal text-white/70">kg</span>
                </div>
                <div className="text-xs text-white/70 font-medium mt-1">Stok Lumbung</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <div className="text-xl sm:text-2xl font-poppins font-bold text-[#95d5b2]">
                  48+
                </div>
                <div className="text-xs text-white/70 font-medium mt-1">Petani Terdaftar</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <div className="text-xl sm:text-2xl font-poppins font-bold text-white">
                  42.5 <span className="text-xs font-normal text-white/70">Ha</span>
                </div>
                <div className="text-xs text-white/70 font-medium mt-1">Luas Lahan Binaan</div>
              </div>
            </div>

            {/* Pill CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('katalog')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 font-poppins font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-lg hover:shadow-black/20 flex items-center gap-2 group cursor-pointer"
              >
                <span>Katalog Gabah & Beras</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#95d5b2]" />
              </button>

              <button
                onClick={() => navigateTo('program')}
                className="bg-transparent hover:bg-white/10 text-white/90 border border-white/25 font-poppins font-medium px-6 py-3.5 rounded-full text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-[#c9a96e]" />
                <span>Rekap Panen Bulanan ↗</span>
              </button>
            </div>
          </div>

          {/* Right Visual Column (Card Preview) */}
          <div className="lg:col-span-5 z-10">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#2d6a4f] via-[#c9a96e]/30 to-[#95d5b2]/40 rounded-3xl blur-xl opacity-50"></div>
              
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0a1f14]">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80"
                  alt="Hamparan sawah subur Desa Dawuhan"
                  className="w-full h-80 object-cover"
                />
                
                <div className="p-6 bg-[#0a1f14]/95 text-left border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-poppins font-semibold text-[#c9a96e] mb-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Kec. Banyumas, Kab. Banyumas
                    </span>
                    <span className="bg-[#1c4234] text-[#95d5b2] px-2.5 py-0.5 rounded-full text-[11px]">
                      Terverifikasi Mandiri
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-white text-xl">
                    Lumbung Beras & Palawija Pilihan
                  </h3>
                  
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed font-manrope">
                    Persawahan subur dengan tata kelola irigasi Dawuhan menghasilkan kualitas gabah kering giling bermutu tinggi, siap didistribusikan langsung tanpa perantara.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: 3 PILAR KEUNGGULAN (Orbitani Card Aesthetic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center mb-5">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-poppins font-bold text-[#1c4234] mb-2">Pencatatan Panen Akurat</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-manrope">
              Setiap hasil panen ditimbang dan dicatat terperinci per komoditas serta petani penyetor, mewujudkan transparansi data agribisnis pedesaan.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#f5ece0] text-[#c9a96e] flex items-center justify-center mb-5">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-poppins font-bold text-[#1c4234] mb-2">Manajemen Stok Lumbung</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-manrope">
              Pantau ketersediaan stok gabah secara *real-time* untuk menjaga stabilitas cadangan pangan dan harga jual yang adil bagi petani dan pembeli.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center mb-5">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-poppins font-bold text-[#1c4234] mb-2">Pemesanan Langsung WhatsApp</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-manrope">
              Pembeli, koperasi, dan pengrajin pangan dapat terhubung langsung ke pengurus kelompok tani tanpa perantara tengkulak yang merugikan.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: PRODUK UNGGULAN (3 Kartu Padi, Jagung, Kedelai) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] bg-[#dbf0e3] px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1c4234]" />
              Komoditas Andalan Desa Dawuhan
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c4234]">
              Katalog Hasil Panen Pilihan
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 mt-1 font-manrope">
              Produk pangan bermutu tinggi yang dipanen langsung dari lahan binaan Kelompok Tani Marsudi Among Tani.
            </p>
          </div>

          <button
            onClick={() => navigateTo('katalog')}
            className="inline-flex items-center gap-1.5 text-[#1c4234] hover:text-[#0a1f14] font-poppins font-bold text-sm transition-colors group cursor-pointer"
          >
            <span>Lihat Semua Katalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={prod.gambar}
                    alt={prod.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge Orbitani Gold */}
                  <div className="absolute top-4 left-4 bg-[#c9a96e] text-white text-[11px] font-poppins font-bold px-3 py-1 rounded-full shadow-sm">
                    {prod.kategori}
                  </div>

                  {/* Stock Badge Orbitani Deep Green */}
                  <div className="absolute top-4 right-4 bg-[#0a1f14]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#95d5b2]"></span>
                    <span>Stok: {formatNumber(prod.stok)} {prod.satuan}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-poppins font-bold text-gray-900 group-hover:text-[#1c4234] transition-colors line-clamp-1">
                      {prod.nama}
                    </h3>

                    <div className="mt-2.5 flex items-baseline gap-1">
                      <span className="text-2xl font-poppins font-bold text-[#1c4234]">
                        {formatRupiah(prod.harga)}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">/ {prod.satuan}</span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {prod.deskripsi}
                    </p>

                    {/* Features */}
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                      {prod.keunggulan?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Button via WA (Orbitani Pill Button) */}
                  <div className="mt-6 pt-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#1c4234] hover:bg-[#0a1f14] text-white font-poppins font-semibold py-3 px-4 rounded-full text-xs sm:text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#95d5b2]" />
                      <span>Pesan via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: PROGRAM REKAP TEASER (Orbitani Deep Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0a1f14] to-[#1c4234] rounded-3xl p-8 sm:p-12 text-white border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="space-y-3 max-w-2xl text-left z-10">
            <span className="text-[11px] font-poppins font-bold uppercase tracking-wider text-[#95d5b2] bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Transparansi Sains Data Pertanian
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
              Akses Rekapitulasi Panen & Penjualan Desa
            </h3>
            <p className="text-sm sm:text-base text-white/80 font-manrope leading-relaxed">
              Masyarakat dan pembeli dapat meninjau riwayat panen padi, jagung, dan kedelai setiap bulan lengkap dengan arsip historis dan data petani binaan.
            </p>
          </div>

          <button
            onClick={() => navigateTo('program')}
            className="shrink-0 bg-white/20 hover:bg-white/30 text-white border border-white/40 font-poppins font-semibold px-8 py-4 rounded-full text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer z-10"
          >
            <span>Buka Laporan Program</span>
            <ArrowRight className="w-4 h-4 text-[#95d5b2]" />
          </button>
        </div>
      </section>

    </div>
  );
};
