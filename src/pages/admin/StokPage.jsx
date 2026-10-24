import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatRupiah, formatDateIndo } from '../../utils/formatters';
import { 
  Boxes, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShoppingBag, 
  Plus, 
  Wheat, 
  Truck, 
  RotateCcw, 
  Trash2, 
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

export const StokPage = () => {
  const { 
    currentStocks, 
    harvests, 
    sales, 
    addSale, 
    deleteSale, 
    resetToDefault,
    navigateTo 
  } = useApp();

  // State for Simulasi Penjualan Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [saleForm, setSaleForm] = useState({
    komoditas: 'Padi',
    jumlahKg: '',
    pembeli: 'Koperasi Tani Makmur',
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

  const handleSaleSubmit = (e) => {
    e.preventDefault();
    const kg = Number(saleForm.jumlahKg);
    const available = currentStocks[saleForm.komoditas] || 0;

    if (!kg || kg <= 0) {
      alert('Masukkan jumlah kg yang valid!');
      return;
    }

    if (kg > available) {
      alert(`Stok ${saleForm.komoditas} saat ini hanya tersisa ${available} kg. Jumlah penjualan melebihi stok gudang!`);
      return;
    }

    addSale(saleForm);
    setModalOpen(false);
    setSaleForm({
      komoditas: 'Padi',
      jumlahKg: '',
      pembeli: 'Koperasi Tani Makmur',
      hargaPerKg: '14500',
      tanggal: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full mb-1">
            <Boxes className="w-3.5 h-3.5" />
            Lumbung Pangan Desa
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-green-950">
            Manajemen Stok Komoditas Gabah
          </h1>
          <p className="text-sm text-gray-600">
            Kalkulasi otomatis: Stok = Stok Awal + Total Panen Masuk - Total Penjualan/Distribusi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick sale button */}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-5 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Catat Simulasi Penjualan</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetToDefault}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3 rounded-2xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset ke data dummy awal simulasi"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* 3 COMMODITY STOCK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Padi Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-600/30 shadow-md space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Wheat className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-emerald-950">Padi / Beras</h3>
                <span className="text-xs text-emerald-700 font-semibold">Ciherang & Mentik</span>
              </div>
            </div>
            <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
              Lumbung Utama
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Sisa Stok Siap Jual</div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-900 mt-1">
              {formatNumber(padiStats.stock)} <span className="text-base font-bold text-gray-500">kg</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
              <div className="text-gray-500 flex items-center gap-1">
                <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                <span>Panen Masuk</span>
              </div>
              <div className="font-bold text-emerald-900 text-sm mt-1">
                +{formatNumber(padiStats.totalHarvest)} kg
              </div>
            </div>

            <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-100">
              <div className="text-gray-500 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                <span>Terkirim/Terjual</span>
              </div>
              <div className="font-bold text-rose-900 text-sm mt-1">
                -{formatNumber(padiStats.totalSold)} kg
              </div>
            </div>
          </div>
        </div>

        {/* Jagung Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-600/30 shadow-md space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Wheat className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-amber-950">Jagung Pipil</h3>
                <span className="text-xs text-amber-700 font-semibold">Hibrida Kering</span>
              </div>
            </div>
            <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              Pakan & Pangan
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Sisa Stok Siap Jual</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-900 mt-1">
              {formatNumber(jagungStats.stock)} <span className="text-base font-bold text-gray-500">kg</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100">
              <div className="text-gray-500 flex items-center gap-1">
                <ArrowDownRight className="w-3.5 h-3.5 text-amber-600" />
                <span>Panen Masuk</span>
              </div>
              <div className="font-bold text-amber-900 text-sm mt-1">
                +{formatNumber(jagungStats.totalHarvest)} kg
              </div>
            </div>

            <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-100">
              <div className="text-gray-500 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                <span>Terkirim/Terjual</span>
              </div>
              <div className="font-bold text-rose-900 text-sm mt-1">
                -{formatNumber(jagungStats.totalSold)} kg
              </div>
            </div>
          </div>
        </div>

        {/* Kedelai Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-yellow-600/30 shadow-md space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
                <Wheat className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-yellow-950">Kedelai Kuning</h3>
                <span className="text-xs text-yellow-800 font-semibold">Anjasmoro Unggul</span>
              </div>
            </div>
            <span className="text-xs font-black bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full">
              Tahu & Tempe
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Sisa Stok Siap Jual</div>
            <div className="text-3xl sm:text-4xl font-black text-yellow-950 mt-1">
              {formatNumber(kedelaiStats.stock)} <span className="text-base font-bold text-gray-500">kg</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
            <div className="bg-yellow-50/70 p-3 rounded-xl border border-yellow-100">
              <div className="text-gray-500 flex items-center gap-1">
                <ArrowDownRight className="w-3.5 h-3.5 text-yellow-700" />
                <span>Panen Masuk</span>
              </div>
              <div className="font-bold text-yellow-950 text-sm mt-1">
                +{formatNumber(kedelaiStats.totalHarvest)} kg
              </div>
            </div>

            <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-100">
              <div className="text-gray-500 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                <span>Terkirim/Terjual</span>
              </div>
              <div className="font-bold text-rose-900 text-sm mt-1">
                -{formatNumber(kedelaiStats.totalSold)} kg
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Sales and Distribution Simulation Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-green-950">Daftar Penyaluran & Penjualan Gabah</h3>
            <p className="text-xs text-gray-500">Setiap catatan penjualan di tabel ini secara dinamis mengurangi stok lumbung</p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Penyaluran</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          {sales.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Belum ada riwayat penjualan. Klik tombol "Tambah Penyaluran" untuk simulasi pengurangan stok.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">ID Transaksi</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Komoditas</th>
                  <th className="py-3 px-4">Pembeli / Koperasi</th>
                  <th className="py-3 px-4 text-right">Volume (Kg)</th>
                  <th className="py-3 px-4 text-right">Harga Satuan</th>
                  <th className="py-3 px-4 text-right">Total Transaksi</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sales.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-500">{item.id}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-900">{formatDateIndo(item.tanggal)}</td>
                    <td className="py-3.5 px-4 font-bold text-green-900">{item.komoditas}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-800">{item.pembeli}</td>
                    <td className="py-3.5 px-4 text-right font-black text-rose-700">
                      -{formatNumber(item.jumlahKg)} kg
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-600">{formatRupiah(item.hargaPerKg)}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">{formatRupiah(item.totalNilai)}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => deleteSale(item.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus riwayat penjualan ini (stok akan kembali bertambah)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* SIMULASI PENJUALAN MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Catat Penjualan / Distribusi Gabah</h3>
                  <p className="text-xs text-gray-500">Stok di lumbung akan otomatis berkurang</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Komoditas yang Dijual / Didistribusikan
                </label>
                <select
                  value={saleForm.komoditas}
                  onChange={(e) => {
                    const kom = e.target.value;
                    const defaultPrices = { Padi: '14500', Jagung: '6200', Kedelai: '12800' };
                    setSaleForm({ ...saleForm, komoditas: kom, hargaPerKg: defaultPrices[kom] });
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  <option value="Padi">Padi (Tersedia: {formatNumber(currentStocks.Padi || 0)} kg)</option>
                  <option value="Jagung">Jagung (Tersedia: {formatNumber(currentStocks.Jagung || 0)} kg)</option>
                  <option value="Kedelai">Kedelai (Tersedia: {formatNumber(currentStocks.Kedelai || 0)} kg)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Jumlah Volume (Kg)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={currentStocks[saleForm.komoditas] || 999999}
                  value={saleForm.jumlahKg}
                  onChange={(e) => setSaleForm({ ...saleForm, jumlahKg: e.target.value })}
                  placeholder={`Maksimal ${currentStocks[saleForm.komoditas] || 0} kg`}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-base font-black text-amber-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nama Pembeli / Koperasi / Mitra
                </label>
                <input
                  type="text"
                  required
                  value={saleForm.pembeli}
                  onChange={(e) => setSaleForm({ ...saleForm, pembeli: e.target.value })}
                  placeholder="Contoh: Koperasi Tani Makmur"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Harga per Kg (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={saleForm.hargaPerKg}
                    onChange={(e) => setSaleForm({ ...saleForm, hargaPerKg: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Tanggal Penjualan
                  </label>
                  <input
                    type="date"
                    required
                    value={saleForm.tanggal}
                    onChange={(e) => setSaleForm({ ...saleForm, tanggal: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {saleForm.jumlahKg && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs flex justify-between items-center font-bold text-amber-950">
                  <span>Total Nilai Transaksi:</span>
                  <span className="text-sm font-black">
                    {formatRupiah((Number(saleForm.jumlahKg) || 0) * (Number(saleForm.hargaPerKg) || 0))}
                  </span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-md cursor-pointer"
                >
                  Simpan Penjualan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
