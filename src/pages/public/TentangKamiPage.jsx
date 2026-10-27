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
  Sparkles
} from 'lucide-react';

export const TentangKamiPage = () => {
  const { currentView, desaInfo } = useApp();

  // Active tab: 'desa' (Profil Desa Dawuhan) or 'sejarah' (Sejarah Kelompok Tani)
  const [activeTab, setActiveTab] = useState(() => {
    return currentView === 'sejarah-kelompok' ? 'sejarah' : 'desa';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-manrope">
      
      {/* Page Title & Navigation Tabs */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#dbf0e3] text-[#1c4234] px-4 py-1.5 rounded-full text-xs font-poppins font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#1c4234]" />
          Mengenal Desa & Kelompok Tani
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c4234]">
          Tentang Desa Dawuhan & Marsudi Among Tani
        </h1>
        
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-manrope">
          Dedikasi petani lokal dalam mengolah tanah persawahan Desa Dawuhan, Kecamatan Banyumas melalui sistem digital terpadu RuangTani.
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
              Sejarah Kelompok Tani
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
                  Potensi Agraris Pedesaan
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                  Desa Dawuhan, Kec. Banyumas, Kab. Banyumas
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-manrope">
                  Kawasan agraris bersejarah di Kabupaten Banyumas yang menyimpan potensi besar padi organik, jagung hibrida, dan kedelai unggulan.
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
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">42.5 Ha</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">Lahan Binaan Tani</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-[#f5ece0] text-[#c9a96e] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">{desaInfo.jumlahAnggota}</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">Petani Terdaftar</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center mb-3">
                <Wheat className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">3 Komoditas</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">Padi, Jagung, Kedelai</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">3 Kali / Th</div>
              <div className="text-xs text-gray-600 font-manrope font-medium mt-1">Musim Tanam Intensif</div>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#1c4234] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#2d6a4f]" />
                Letak Geografis & Karakteristik Lahan
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line font-manrope">
                {desaInfo.profilDesa}
              </p>
              
              <div className="bg-[#f0fdf4] border-l-4 border-[#1c4234] p-4 rounded-r-xl">
                <p className="text-xs sm:text-sm text-[#1c4234] font-medium font-manrope">
                  "Nilai historis Dawuhan sebagai sentra pengaturan air persawahan sejak zaman dahulu menghadirkan tanah subur dan irigasi melimpah, menjadikan mutu gabah lebih bernas dan panen lebih optimal."
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
                <h4 className="font-poppins font-bold text-[#1c4234] text-sm uppercase tracking-wider">
                  Wilayah Dusun Binaan:
                </h4>
                <div className="space-y-3 font-manrope">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="font-bold text-gray-900 text-sm font-poppins">Dusun Pesarehan / Krajan</div>
                    <div className="text-xs text-gray-500 mt-0.5">Jl. Pesarehan Adipati Mrapat No 68 • Sentra Padi & Sekretariat</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="font-bold text-gray-900 text-sm font-poppins">Dusun Kalibening</div>
                    <div className="text-xs text-gray-500 mt-0.5">Sentra Budidaya Kedelai Anjasmoro & Kawasan Bersejarah</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="font-bold text-gray-900 text-sm font-poppins">Dusun Sawah Lor & Kidul</div>
                    <div className="text-xs text-gray-500 mt-0.5">Hamparan Jagung Pipil Kering & Padi Rendeng</div>
                  </div>
                </div>

                {/* Link to official portal */}
                <div className="pt-2 border-t border-gray-100">
                  <a
                    href="https://dawuhan-bms.desa.id/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1c4234] hover:underline"
                  >
                    <span>Portal Resmi: dawuhan-bms.desa.id ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SEJARAH KELOMPOK TANI */}
      {activeTab === 'sejarah' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          
          {/* Sejarah Narrative Box */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#f5ece0] text-[#c9a96e] px-3.5 py-1 rounded-full text-xs font-poppins font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#c9a96e]" />
              Didirikan Pada 14 Mei 2014
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c4234]">
              Asal-Usul Kelompok Tani "Marsudi Among Tani"
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line font-manrope">
              {desaInfo.sejarahKelompok}
            </p>
          </div>

          {/* Visi & Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#0a1f14] to-[#1c4234] text-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-4">
              <span className="text-[11px] font-poppins font-bold uppercase tracking-widest text-[#c9a96e] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                Visi Kelompok
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold leading-snug">
                "{desaInfo.visiMisi.visi}"
              </h3>
              <p className="text-xs text-white/70 leading-relaxed pt-2 font-manrope">
                Menjadi garda terdepan transformasi pertanian pedesaan dengan memanfaatkan sains data panen presisi dan distribusi yang adil.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <span className="text-[11px] font-poppins font-bold uppercase tracking-widest text-[#1c4234] bg-[#dbf0e3] px-3 py-1 rounded-full">
                Misi Kelompok
              </span>
              <h3 className="text-lg font-poppins font-bold text-gray-900">
                Langkah Nyata Kemakmuran Tani
              </h3>
              <div className="space-y-3 pt-2 font-manrope">
                {desaInfo.visiMisi.misi.map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-poppins">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Susunan Pengurus */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <h3 className="text-2xl font-serif font-bold text-[#1c4234]">
                Susunan Pengurus Kelompok Tani
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-manrope">
                Amanah kepengurusan periode 2023 - 2027 hasil musyawarah warga tani Desa Dawuhan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-3">
              {desaInfo.strukturOrganisasi.map((pengurus, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 hover:bg-[#f0fdf4] transition-colors p-5 rounded-xl border border-gray-200/60 space-y-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#1c4234] text-white flex items-center justify-center font-bold text-xs font-poppins">
                    {pengurus.nama.slice(4, 6).toUpperCase()}
                  </div>
                  <div className="text-[11px] font-poppins font-bold text-[#2d6a4f] uppercase tracking-wider">
                    {pengurus.jabatan}
                  </div>
                  <h4 className="text-sm font-poppins font-bold text-gray-900">
                    {pengurus.nama}
                  </h4>
                  <div className="text-xs text-gray-500 font-manrope">
                    {pengurus.peran}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
