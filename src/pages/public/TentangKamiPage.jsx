import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Leaf, Info, X, Sprout, CheckCircle2, User, Maximize, Compass } from 'lucide-react';

export const TentangKamiPage = () => {
  const { desaInfo } = useApp();
  
  const [selectedBlok, setSelectedBlok] = useState(null);

  // DATA BLOK (Hanya 4 Blok, Serang & Margono dihapus)
  const dataBlok = [
    {
      id: 'krikil',
      nama: 'Blok Krikil',
      gambar: '/peta/Krikil.jpg',
      luas: '7.20 Ha',
      ketua: 'Pak Suwarman',
      deskripsi: 'Hamparan sawah irigasi teknis dari Bendung Krikil. Terdapat 20+ petak lahan organik dan konvensional.',
      petakOrganik: ['KR-03', 'KR-11', 'KR-12', 'KR-22', 'KR-23', 'KR-25', 'KR-29']
    },
    {
      id: 'jembangan',
      nama: 'Blok Jembangan',
      gambar: '/peta/Jembangan.jpg',
      luas: '3.03 Ha',
      ketua: 'Pak Taslim Miharjo',
      deskripsi: 'Lahan sawah dengan irigasi dari Sungai Dawuhan. Memiliki petak organik unggulan.',
      petakOrganik: ['JB-10', 'JB-18']
    },
    {
      id: 'wungu',
      nama: 'Blok Wungu',
      gambar: '/peta/Wungu.jpg',
      luas: '2.87 Ha',
      ketua: 'Pak Sumarjo',
      deskripsi: 'Lahan dengan irigasi teratur dan bak filter air. Berbatasan langsung dengan Desa Kalisube.',
      petakOrganik: ['WG-01', 'WG-04', 'WG-05', 'WG-06']
    },
    {
      id: 'blimbing',
      nama: 'Blok Blimbing',
      gambar: '/peta/Blimbing.jpg',
      luas: '1.74 Ha',
      ketua: 'Pak Yatiman',
      deskripsi: 'Terletak di perbukitan. Sumber air langsung dari mata air gunung melalui selang sejauh 70m.',
      petakOrganik: ['BL-02', 'BL-04']
    }
  ];

  return (
    // Menggunakan py-12 agar tidak terlalu menjorok ke bawah
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-manrope">
      
      {/* Page Title - Jarak antar elemen dirapatkan */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c4234] mb-4">
          Tentang Desa Dawuhan & Poktan Marsudi Among Tani
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-manrope">
          Dedikasi petani lokal dalam mengolah tanah persawahan beririgasi teknis Desa Dawuhan, Kecamatan Banyumas melalui sistem digital terpadu RuangTani.
        </p>
      </div>

      {/* Narrative Content (Teks Profil) */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm mb-10">
        <h3 className="text-2xl font-serif font-bold text-[#1c4234] mb-4">
          Asal-Usul Nama Dawuhan & Makna Kearifan Lokal
        </h3>
        
        <div className="text-sm text-gray-700 leading-relaxed font-manrope whitespace-pre-line mb-6">
          {desaInfo.profilDesa}
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs font-poppins font-semibold text-gray-600">
          <span className="flex items-center gap-1.5 text-[#1c4234]">
            <Compass className="w-4 h-4 text-[#2d6a4f]" /> Ketinggian: 50 - 80 mdpl
          </span>
          <span>•</span>
          <span>Kemiringan: 10 Derajat</span>
          <span>•</span>
          <span>Irigasi: 3 Bendung (Gombyang, Krikil, Dukuh)</span>
        </div>
      </div>

      {/* BAGIAN PETA BLOK (Langsung menyatu, tidak pakai kotak putih besar) */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-[#1c4234] text-xs font-bold mb-3">
            <MapPin className="w-4 h-4" />
            PEMETAAN SPASIAL LAHAN
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1c4234]">Blok Hamparan Pertanian</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
            Klik pada peta blok di bawah untuk melihat detail ketua blok dan daftar petak lahan organik.
          </p>
        </div>

        {/* Grid Peta (Langsung 4 Kolom sejajar tanpa card pembungkus besar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataBlok.map((blok) => (
            <div 
              key={blok.id}
              onClick={() => setSelectedBlok(blok)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#1c4234] transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-40 overflow-hidden bg-gray-50 relative">
                <img 
                  src={blok.gambar} 
                  alt={blok.nama} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#1c4234] shadow-sm flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-green-600" />
                  {blok.petakOrganik.length} Petak
                </div>
              </div>
              <div className="p-4 text-center flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#1c4234] text-base mb-1">{blok.nama}</h3>
                  <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><Maximize className="w-3 h-3" /> {blok.luas}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1c4234] group-hover:text-green-600 mt-2">
                  Lihat Detail &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DETAIL PETA (POP-UP) */}
      {selectedBlok && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#f8faf8]">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#1c4234]">{selectedBlok.nama}</h3>
                <p className="text-xs text-gray-500">Peta Tinjau & Informasi Petak</p>
              </div>
              <button 
                onClick={() => setSelectedBlok(null)}
                className="p-2 bg-white text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors border border-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col md:flex-row gap-8">
              
              <div className="md:w-3/5 space-y-4">
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={selectedBlok.gambar} alt="Peta" className="w-full h-auto object-contain" />
                </div>
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{selectedBlok.deskripsi}</p>
                </div>
              </div>

              <div className="md:w-2/5 space-y-4">
                <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">Informasi Blok</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex justify-between"><span>Ketua Blok:</span> <span className="font-bold text-[#1c4234]">{selectedBlok.ketua}</span></p>
                    <p className="flex justify-between"><span>Luas Lahan:</span> <span className="font-bold text-[#1c4234]">{selectedBlok.luas}</span></p>
                  </div>
                </div>

                <div className="bg-[#f0fdf4] border border-green-200 p-5 rounded-xl">
                  <h4 className="font-bold text-green-900 flex items-center gap-2 mb-3 text-sm">
                    <Leaf className="w-4 h-4" /> Petak Lahan Organik
                  </h4>
                  <p className="text-xs text-green-800 mb-4">
                    Kode petak di bawah ini merujuk pada peta. (Contoh: <b>JB-18</b> = Jembangan petak 18).
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedBlok.petakOrganik.length > 0 ? (
                      selectedBlok.petakOrganik.map((petak) => (
                        <span key={petak} className="px-3 py-1.5 bg-white text-green-700 font-bold text-sm rounded-lg border border-green-200 shadow-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {petak}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic">Belum ada data petak organik.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};