import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatRupiah, formatDateIndo } from '../../utils/formatters';
import { 
  Boxes, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Wheat, 
  Truck, 
  RotateCcw, 
  Trash2, 
  X,
  Sparkles,
  Sprout
} from 'lucide-react';

export const StokPage = () => {
  const { 
    currentStocks, 
    harvests, 
    sales, 
    addSale, 
    deleteSale, 
    resetToDefault 
  } = useApp();

  // State for Simulasi Penjualan Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [saleForm, setSaleForm] = useState({
    komoditas: 'Padi',
    jumlahKg: '',
    pembeli: 'Koperasi Tani Tri Mulya',
    hargaPerKg: '14500',
    tanggal: new Date().toISOString().split('T')[0]
  });

  // Calculate totals per commodity
  const getCommodityStats = (komoditas) => {
    const totalHarvest = harvests
      .filter(h => h.komoditas === komoditas)
      .reduce((sum, h) => sum + (Number(h.jumlahKg) || 0), 0);

    const totalSold = sales
      .filter(s => s.komoditas === komoditas)
      .reduce((sum, s) => sum + (Number(s.jumlahKg) || 0), 0);

    const stock = currentStocks[komoditas] || 0;

    return { totalHarvest, totalSold, stock };
  };

  const padiStats = getCommodityStats('Padi');
  const jagungStats = getCommodityStats('Jagung');
  const kedelaiStats = getCommodityStats('Kedelai');
  const kacangHijauStats = getCommodityStats('Kacang Hijau');

  const handleCommodityChange = (e) => {
    const k = e.target.value;
    let defaultPrice = '14500';
    if (k === 'Jagung') defaultPrice = '6200';
    if (k === 'Kedelai') defaultPrice = '12800';
    if (k === 'Kacang Hijau') defaultPrice = '18500';

    setSaleForm(prev => ({
      ...prev,
      komoditas: k,
      hargaPerKg: defaultPrice
    }));
  };

  const handleSaleSubmit = (e) => {
    e.preventDefault();
    const kg = Number(saleForm.jumlahKg);
    const available = currentStocks[saleForm.komoditas] || 0;

    if (!kg || kg <= 0) {
      alert('Masukkan jumlah kg yang valid!');
      return;
    }

    if (kg > available) {
      alert(`Stok ${saleForm.komoditas} saat ini hanya tersisa ${available} kg. Jumlah penjualan melebihi stok lumbung!`);
      return;
    }

    addSale(saleForm);
    setModalOpen(false);
    setSaleForm({
      komoditas: 'Padi',
      jumlahKg: '',
      pembeli: 'Koperasi Tani Tri Mulya',
      hargaPerKg: '14500',
      tanggal: new Date().toISOString().split('T')[0]
    });
  };

  const totalAllStocks = 
    (currentStocks.Padi || 0) + 
    (currentStocks.Jagung || 0) + 
    (currentStocks.Kedelai || 0) + 
    (currentStocks['Kacang Hijau'] || 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-manrope">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] bg-[#dbf0e3] px-3.5 py-1 rounded-full mb-1">
            <Boxes className="w-3.5 h-3.5" />
            Lumbung Pangan Desa Dawuhan
          </div>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">
            Manajemen Stok Komoditas Gabah & Palawija
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-manrope">
            Kalkulasi reaktif: Stok = Stok Awal + Total Panen Masuk - Total Penjualan/Distribusi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick sale button */}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#c9a96e] hover:bg-[#b8985c] text-[#0a1f14] font-poppins font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-[#0a1f14]" />
            <span>Catat Simulasi Penjualan</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetToDefault}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-poppins font-medium px-4 py-2.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset ke data awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* 4 Commodity Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Commodity 1: Padi */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4 hover:border-[#1c4234] transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Wheat className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-[11px] font-poppins font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Beras Ciherang
            </span>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-gray-900">Padi (Beras Organik)</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-poppins font-bold text-[#1c4234]">
                {formatNumber(padiStats.stock)}
              </span>
              <span className="text-xs text-gray-500 font-semibold">kg tersedia</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-manrope">
            <div>
              <span className="text-gray-400 block text-[11px]">Total Masuk</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{formatNumber(padiStats.totalHarvest)} kg
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Terdistribusi</span>
              <span className="font-semibold text-rose-600 flex items-center gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" /> -{formatNumber(padiStats.totalSold)} kg
              </span>
            </div>
          </div>
        </div>

        {/* Commodity 2: Jagung */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4 hover:border-amber-500 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Wheat className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-[11px] font-poppins font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Pipil Hibrida
            </span>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-gray-900">Jagung Pipil Kering</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-poppins font-bold text-amber-900">
                {formatNumber(jagungStats.stock)}
              </span>
              <span className="text-xs text-gray-500 font-semibold">kg tersedia</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-manrope">
            <div>
              <span className="text-gray-400 block text-[11px]">Total Masuk</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{formatNumber(jagungStats.totalHarvest)} kg
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Terdistribusi</span>
              <span className="font-semibold text-rose-600 flex items-center gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" /> -{formatNumber(jagungStats.totalSold)} kg
              </span>
            </div>
          </div>
        </div>

        {/* Commodity 3: Kedelai */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4 hover:border-yellow-600 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
              <Wheat className="w-5 h-5 text-yellow-700" />
            </div>
            <span className="text-[11px] font-poppins font-bold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
              Anjasmoro
            </span>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-gray-900">Kedelai Kuning</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-poppins font-bold text-yellow-950">
                {formatNumber(kedelaiStats.stock)}
              </span>
              <span className="text-xs text-gray-500 font-semibold">kg tersedia</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-manrope">
            <div>
              <span className="text-gray-400 block text-[11px]">Total Masuk</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{formatNumber(kedelaiStats.totalHarvest)} kg
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Terdistribusi</span>
              <span className="font-semibold text-rose-600 flex items-center gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" /> -{formatNumber(kedelaiStats.totalSold)} kg
              </span>
            </div>
          </div>
        </div>

        {/* Commodity 4: Kacang Hijau (New Requirement) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4 hover:border-teal-600 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5 text-teal-700" />
            </div>
            <span className="text-[11px] font-poppins font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Vima Unggul
            </span>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-gray-900">Kacang Hijau</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-poppins font-bold text-teal-900">
                {formatNumber(kacangHijauStats.stock)}
              </span>
              <span className="text-xs text-gray-500 font-semibold">kg tersedia</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-manrope">
            <div>
              <span className="text-gray-400 block text-[11px]">Total Masuk</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{formatNumber(kacangHijauStats.totalHarvest)} kg
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Terdistribusi</span>
              <span className="font-semibold text-rose-600 flex items-center gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" /> -{formatNumber(kacangHijauStats.totalSold)} kg
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Total Warehouse Stock Banner */}
      <div className="bg-[#1c4234] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-[#95d5b2]">
            Total Kapasitas Lumbung Aktif
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Total Cadangan Pangan Kelompok Tani
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-manrope">
            Akumulasi ketersediaan gabah beras, jagung pipil, kedelai kuning, dan kacang hijau yang siap didistribusikan.
          </p>
        </div>

        <div className="text-center md:text-right shrink-0 bg-white/10 px-6 py-4 rounded-xl border border-white/15">
          <div className="text-3xl sm:text-4xl font-poppins font-bold text-[#c9a96e]">
            {formatNumber(totalAllStocks)} <span className="text-lg font-normal text-white/80">kg</span>
          </div>
          <span className="text-xs text-white/70">4 Komoditas Siap Pasok</span>
        </div>
      </div>

      {/* Sales / Distribution History Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#1c4234]">
              Riwayat Distribusi / Penjualan Lumbung
            </h3>
            <p className="text-xs text-gray-600 font-manrope">
              Catatan penyaluran gabah dan palawija kepada pembeli, koperasi, dan pengrajin pangan.
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-500 font-manrope">
            {sales.length} transaksi tercatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm font-manrope">
            <thead>
              <tr className="bg-gray-50 text-gray-700 font-poppins font-bold text-xs uppercase border-b border-gray-200">
                <th className="py-3 px-4">No / ID</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Komoditas</th>
                <th className="py-3 px-4">Pembeli / Kemitraan</th>
                <th className="py-3 px-4 text-right">Volume (Kg)</th>
                <th className="py-3 px-4 text-right">Harga / Kg</th>
                <th className="py-3 px-4 text-right">Total Nilai</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    Belum ada riwayat distribusi penjualan.
                  </td>
                </tr>
              ) : (
                sales.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900">#{idx + 1}</span>
                      <span className="block text-[10px] text-gray-400 font-mono">{s.id}</span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                      {formatDateIndo(s.tanggal)}
                    </td>
                    <td className="py-3 px-4 font-poppins font-bold text-gray-800">
                      {s.komoditas}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {s.pembeli}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-rose-700">
                      -{formatNumber(s.jumlahKg)} kg
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {formatRupiah(s.hargaPerKg)}
                    </td>
                    <td className="py-3 px-4 text-right font-poppins font-bold text-[#1c4234]">
                      {formatRupiah(s.totalNilai)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteSale(s.id)}
                        className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Transaksi Penjualan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL SIMULASI PENJUALAN */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-[#1c4234] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#95d5b2]" />
                <h3 className="font-poppins font-bold text-lg">Catat Penjualan / Distribusi</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaleSubmit} className="p-6 space-y-4">
              
              {/* Komoditas */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Pilih Komoditas</label>
                <select
                  value={saleForm.komoditas}
                  onChange={handleCommodityChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
                >
                  <option value="Padi">Padi (Beras Organik Ciherang) - Stok: {currentStocks.Padi || 0} kg</option>
                  <option value="Jagung">Jagung (Pipil Kering Hibrida) - Stok: {currentStocks.Jagung || 0} kg</option>
                  <option value="Kedelai">Kedelai (Kuning Anjasmoro) - Stok: {currentStocks.Kedelai || 0} kg</option>
                  <option value="Kacang Hijau">Kacang Hijau (Vima Unggul) - Stok: {currentStocks['Kacang Hijau'] || 0} kg</option>
                </select>
              </div>

              {/* Jumlah Kg */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Volume Penjualan (Kg)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={currentStocks[saleForm.komoditas] || 0}
                  value={saleForm.jumlahKg}
                  onChange={(e) => setSaleForm(prev => ({ ...prev, jumlahKg: e.target.value }))}
                  placeholder={`Maksimal ${currentStocks[saleForm.komoditas] || 0} kg`}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#1c4234] focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                />
              </div>

              {/* Pembeli */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Nama Pembeli / Kemitraan</label>
                <input
                  type="text"
                  required
                  value={saleForm.pembeli}
                  onChange={(e) => setSaleForm(prev => ({ ...prev, pembeli: e.target.value }))}
                  placeholder="Contoh: Koperasi Tani Tri Mulya"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                />
              </div>

              {/* Harga per kg */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Harga Satuan (Rp / Kg)</label>
                <input
                  type="number"
                  required
                  min="500"
                  step="100"
                  value={saleForm.hargaPerKg}
                  onChange={(e) => setSaleForm(prev => ({ ...prev, hargaPerKg: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                />
              </div>

              {/* Tanggal */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Tanggal Distribusi</label>
                <input
                  type="date"
                  required
                  value={saleForm.tanggal}
                  onChange={(e) => setSaleForm(prev => ({ ...prev, tanggal: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-poppins font-semibold text-xs hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1c4234] hover:bg-[#0a1f14] text-white font-poppins font-bold text-xs shadow-md cursor-pointer"
                >
                  Simpan & Kurangi Stok
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
