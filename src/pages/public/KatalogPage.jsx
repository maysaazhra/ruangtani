import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatRupiah, formatNumber } from '../../utils/formatters';
import { 
  ShoppingBag, 
  MessageSquare, 
  CheckCircle, 
  Wheat, 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4 text-green-700" />
          Katalog Pangan Langsung Petani
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-950">
          Katalog Hasil Panen Desa Dawuhan
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Dapatkan beras organik pulen, jagung pipil kering berkualitas, dan kedelai kuning murni langsung dari lumbung kelompok tani dengan jaminan mutu dan timbangan presisi.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {['Semua', 'Padi', 'Jagung', 'Kedelai'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === category
                  ? 'bg-green-800 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-emerald-50/70 p-4 sm:p-6 rounded-3xl border border-emerald-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-950 text-sm">100% Hasil Panen Petani</h4>
            <p className="text-xs text-emerald-800/80">Bebas oplosan & tanpa pemutih kimia</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-amber-950 text-sm">Timbangan Digital Tera</h4>
            <p className="text-xs text-amber-900/80">Akurat dan terverifikasi kelompok</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-green-950 text-sm">Siap Kirim Partai / Eceran</h4>
            <p className="text-xs text-green-900/80">Armada pikap & ekspedisi terpercaya</p>
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
              className="bg-white rounded-3xl overflow-hidden border border-green-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Photo */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={prod.gambar}
                  alt={prod.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-amber-400 text-green-950 text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                  {prod.kategori}
                </div>
                
                {/* Reactive Live Stock Indicator */}
                <div className="absolute top-4 right-4 bg-green-950/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Stok: {formatNumber(prod.stok)} {prod.satuan}</span>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-green-800 transition-colors">
                    {prod.nama}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-green-800">
                      {formatRupiah(prod.harga)}
                    </span>
                    <span className="text-sm font-semibold text-gray-500">
                      / {prod.satuan}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {prod.deskripsi}
                  </p>

                  {/* Highlights / Keunggulan */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-gray-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Keunggulan Produk:
                    </div>
                    {prod.keunggulan?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Kemasan Tersedia */}
                  {prod.kemasanTersedia && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="text-xs font-bold text-gray-500 mb-2">Pilihan Kemasan:</div>
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

                {/* Big Action Button: Pesan via WA */}
                <div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold py-4 px-6 rounded-2xl text-base transition-all shadow-lg hover:shadow-emerald-700/30 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Pesan via WA</span>
                  </a>
                  <p className="text-center text-[11px] text-gray-400 mt-2">
                    Terhubung langsung ke WhatsApp Admin Kelompok Tani
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Information Box on Purchasing */}
      <div className="bg-white rounded-3xl p-8 border border-green-200/80 shadow-sm flex flex-col md:flex-row items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
          <Info className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-green-950">Alur Pemesanan & Pembelian Gabah</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Untuk pemesanan partai besar (di atas 1 ton) oleh pabrik penggilingan padi, pengrajin tahu/tempe, atau koperasi, silakan hubungi pengurus kelompok tani minimal 2 hari sebelum pengambilan untuk persiapan penimbangan dan pemuatan di lumbung desa.
          </p>
          <div className="pt-1 text-sm font-semibold text-green-800 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>Kontak Layanan Pelanggan: {desaInfo.teleponDisplay} (Bapak Suwarno - Koordinator Logistik)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
