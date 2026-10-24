import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Compass, 
  Wheat, 
  ArrowRight,
  ShieldCheck,
  LandPlot
} from 'lucide-react';

export const TentangKamiPage = () => {
  const { currentView, navigateTo, desaInfo } = useApp();

  // Active tab: 'desa' (Profil Desa Dawuhan) or 'sejarah' (Sejarah Kelompok Tani)
  const [activeTab, setActiveTab] = useState(() => {
    return currentView === 'sejarah-kelompok' ? 'sejarah' : 'desa';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Title & Navigation Tabs */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Wheat className="w-4 h-4 text-green-700" />
          Mengenal Desa & Kelompok Tani
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-950">
          Tentang Desa Dawuhan & Marsudi Among Tani
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Dedikasi petani lokal dalam mengolah tanah berkah lereng Gunung Slamet untuk ketahanan pangan nusantara.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center pt-4">
          <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex border border-gray-200">
            <button
              onClick={() => setActiveTab('desa')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                activeTab === 'desa'
                  ? 'bg-green-800 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Profil Desa Dawuhan
            </button>
            <button
              onClick={() => setActiveTab('sejarah')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                activeTab === 'sejarah'
                  ? 'bg-green-800 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-900'
              }`}
            >
              <Sprout className="w-4 h-4" />
              Sejarah Kelompok Tani
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: PROFIL DESA DAWUHAN */}
      {activeTab === 'desa' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          {/* Hero Banner Profil Desa */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-green-950">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
              alt="Pemandangan persawahan Desa Dawuhan"
              className="w-full h-80 sm:h-96 object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/60 to-transparent flex items-end p-6 sm:p-12">
              <div className="text-white space-y-2 max-w-2xl">
                <span className="bg-amber-400 text-green-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Potensi Agraris Desa
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Desa Dawuhan, Padamara, Purbalingga
                </h2>
                <p className="text-sm sm:text-base text-green-100/90 leading-relaxed">
                  Kawasan agraris hijau yang subur diapit perbukitan asri, menyimpan potensi besar padi organik, jagung, dan kedelai unggulan.
                </p>
              </div>
            </div>
          </div>

          {/* Key Facts Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-green-100 text-green-800 flex items-center justify-center mb-3">
                <LandPlot className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-green-950">42.5 Ha</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Lahan Binaan Tani</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-green-950">{desaInfo.jumlahAnggota}</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Petani Terdaftar</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Wheat className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-green-950">3 Komoditas</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Padi, Jagung, Kedelai</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-green-950">3 Kali / Th</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Musim Tanam Intensif</div>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-green-100 shadow-sm space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-green-950 flex items-center gap-2">
                <Compass className="w-6 h-6 text-green-700" />
                Letak Geografis & Karakteristik Lahan
              </h3>
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {desaInfo.profilDesa}
              </p>
              
              <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-2xl">
                <p className="text-sm text-emerald-950 font-medium">
                  "Kekayaan alam vulkanik Desa Dawuhan memberikan mineral tanah terlengkap, menjadikan rasa nasi lebih manis alami dan kedelai lebih padat sari kedelai."
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm space-y-4">
                <h4 className="font-bold text-green-950 text-base">Wilayah Dusun Binaan:</h4>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="font-bold text-gray-900 text-sm">Dusun Krajan (RT 01 - 03 / RW 01)</div>
                    <div className="text-xs text-gray-500 mt-0.5">Sentra Padi Ciherang & Sekretariat Kelompok Tani</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="font-bold text-gray-900 text-sm">Dusun Kebondalem (RT 01 - 03 / RW 03)</div>
                    <div className="text-xs text-gray-500 mt-0.5">Sentra Budidaya Kedelai Anjasmoro & Bahan Tahu Tempe</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="font-bold text-gray-900 text-sm">Dusun Sawah Lor & Kidul (RW 02 & 04)</div>
                    <div className="text-xs text-gray-500 mt-0.5">Hamparan Jagung Pipil Kering & Padi Rendeng</div>
                  </div>
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
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-green-100 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-700" />
              Didirikan Pada 14 Mei 2014
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-green-950">
              Asal-Usul Kelompok Tani "Marsudi Among Tani"
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {desaInfo.sejarahKelompok}
            </p>
          </div>

          {/* Visi & Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-800 to-green-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Visi Kelompok
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                "{desaInfo.visiMisi.visi}"
              </h3>
              <p className="text-xs sm:text-sm text-green-200/80 leading-relaxed pt-2">
                Menjadi garda terdepan transformasi pertanian pedesaan dengan memanfaatkan transparansi data panen dan distribusi yang adil.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-green-100 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-green-800 bg-green-100 px-3 py-1 rounded-full">
                Misi Kelompok
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Langkah Nyata Kemakmuran Tani
              </h3>
              <div className="space-y-3 pt-2">
                {desaInfo.visiMisi.misi.map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Susunan Pengurus */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-green-100 shadow-sm space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-extrabold text-green-950">
                Susunan Pengurus Kelompok Tani
              </h3>
              <p className="text-sm text-gray-600">
                Amanah kepengurusan periode 2023 - 2027 hasil musyawarah warga tani Desa Dawuhan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {desaInfo.strukturOrganisasi.map((pengurus, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 hover:bg-green-50/60 transition-colors p-6 rounded-2xl border border-gray-100 space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-800 text-white flex items-center justify-center font-bold text-sm">
                    {pengurus.nama.slice(4, 6).toUpperCase()}
                  </div>
                  <div className="text-xs font-bold text-green-800 uppercase tracking-wider">
                    {pengurus.jabatan}
                  </div>
                  <h4 className="text-base font-bold text-gray-900">
                    {pengurus.nama}
                  </h4>
                  <div className="text-xs text-gray-500">
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
