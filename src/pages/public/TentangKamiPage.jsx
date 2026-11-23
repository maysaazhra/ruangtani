import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  Compass, 
  Wheat, 
  LandPlot,
  Clock,
  Sparkles,
  ShieldCheck,
  Map
} from 'lucide-react';

export const TentangKamiPage = () => {
  const { currentView, desaInfo } = useApp();

  // Active tab: 'desa' (Profil Desa Dawuhan) or 'sejarah' (Sejarah Kelompok Tani)
  const [activeTab, setActiveTab] = useState(() => {
    return currentView === 'sejarah-kelompok' ? 'sejarah' : 'desa';
  });

  // State untuk Modal Peta
  const [modalPeta, setModalPeta] = useState(null);

  // Data blok (Sesuaikan nama file gambar dengan yang ada di folder public/peta/)
  const daftarBlok = [
    { id: 1, nama: 'Blok Blimbing', luas: '1.74 Ha', ketua: 'Pak Yatiman', gambar: '/peta/Blimbing.jpg' },
    { id: 2, nama: 'Blok Serang', luas: '3.74 Ha', ketua: 'Pak Sukasno', gambar: '/peta/Serang.jpg' },
    { id: 3, nama: 'Blok Wungu', luas: '2.87 Ha', ketua: 'Pak Sumarjo', gambar: '/peta/Wungu.jpg' },
    { id: 4, nama: 'Blok Krikil', luas: '7.20 Ha', ketua: 'Pak Suwarman', gambar: '/peta/Krikil.jpg' },
    { id: 5, nama: 'Blok Jembangan', luas: '3.03 Ha', ketua: 'Pak Taslim Miharjo', gambar: '/peta/Jembangan.jpg' },
    { id: 6, nama: 'Blok Margono', luas: '1.42 Ha', ketua: 'Pak Sutarjo', gambar: '/peta/Margono.jpg' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-manrope">
      
      {/* Page Title & Navigation Tabs */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#dbf0e3] text-[#1c4234] px-4 py-1.5 rounded-full text-xs font-poppins font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#1c4234]" />
          Mengenal Desa & Kelompok Tani
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c4234]">
          Tentang Desa Dawuhan & Poktan Marsudi Among Tani
        </h1>
        
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-manrope">
          Dedikasi petani lokal dalam mengolah tanah persawahan beririgasi teknis Desa Dawuhan, Kecamatan Banyumas melalui sistem digital terpadu RuangTani.
        </p>

        {/* Pill Switcher */}
        <div className="flex justify-center pt-3">
          <div className="bg-gray-100 p-1 rounded-full inline-flex border border-gray-200">
            <button
              onClick={() => setActiveTab('desa')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-poppins font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'desa'
                  ? 'bg-[#1c4234] text-white shadow-xs'
                  : 'text-gray-700 hover:text-[#1c4234]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Profil Desa Dawuhan
            </button>
            
            <button
              onClick={() => setActiveTab('sejarah')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-poppins font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'sejarah'
                  ? 'bg-[#1c4234] text-white shadow-xs'
                  : 'text-gray-700 hover:text-[#1c4234]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              Sejarah & Legalitas Poktan
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: PROFIL DESA DAWUHAN */}
      {activeTab === 'desa' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          
          {/* Hero Banner Profil Desa */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-[#0a1f14]">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
              alt="Pemandangan persawahan Desa Dawuhan"
              className="w-full h-80 sm:h-96 object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14] via-[#0a1f14]/60 to-transparent flex items-end p-6 sm:p-12">
              <div className="text-white space-y-2 max-w-2xl">
                <span className="bg-[#c9a96e] text-white text-[11px] font-poppins font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Potensi Agraris Pedesaan Banyumas
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                  Desa Dawuhan, Kec. Banyumas, Kab. Banyumas
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-manrope">
                  Kawasan agraris bersejarah di Kabupaten Banyumas yang menyimpan potensi besar padi sawah organik, jagung hibrida, kedelai kuning Anjasmoro, dan kacang hijau unggul.
                </p>
              </div>
            </div>
          </div>

          {/* Key Facts Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center mb-3">
                <LandPlot className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">20.0 Ha</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">Lahan 6 Blok Sawah</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-[#f5ece0] text-[#c9a96e] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">148 Petani</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">116 Laki, 32 Perempuan</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center mb-3">
                <Wheat className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">4 Komoditas</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">Padi, Jagung, Kedelai, K. Hijau</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">3 Masa Tanam</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">MT 01, MT 02, MT 03</div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-xs space-y-6">
              <h3 className="text-2xl font-serif font-bold text-[#1c4234]">
                Asal-Usul Nama Dawuhan & Makna Kearifan Lokal
              </h3>
              
              <div className="text-sm text-gray-700 space-y-4 leading-relaxed font-manrope whitespace-pre-line">
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

            {/* Sidebar Wilayah Binaan & Blok Sawah */}
            <div className="lg:col-span-4 bg-[#f0fdf4] p-8 rounded-3xl border border-[#dbf0e3] space-y-5">
              <h4 className="font-serif font-bold text-lg text-[#1c4234] border-b border-[#dbf0e3] pb-3 flex items-center gap-2">
                <Map className="w-5 h-5" />
                6 Blok Hamparan Pertanian
              </h4>
              
              <div className="space-y-3.5 text-xs font-manrope">
                {daftarBlok.map((blok) => (
                  <div 
                    key={blok.id} 
                    onClick={() => setModalPeta(blok)}
                    className="bg-white p-3 rounded-xl border border-[#dbf0e3] shadow-2xs hover:border-[#1c4234] hover:shadow-md cursor-pointer transition-all group flex justify-between items-center"
                  >
                    <div>
                      <span className="font-poppins font-bold text-[#1c4234] block">{blok.id}. {blok.nama} ({blok.luas})</span>
                      <span className="text-gray-600">Ketua Blok: {blok.ketua}</span>
                    </div>
                    <span className="text-[#40916c] font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SEJARAH & LEGALITAS KELOMPOK TANI (Tidak diubah) */}
      {activeTab === 'sejarah' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          {/* Sejarah & Visi Misi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] bg-[#dbf0e3] px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                Didirikan Sejak Agustus 1979
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#1c4234]">
                Sejarah Kelompok Tani "Marsudi Among Tani"
              </h3>

              <div className="text-sm text-gray-700 space-y-4 leading-relaxed font-manrope whitespace-pre-line">
                {desaInfo.sejarahKelompok}
              </div>

              {/* Prestasi */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <h4 className="font-serif font-bold text-lg text-[#1c4234] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#c9a96e]" />
                  Prestasi Kelompok Tani
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-manrope">
                  {desaInfo.prestasi?.map((p, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                      <span className="font-poppins font-bold text-[#1c4234] block">Tahun {p.tahun}</span>
                      <span className="text-gray-700">{p.predikat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legalitas & Kontak Resmi */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#1c4234] text-white p-8 rounded-3xl shadow-lg space-y-5">
                <div className="flex items-center gap-2 text-[#95d5b2]">
                  <ShieldCheck className="w-6 h-6" />
                  <h4 className="font-serif font-bold text-xl text-white">Legalitas Resmi</h4>
                </div>

                <div className="space-y-3 text-xs font-manrope text-white/80">
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase">Badan Hukum Kemenkumham:</span>
                    <span className="font-bold text-white">{desaInfo.badanHukum}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase">No. Registrasi Poktan:</span>
                    <span className="font-bold text-white">{desaInfo.nomorRegistrasi}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase">Sertifikat Halal:</span>
                    <span className="font-bold text-[#c9a96e]">{desaInfo.sertifikatHalal}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase">Kelas Kelompok:</span>
                    <span className="font-bold text-white">{desaInfo.kelasKelompok}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase">Pertanian Organik:</span>
                    <span className="font-bold text-white">{desaInfo.petaniOrganikBersertifikat}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-3 text-xs font-manrope">
                <h5 className="font-poppins font-bold text-[#1c4234]">Sekretariat Poktan:</h5>
                <p className="text-gray-600">{desaInfo.alamatSekretariat}</p>
                <p className="text-gray-600">Email: {desaInfo.email}</p>
                <p className="text-gray-600">WhatsApp: {desaInfo.teleponDisplay}</p>
              </div>
            </div>
          </div>

          {/* Susunan Pengurus */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] bg-[#dbf0e3] px-3 py-1 rounded-full mb-2">
                <Users className="w-3.5 h-3.5" />
                Tata Kelola Poktan
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1c4234]">
                Susunan Pengurus Kelompok Tani Marsudi Among Tani
              </h3>
              <p className="text-xs text-gray-500 font-manrope">
                Berdasarkan SK Kepala Desa Dawuhan No. 411.6/02/I/2015
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {desaInfo.strukturOrganisasi?.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#1c4234] transition-all">
                  <span className="text-[11px] font-poppins font-bold text-[#2d6a4f] uppercase tracking-wider block">
                    {s.jabatan}
                  </span>
                  <h4 className="font-serif font-bold text-base text-gray-900 mt-1">
                    {s.nama}
                  </h4>
                  <p className="text-xs text-gray-500 font-manrope mt-1">
                    {s.peran}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL POP-UP PETA BLOK --- */}
      {modalPeta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setModalPeta(null)}>
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Header Modal */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#f0fdf4]">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#1c4234]">{modalPeta.nama}</h3>
                <p className="text-sm text-gray-600 font-manrope">Luas: {modalPeta.luas} | Ketua: {modalPeta.ketua}</p>
              </div>
              <button onClick={() => setModalPeta(null)} className="text-gray-400 hover:text-red-500 text-3xl font-bold leading-none">&times;</button>
            </div>
            
            {/* Gambar Peta */}
            <div className="p-4 overflow-auto flex-1 bg-gray-50 flex justify-center items-center">
               <img src={modalPeta.gambar} alt={`Peta ${modalPeta.nama}`} className="max-w-full h-auto rounded-lg shadow-md border border-gray-300" />
            </div>

            {/* Keterangan Kode */}
            <div className="p-5 bg-[#1c4234] text-sm text-white font-manrope border-t border-green-900">
              <strong className="text-[#95d5b2]">Keterangan Petak:</strong> Kode pada peta (contoh: <b>JB-18</b>) menunjukkan lahan sawah organik. <b>JB</b> berarti Blok Jembangan, dan <strong>18</strong> adalah nomor petak.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};