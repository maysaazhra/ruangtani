import React from 'react';
import { useApp } from '../../context/AppContext'; // <-- PATH SUDAH DIPERBAIKI (../../)
import { CheckCircle2 } from 'lucide-react';

export const KatalogPage = () => {
  const { products, navigateTo } = useApp();

  return (
    <div className="bg-gray-50 min-h-screen py-12 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Katalog */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-poppins font-bold text-[#1c4234] mb-4">
            Katalog Produk Lumbung Desa
          </h1>
          <p className="text-gray-600 text-lg">
            Produk pertanian berkualitas langsung dari lahan Kelompok Tani Marsudi Among Tani Desa Dawuhan. Pesan mudah via WhatsApp.
          </p>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {/* Looping data produk dari dummyData.js */}
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">

              {/* Bagian Gambar */}
              <div className="relative h-64 overflow-hidden bg-gray-50">
                <img
                  src={product.gambar}
                  alt={product.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1c4234] shadow-sm">
                  {product.kategori}
                </div>
                <div className="absolute top-4 right-4 bg-[#1c4234]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                  Stok: {product.stok} kg
                </div>
              </div>

              {/* Bagian Konten */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-poppins font-bold text-xl text-[#1c4234] leading-tight mb-3">
                  {product.nama}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                  {product.deskripsi}
                </p>

                <div className="space-y-4 mb-6 mt-auto">
                  {/* Keunggulan */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Keunggulan Produk:</p>
                    <ul className="space-y-1.5">
                      {product.keunggulan.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Kemasan */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pilihan Kemasan:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.kemasanTersedia.map((kemasan, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md border border-gray-200">
                          {kemasan}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Harga */}
                <div className="pt-4 border-t border-gray-100 mb-5">
                  <p className="text-xs text-gray-500 mb-1">Harga Satuan Lumbung</p>
                  <div className="text-3xl font-poppins font-bold text-[#1c4234]">
                    Rp {product.harga.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">/ kg</span>
                  </div>
                </div>

                {/* TOMBOL PESAN VIA WA (PILIHAN ADMIN) */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center mb-1">Pesan via WhatsApp:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Admin 1 */}
                    <a
                      href={`https://wa.me/6282135942461?text=Halo%20Pak%20Slamet%20(Admin%201),%20saya%20tertarik%20memesan%20${product.nama}.%20Apakah%20stoknya%20masih%20ada?`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center bg-[#1c4234] hover:bg-[#0a1f14] text-white py-2.5 px-2 rounded-xl text-center transition-colors cursor-pointer"
                    >
                      <span className="text-[10px] text-gray-300">Admin 1</span>
                      <span className="text-xs font-bold">Pak Slamet</span>
                    </a>

                    {/* Admin 2 */}
                    <a
                      href={`https://wa.me/6285326653761?text=Halo%20Mba%20Dian%20(Admin%202),%20saya%20tertarik%20memesan%20${product.nama}.%20Apakah%20stoknya%20masih%20ada?`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center bg-[#c9a96e] hover:bg-[#b8985c] text-[#0a1f14] py-2.5 px-2 rounded-xl text-center transition-colors cursor-pointer"
                    >
                      <span className="text-[10px] text-[#0a1f14]/70">Admin 2</span>
                      <span className="text-xs font-bold">Mba Dian</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};