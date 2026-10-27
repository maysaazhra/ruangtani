import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatRupiah, formatNumber } from '../../utils/formatters';
import { 
  ShoppingBag, 
  MessageSquare, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  Scale, 
  Sparkles,
  PhoneCall,
  Info
} from 'lucide-react';

export const KatalogPage = () => {
  const { products, desaInfo } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  const filteredProducts = selectedFilter === 'Semua'
    ? products
    : products.filter(p => p.kategori === selectedFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-manrope">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#dbf0e3] text-[#1c4234] px-4 py-1.5 rounded-full text-xs font-poppins font-bold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5 text-[#1c4234]" />
          Katalog Pangan Petani Desa Dawuhan
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c4234]">
          Katalog Hasil Panen Petani
        </h1>
        
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-manrope">
          Dapatkan beras organik pulen, jagung pipil kering berkualitas, dan kedelai kuning murni langsung dari lumbung kelompok tani dengan timbangan digital presisi dan harga yang adil.
        </p>

        {/* Orbitani Pill Filter Switcher */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {['Semua', 'Padi', 'Jagung', 'Kedelai'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-poppins font-semibold transition-all cursor-pointer ${
                selectedFilter === category
                  ? 'bg-[#1c4234] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges in Orbitani Light Green Tints */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f0fdf4] p-5 rounded-2xl border border-[#dbf0e3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1c4234] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#95d5b2]" />
          </div>
          <div>
            <h4 className="font-poppins font-bold text-[#1c4234] text-sm">100% Panen Petani Dawuhan</h4>
            <p className="text-xs text-gray-600 font-manrope">Bebas oplosan & tanpa pemutih kimia</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c9a96e] text-white flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-poppins font-bold text-[#1c4234] text-sm">Timbangan Digital Tera</h4>
            <p className="text-xs text-gray-600 font-manrope">Akurat terverifikasi lumbung kelompok</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2d6a4f] text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-[#95d5b2]" />
          </div>
          <div>
            <h4 className="font-poppins font-bold text-[#1c4234] text-sm">Siap Kirim Partai / Eceran</h4>
            <p className="text-xs text-gray-600 font-manrope">Armada pikap & ekspedisi terpercaya</p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => {
          // Strict URL format requested by user:
          // https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20mau%20pesan%20[NAMA_PRODUK]
          const waUrl = `https://wa.me/${desaInfo.kontakWA}?text=Halo%20Admin,%20saya%20mau%20pesan%20${encodeURIComponent(prod.nama)}`;

          return (
            <div
              key={prod.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Photo */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={prod.gambar}
                  alt={prod.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge Orbitani Gold */}
                <div className="absolute top-4 left-4 bg-[#c9a96e] text-white text-[11px] font-poppins font-bold px-3 py-1 rounded-full shadow-sm">
                  {prod.kategori}
                </div>
                
                {/* Reactive Live Stock Indicator */}
                <div className="absolute top-4 right-4 bg-[#0a1f14]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#95d5b2] animate-pulse"></span>
                  <span>Stok: {formatNumber(prod.stok)} {prod.satuan}</span>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-poppins font-bold text-gray-900 group-hover:text-[#1c4234] transition-colors">
                    {prod.nama}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-3xl font-poppins font-bold text-[#1c4234]">
                      {formatRupiah(prod.harga)}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      / {prod.satuan}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-manrope">
                    {prod.deskripsi}
                  </p>

                  {/* Highlights / Keunggulan */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-gray-100">
                    <div className="text-[11px] font-poppins font-bold uppercase tracking-wider text-gray-400">
                      Keunggulan Produk:
                    </div>
                    {prod.keunggulan?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                        <span className="font-medium font-manrope">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Kemasan Tersedia */}
                  {prod.kemasanTersedia && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="text-[11px] font-poppins font-bold text-gray-500 mb-2">Pilihan Kemasan:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.kemasanTersedia.map((kem, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg"
                          >
                            {kem}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Big Action Button: Pesan via WA (Orbitani Style Pill) */}
                <div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#1c4234] hover:bg-[#0a1f14] active:scale-98 text-white font-poppins font-semibold py-3.5 px-6 rounded-full text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#95d5b2]" />
                    <span>Pesan via WA</span>
                  </a>
                  <p className="text-center text-[11px] text-gray-400 mt-2 font-manrope">
                    Terhubung langsung ke WhatsApp Admin Kelompok Tani
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Information Box on Purchasing */}
      <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-xs flex flex-col md:flex-row items-start gap-5">
        <div className="w-11 h-11 rounded-xl bg-[#f5ece0] text-[#c9a96e] flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-base font-poppins font-bold text-[#1c4234]">Alur Pemesanan & Pembelian Gabah</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-manrope">
            Untuk pemesanan partai besar (di atas 1 ton) oleh penggilingan padi, pengrajin tahu/tempe, atau koperasi, silakan hubungi pengurus kelompok tani minimal 2 hari sebelum pengambilan untuk persiapan penimbangan di lumbung desa.
          </p>
          <div className="pt-1 text-xs sm:text-sm font-semibold text-[#1c4234] flex items-center gap-2 font-poppins">
            <PhoneCall className="w-4 h-4 text-[#2d6a4f]" />
            <span>Kontak Layanan Pelanggan: {desaInfo.teleponDisplay} (Bapak Suwarno - Koordinator Logistik)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
