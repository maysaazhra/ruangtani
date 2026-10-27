import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PlusCircle, 
  Save, 
  RotateCcw, 
  Wheat, 
  Calendar, 
  User, 
  Scale, 
  Award, 
  FileText,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const InputPanenPage = () => {
  const { farmers, addHarvest } = useApp();

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // Form states
  const [petaniId, setPetaniId] = useState(farmers[0]?.id || 'petani-1');
  const [komoditas, setKomoditas] = useState('Padi');
  const [jumlahKg, setJumlahKg] = useState('');
  const [tanggal, setTanggal] = useState(getTodayDate);
  const [kualitas, setKualitas] = useState('A');
  const [catatan, setCatatan] = useState('');
  const [submittedCount, setSubmittedCount] = useState(0);

  const jumlahInputRef = useRef(null);

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
      jumlahKg: Number(jumlahKg),
      tanggal,
      kualitas,
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
      jumlahKg: Number(jumlahKg),
      tanggal,
      kualitas,
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
            Pencatatan langsung setoran gabah & palawija ke lumbung desa secara cepat dan akurat.
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
                Pilih dari daftar anggota resmi Kelompok Tani Marsudi Among Tani.
              </p>
            </div>

            {/* Field 2: Dropdown Jenis Gabah / Komoditas */}
            <div className="space-y-2">
              <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
                <Wheat className="w-4 h-4 text-[#2d6a4f]" />
                2. Jenis Gabah / Komoditas <span className="text-rose-500">*</span>
              </label>
              <select
                value={komoditas}
                onChange={(e) => setKomoditas(e.target.value)}
                className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 hover:border-[#1c4234] rounded-xl text-sm font-poppins font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all cursor-pointer"
              >
                <option value="Padi">Padi (Beras Ciherang / Mentik)</option>
                <option value="Jagung">Jagung (Pipil Kering Hibrida)</option>
                <option value="Kedelai">Kedelai (Kuning Anjasmoro)</option>
              </select>
              <p className="text-[11px] text-gray-500 font-manrope">
                Stok komoditas di lumbung akan otomatis bertambah setelah disimpan.
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
                Gunakan angka berat bersih hasil timbangan lumbung kelompok.
              </p>
            </div>

            {/* Field 4: Tanggal Otomatis (Default Hari Ini) */}
            <div className="space-y-2">
              <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2d6a4f]" />
                4. Tanggal Setor (Hari Ini) <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 focus:border-[#1c4234] rounded-xl text-sm font-poppins font-semibold text-gray-800 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all"
              />
              <p className="text-[11px] text-gray-500 font-manrope">
                Terisi otomatis dengan tanggal hari ini ({getTodayDate()}), dapat disesuaikan bila perlu.
              </p>
            </div>

          </div>

          {/* Field 5: Pilihan Kualitas (Radio Buttons A / B / C) */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-poppins font-bold text-[#1c4234] uppercase tracking-wide flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#2d6a4f]" />
              5. Pilihan Kualitas / Mutu Gabah <span className="text-rose-500">*</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Grade A */}
              <label
                onClick={() => setKualitas('A')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  kualitas === 'A'
                    ? 'border-[#1c4234] bg-[#f0fdf4] shadow-xs ring-1 ring-[#1c4234]'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="kualitas"
                  value="A"
                  checked={kualitas === 'A'}
                  onChange={() => setKualitas('A')}
                  className="mt-1 w-4 h-4 text-[#1c4234] focus:ring-[#1c4234] cursor-pointer"
                />
                <div>
                  <div className="font-poppins font-bold text-[#1c4234] text-sm flex items-center gap-2">
                    <span>Grade A (Super)</span>
                    <span className="text-[10px] bg-[#1c4234] text-white font-bold px-2 py-0.5 rounded-full">
                      Prima
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-manrope">
                    Kadar air &lt;14%, bulir utuh bernas, bersih tanpa kotoran.
                  </p>
                </div>
              </label>

              {/* Grade B */}
              <label
                onClick={() => setKualitas('B')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  kualitas === 'B'
                    ? 'border-blue-700 bg-blue-50/70 shadow-xs ring-1 ring-blue-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="kualitas"
                  value="B"
                  checked={kualitas === 'B'}
                  onChange={() => setKualitas('B')}
                  className="mt-1 w-4 h-4 text-blue-700 focus:ring-blue-600 cursor-pointer"
                />
                <div>
                  <div className="font-poppins font-bold text-blue-950 text-sm flex items-center gap-2">
                    <span>Grade B (Standar)</span>
                    <span className="text-[10px] bg-blue-700 text-white font-bold px-2 py-0.5 rounded-full">
                      Baik
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-manrope">
                    Kadar air 14-16%, kondisi normal layak konsumsi langsung.
                  </p>
                </div>
              </label>

              {/* Grade C */}
              <label
                onClick={() => setKualitas('C')}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  kualitas === 'C'
                    ? 'border-[#c9a96e] bg-[#f5ece0]/60 shadow-xs ring-1 ring-[#c9a96e]'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="kualitas"
                  value="C"
                  checked={kualitas === 'C'}
                  onChange={() => setKualitas('C')}
                  className="mt-1 w-4 h-4 text-[#c9a96e] focus:ring-[#c9a96e] cursor-pointer"
                />
                <div>
                  <div className="font-poppins font-bold text-[#9d7c43] text-sm flex items-center gap-2">
                    <span>Grade C (Cukup)</span>
                    <span className="text-[10px] bg-[#c9a96e] text-white font-bold px-2 py-0.5 rounded-full">
                      Sortir
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-manrope">
                    Kadar air agak tinggi / butir campur, perlu penjemuran ulang.
                  </p>
                </div>
              </label>

            </div>
          </div>

          {/* Field 6: Catatan Tambahan (Opsional) */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-poppins font-bold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-400" />
              Catatan Lokasi Sawah / Kondisi (Opsional)
            </label>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Petak sawah lor, kondisi jemur kering optimal"
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden font-manrope"
            />
          </div>

          {/* TWO REQUIRED BUTTONS: [SIMPAN] & [SIMPAN & INPUT LAGI] (Orbitani Pill Styling) */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
            
            {/* Button 1: SIMPAN (Saves & goes to Riwayat) */}
            <button
              type="button"
              onClick={handleSaveOnly}
              className="w-full sm:flex-1 bg-[#1c4234] hover:bg-[#0a1f14] active:scale-98 text-white font-poppins font-bold py-3.5 px-6 rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#95d5b2]" />
              <span>SIMPAN DATA</span>
            </button>

            {/* Button 2: SIMPAN & INPUT LAGI (Saves, clears form, stays on page for fast continuous entry) */}
            <button
              type="button"
              onClick={handleSaveAndInputMore}
              className="w-full sm:flex-1 bg-[#c9a96e] hover:bg-[#b8985c] active:scale-98 text-[#0a1f14] font-poppins font-bold py-3.5 px-6 rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#0a1f14]" />
              <span>SIMPAN & INPUT LAGI</span>
            </button>

          </div>

        </form>

      </div>

      {/* Helpful Hint */}
      <div className="bg-[#f0fdf4] border border-[#dbf0e3] rounded-2xl p-4 text-xs text-[#1c4234] flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-[#c9a96e] shrink-0 mt-0.5" />
        <p className="leading-relaxed font-manrope">
          <strong>Tips Efisiensi Operator:</strong> Tombol <em>"SIMPAN & INPUT LAGI"</em> dirancang khusus untuk antrean petani saat penimbangan panen. Form otomatis dikosongkan dan langsung siap menimbang petani berikutnya tanpa perlu berpindah halaman.
        </p>
      </div>

    </div>
  );
};
