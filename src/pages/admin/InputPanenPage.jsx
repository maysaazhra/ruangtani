import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getMasaTanamFromDate } from '../../utils/formatters';
import {
  PlusCircle,
  Save,
  RotateCcw,
  Wheat,
  Calendar,
  User,
  Scale,
  Sprout,
  FileText,
  CheckCircle2,
  Clock,
  UploadCloud // Tambahan ikon untuk upload
} from 'lucide-react';

export const InputPanenPage = () => {
  const { farmers, addHarvest } = useApp();

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // Form states
  const [petaniId, setPetaniId] = useState(farmers[0]?.id || 'petani-1');
  const [komoditas, setKomoditas] = useState('Padi');
  const [pengelolaan, setPengelolaan] = useState('Organik'); // Organik | Konversi | Non-Organik
  const [masaTanam, setMasaTanam] = useState(() => getMasaTanamFromDate(getTodayDate())); // MT 01 | MT 02 | MT 03
  const [jumlahKg, setJumlahKg] = useState('');
  const [tanggal, setTanggal] = useState(getTodayDate);
  const [catatan, setCatatan] = useState('');
  const [submittedCount, setSubmittedCount] = useState(0);

  const jumlahInputRef = useRef(null);

  // Auto-update default pengelolaan when farmer changes (if farmer has a default)
  useEffect(() => {
    const f = farmers.find(item => item.id === petaniId);
    if (f && f.jenisDefault) {
      setPengelolaan(f.jenisDefault);
    }
  }, [petaniId, farmers]);

  // Auto-suggest MT when date changes
  const handleDateChange = (newDate) => {
    setTanggal(newDate);
    const suggestedMT = getMasaTanamFromDate(newDate);
    setMasaTanam(suggestedMT);
  };

  const resetFormFields = () => {
    setJumlahKg('');
    setCatatan('');
    if (jumlahInputRef.current) {
      jumlahInputRef.current.focus();
    }
  };

  const handleSaveOnly = (e) => {
    e.preventDefault();
    if (!jumlahKg || Number(jumlahKg) <= 0) {
      alert('Mohon masukkan jumlah panen yang valid (kg)');
      return;
    }

    const selectedFarmer = farmers.find(f => f.id === petaniId);
    addHarvest({
      petaniId,
      petaniNama: selectedFarmer ? selectedFarmer.nama : 'Petani Dawuhan',
      komoditas,
      pengelolaan,
      masaTanam,
      jumlahKg: Number(jumlahKg),
      tanggal,
      catatan
    }, { keepOpen: false });
  };

  const handleSaveAndInputMore = (e) => {
    e.preventDefault();
    if (!jumlahKg || Number(jumlahKg) <= 0) {
      alert('Mohon masukkan jumlah panen yang valid (kg)');
      return;
    }

    const selectedFarmer = farmers.find(f => f.id === petaniId);
    addHarvest({
      petaniId,
      petaniNama: selectedFarmer ? selectedFarmer.nama : 'Petani Dawuhan',
      komoditas,
      pengelolaan,
      masaTanam,
      jumlahKg: Number(jumlahKg),
      tanggal,
      catatan
    }, { keepOpen: true });

    setSubmittedCount(prev => prev + 1);
    resetFormFields();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-manrope">

      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] bg-[#dbf0e3] px-3.5 py-1 rounded-full mb-1">
            <PlusCircle className="w-3.5 h-3.5" />
            Form 1 Layar Cepat & Ergonomis
          </div>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">
            Input Setoran Panen Petani
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-manrope">
            Pencatatan langsung setoran komoditas gabah & palawija ke lumbung desa dengan klasifikasi pengelolaan tani.
          </p>
        </div>

        {submittedCount > 0 && (
          <div className="bg-[#f0fdf4] border border-[#dbf0e3] text-[#1c4234] px-4 py-2 rounded-full text-xs font-poppins font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] shrink-0" />
            <span>{submittedCount} setoran panen tersimpan dalam sesi ini</span>
          </div>
        )}
      </div>

      {/* Main Single-Screen Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-10 space-y-8">

        <form className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Field 1: Dropdown Nama Petani */}
            <div className="space-y-2">
              <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#2d6a4f]" />
                1. Nama Petani Penyetor <span className="text-rose-500">*</span>
              </label>
              <select
                value={petaniId}
                onChange={(e) => setPetaniId(e.target.value)}
                className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 hover:border-[#1c4234] rounded-xl text-sm font-poppins font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all cursor-pointer"
              >
                {farmers.map((farmer) => (
                  <option key={farmer.id} value={farmer.id}>
                    {farmer.nama} ({farmer.dusun})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-gray-500 font-manrope">
                Pilih dari daftar anggota resmi Kelompok Tani Marsudi Among Tani Dawuhan.
              </p>
            </div>

            {/* Field 2: Dropdown Komoditas */}
            <div className="space-y-2">
              <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
                <Wheat className="w-4 h-4 text-[#2d6a4f]" />
                2. Jenis Komoditas <span className="text-rose-500">*</span>
              </label>
              <select
                value={komoditas}
                onChange={(e) => setKomoditas(e.target.value)}
                className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 hover:border-[#1c4234] rounded-xl text-sm font-poppins font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all cursor-pointer"
              >
                <option value="Padi">Padi (Beras Organik Ciherang / Mentik)</option>
                <option value="Jagung">Jagung (Pipil Kering Hibrida)</option>
                <option value="Kedelai">Kedelai (Kuning Anjasmoro Pilihan)</option>
                <option value="Kacang Hijau">Kacang Hijau (Varietas Vima Unggul)</option>
              </select>
              <p className="text-[11px] text-gray-500 font-manrope">
                Stok lumbung untuk komoditas terpilih akan bertambah otomatis secara reaktif.
              </p>
            </div>

            {/* Field 3: Input Jumlah (kg) */}
            <div className="space-y-2">
              <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#2d6a4f]" />
                3. Jumlah Hasil Panen (Kg) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  ref={jumlahInputRef}
                  type="number"
                  required
                  min="1"
                  step="any"
                  value={jumlahKg}
                  onChange={(e) => setJumlahKg(e.target.value)}
                  placeholder="Contoh: 750"
                  className="w-full py-3.5 pl-4 pr-14 bg-white border-2 border-gray-200 focus:border-[#1c4234] rounded-xl text-xl font-poppins font-bold text-[#1c4234] focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-sm font-poppins font-bold text-gray-400">
                  Kg
                </div>
              </div>
              <p className="text-[11px] text-gray-500 font-manrope">
                Berat bersih hasil timbangan digital terverifikasi lumbung kelompok.
              </p>
            </div>

            {/* Field 4: Tanggal Otomatis */}
            <div className="space-y-2">
              <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2d6a4f]" />
                4. Tanggal Panen / Setor <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={tanggal}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 focus:border-[#1c4234] rounded-xl text-sm font-poppins font-semibold text-gray-800 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all"
              />
              <p className="text-[11px] text-gray-500 font-manrope">
                Terisi otomatis dengan tanggal hari ini ({getTodayDate()}), dapat disesuaikan bila perlu.
              </p>
            </div>

          </div>

          {/* Field 5: Pilihan Jenis Petani / Pengelolaan Lahan */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-[#2d6a4f]" />
                5. Jenis Pengelolaan Tani / Lahan <span className="text-rose-500">*</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Option: Organik */}
              <label
                onClick={() => setPengelolaan('Organik')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${pengelolaan === 'Organik'
                    ? 'border-[#1c4234] bg-[#f0fdf4] shadow-xs ring-2 ring-[#1c4234]'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
              >
                <input
                  type="radio"
                  name="pengelolaan"
                  value="Organik"
                  checked={pengelolaan === 'Organik'}
                  onChange={() => setPengelolaan('Organik')}
                  className="mt-1 w-4 h-4 text-[#1c4234] focus:ring-[#1c4234] cursor-pointer"
                />
                <div>
                  <div className="font-poppins font-bold text-[#1c4234] text-sm flex items-center gap-2">
                    <span>Organik</span>
                    <span className="text-[10px] bg-[#1c4234] text-white font-bold px-2 py-0.5 rounded-full">
                      Sertifikat
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-manrope">
                    Lahan budidaya organik bersertifikat resmi, tanpa bahan kimia sintetis.
                  </p>
                </div>
              </label>

              {/* Option: Konversi */}
              <label
                onClick={() => setPengelolaan('Konversi')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${pengelolaan === 'Konversi'
                    ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-2 ring-amber-600'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
              >
                <input
                  type="radio"
                  name="pengelolaan"
                  value="Konversi"
                  checked={pengelolaan === 'Konversi'}
                  onChange={() => setPengelolaan('Konversi')}
                  className="mt-1 w-4 h-4 text-amber-600 focus:ring-amber-600 cursor-pointer"
                />
                <div>
                  <div className="font-poppins font-bold text-amber-900 text-sm flex items-center gap-2">
                    <span>Konversi</span>
                    <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-full">
                      Transisi
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-manrope">
                    Lahan dalam masa peralihan menuju budidaya organik penuh binaan kelompok.
                  </p>
                </div>
              </label>

              {/* Option: Non-Organik */}
              <label
                onClick={() => setPengelolaan('Non-Organik')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${pengelolaan === 'Non-Organik'
                    ? 'border-sky-700 bg-sky-50/70 shadow-xs ring-2 ring-sky-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
              >
                <input
                  type="radio"
                  name="pengelolaan"
                  value="Non-Organik"
                  checked={pengelolaan === 'Non-Organik'}
                  onChange={() => setPengelolaan('Non-Organik')}
                  className="mt-1 w-4 h-4 text-sky-700 focus:ring-sky-700 cursor-pointer"
                />
                <div>
                  <div className="font-poppins font-bold text-sky-900 text-sm flex items-center gap-2">
                    <span>Non-Organik</span>
                    <span className="text-[10px] bg-sky-700 text-white font-bold px-2 py-0.5 rounded-full">
                      Konvensional
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-manrope">
                    Pertanian konvensional terkontrol binaan kelompok dengan pupuk standar.
                  </p>
                </div>
              </label>

            </div>
          </div>

          {/* Field 6: Masa Tanam */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2d6a4f]" />
                6. Masa Tanam (Pola Musim Tanam) <span className="text-rose-500">*</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { code: 'MT 01', label: 'MT 01 (Okt - Jan)', desc: 'Musim Rendeng (Hujan)' },
                { code: 'MT 02', label: 'MT 02 (Feb - Mei)', desc: 'Musim Gadu (Peralihan)' },
                { code: 'MT 03', label: 'MT 03 (Juni - Sept)', desc: 'Musim Kemarau / Palawija' }
              ].map((mt) => {
                const isSelected = masaTanam === mt.code;
                return (
                  <button
                    type="button"
                    key={mt.code}
                    onClick={() => setMasaTanam(mt.code)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${isSelected
                        ? 'border-[#1c4234] bg-[#f0fdf4] ring-2 ring-[#1c4234]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className="font-poppins font-bold text-sm text-[#1c4234] flex items-center justify-between">
                      <span>{mt.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-manrope">
                      {mt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 7: Catatan Tambahan (Opsional) */}
          <div className="space-y-2">
            <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#2d6a4f]" />
              7. Catatan Panen / Kondisi Gabah (Opsional)
            </label>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Lahan Blok Krikil KR-11, kadar air 13.8%, hasil panen optimal"
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 focus:border-[#1c4234] rounded-xl text-xs sm:text-sm font-manrope text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all"
            />
          </div>

          {/* FITUR UPLOAD EXCEL (TAMBAHAN BARU) */}
          <div className="mt-6 p-6 border-2 border-dashed border-[#1c4234]/30 rounded-xl bg-[#f0fdf4]/50 text-center">
            <UploadCloud className="w-8 h-8 text-[#2d6a4f] mx-auto mb-2" />
            <p className="text-sm font-poppins font-bold text-[#1c4234] mb-1">Atau Input Massal via File Excel</p>
            <p className="text-xs text-gray-500 mb-3">Upload file .xlsx / .xls untuk memasukkan banyak data sekaligus.</p>
            <input
              type="file"
              accept=".xlsx, .xls"
              className="block w-full text-sm text-gray-500 mx-auto max-w-xs
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-poppins file:font-bold
                file:bg-[#1c4234] file:text-white
                hover:file:bg-[#0a1f14] cursor-pointer transition-all"
            />
            <p className="text-[10px] text-gray-400 mt-3">Format kolom: Nama Petani | Komoditas | Jumlah (kg) | Tanggal</p>
          </div>

          {/* 2 ACTION BUTTONS */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">

            {/* Button 1: SIMPAN */}
            <button
              type="button"
              onClick={handleSaveOnly}
              className="w-full sm:w-1/2 bg-[#1c4234] hover:bg-[#0a1f14] active:scale-98 text-white font-poppins font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Save className="w-5 h-5 text-[#95d5b2]" />
              <span>SIMPAN DATA</span>
            </button>

            {/* Button 2: SIMPAN & INPUT LAGI */}
            <button
              type="button"
              onClick={handleSaveAndInputMore}
              className="w-full sm:w-1/2 bg-[#c9a96e] hover:bg-[#b8985c] active:scale-98 text-[#0a1f14] font-poppins font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <RotateCcw className="w-5 h-5 text-[#0a1f14]" />
              <span>SIMPAN & INPUT LAGI</span>
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};