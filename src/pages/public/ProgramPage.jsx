import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatRupiah, formatDateIndo, getMonthName } from '../../utils/formatters';
import { 
  Calendar, 
  TrendingUp, 
  ShoppingBag, 
  Boxes, 
  Users, 
  History, 
  Wheat, 
  Search,
  Sparkles
} from 'lucide-react';

export const ProgramPage = () => {
  const { 
    selectedPeriod, 
    setSelectedPeriod, 
    getSummaryForPeriod
  } = useApp();

  const [activeTab, setActiveTab] = useState('panen'); // 'panen' or 'penjualan'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKomoditas, setFilterKomoditas] = useState('Semua');

  const {
    periodHarvests,
    periodSales,
    totalPanen,
    totalJual,
    totalNilaiJual,
    stokAkhir,
    petaniAktif
  } = getSummaryForPeriod(selectedPeriod.month, selectedPeriod.year);

  // Month and Year options
  const months = [
    { value: '01', name: 'Januari' },
    { value: '02', name: 'Februari' },
    { value: '03', name: 'Maret' },
    { value: '04', name: 'April' },
    { value: '05', name: 'Mei' },
    { value: '06', name: 'Juni' },
    { value: '07', name: 'Juli' },
    { value: '08', name: 'Agustus' },
    { value: '09', name: 'September' },
    { value: '10', name: 'Oktober' },
    { value: '11', name: 'November' },
    { value: '12', name: 'Desember' }
  ];

  const years = ['2026', '2025'];

  // Archive Quick Links
  const quickArchives = [
    { label: 'Oktober 2026 (Terkini)', month: '10', year: '2026' },
    { label: 'September 2026', month: '09', year: '2026' },
    { label: 'Agustus 2026', month: '08', year: '2026' }
  ];

  const handleArchiveClick = (month, year) => {
    setSelectedPeriod({ month, year });
  };

  // Filtered harvest data
  const filteredHarvests = periodHarvests.filter(item => {
    const matchesSearch = item.petaniNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.komoditas.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.catatan && item.catatan.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesKomoditas = filterKomoditas === 'Semua' || item.komoditas === filterKomoditas;
    return matchesSearch && matchesKomoditas;
  });

  // Filtered sales data
  const filteredSales = periodSales.filter(item => {
    const matchesSearch = item.pembeli.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.komoditas.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKomoditas = filterKomoditas === 'Semua' || item.komoditas === filterKomoditas;
    return matchesSearch && matchesKomoditas;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-manrope">
      
      {/* Header & Page Title */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#dbf0e3] text-[#1c4234] px-4 py-1.5 rounded-full text-xs font-poppins font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#1c4234]" />
          Transparansi Hasil Tani Desa
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c4234] tracking-tight">
              Program: Hasil Panen & Penjualan
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-2xl font-manrope">
              Laporan berkala hasil panen gabah, distribusi penjualan, dan perkembangan lumbung pangan kelompok tani per periode bulanan.
            </p>
          </div>

          {/* FILTER PERIODE (Dropdown Bulan & Tahun) in Orbitani Card Style */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 shrink-0">
            <div className="text-xs font-poppins font-bold uppercase text-[#1c4234] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#2d6a4f]" />
              Pilih Periode Laporan:
            </div>
            
            <div className="flex items-center gap-2">
              {/* Dropdown Bulan */}
              <select
                value={selectedPeriod.month}
                onChange={(e) => setSelectedPeriod(prev => ({ ...prev, month: e.target.value }))}
                className="bg-gray-50 border border-gray-300 text-[#1c4234] font-poppins font-bold text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
              >
                {months.map(m => (
                  <option key={m.value} value={m.value}>
                    Bulan {m.name}
                  </option>
                ))}
              </select>

              {/* Dropdown Tahun */}
              <select
                value={selectedPeriod.year}
                onChange={(e) => setSelectedPeriod(prev => ({ ...prev, year: e.target.value }))}
                className="bg-gray-50 border border-gray-300 text-[#1c4234] font-poppins font-bold text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
              >
                {years.map(y => (
                  <option key={y} value={y}>
                    Tahun {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ARSIP BULAN SEBELUMNYA (Quick filter pill buttons) */}
      <div className="bg-[#f0fdf4] p-4 sm:p-5 rounded-2xl border border-[#dbf0e3] flex flex-wrap items-center gap-3">
        <span className="text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] flex items-center gap-1.5 shrink-0">
          <History className="w-4 h-4 text-[#2d6a4f]" />
          Akses Cepat Arsip Historis:
        </span>
        
        <div className="flex flex-wrap gap-2">
          {quickArchives.map((archive) => {
            const isSelected = selectedPeriod.month === archive.month && selectedPeriod.year === archive.year;
            return (
              <button
                key={`${archive.month}-${archive.year}`}
                onClick={() => handleArchiveClick(archive.month, archive.year)}
                className={`text-xs font-poppins font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1c4234] text-white shadow-sm'
                    : 'bg-white text-[#1c4234] hover:bg-[#dbf0e3] border border-[#dbf0e3]'
                }`}
              >
                {archive.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RINGKASAN KHUSUS BULAN TERPILIH (4 Kartu Ringkasan) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1c4234] flex items-center gap-2">
            <span>Ringkasan Periode:</span>
            <span className="italic text-[#c9a96e]">
              {getMonthName(selectedPeriod.month)} {selectedPeriod.year}
            </span>
          </h2>
          <span className="text-xs text-gray-500 font-medium font-manrope">
            Diperbarui secara reaktif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Panen */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden group hover:border-[#1c4234] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Total Panen</span>
              <div className="w-10 h-10 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center">
                <Wheat className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234] tracking-tight">
                {formatNumber(totalPanen)} <span className="text-xs font-medium text-gray-500">kg</span>
              </div>
              <p className="text-xs text-[#2d6a4f] mt-1 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {periodHarvests.length} transaksi panen masuk
              </p>
            </div>
          </div>

          {/* Card 2: Total Jual */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden group hover:border-[#c9a96e] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Total Terdistribusi</span>
              <div className="w-10 h-10 rounded-xl bg-[#f5ece0] text-[#c9a96e] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#9d7c43] tracking-tight">
                {formatNumber(totalJual)} <span className="text-xs font-medium text-gray-500">kg</span>
              </div>
              <p className="text-xs text-[#c9a96e] mt-1 font-semibold">
                Senilai {formatRupiah(totalNilaiJual)}
              </p>
            </div>
          </div>

          {/* Card 3: Stok Akhir */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden group hover:border-[#1c4234] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Stok Gabah Lumbung</span>
              <div className="w-10 h-10 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center">
                <Boxes className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234] tracking-tight">
                {formatNumber(stokAkhir)} <span className="text-xs font-medium text-gray-500">kg</span>
              </div>
              <p className="text-xs text-[#2d6a4f] mt-1 font-semibold">
                Tersedia di lumbung kelompok
              </p>
            </div>
          </div>

          {/* Card 4: Petani Aktif */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden group hover:border-[#1c4234] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Petani Aktif Setor</span>
              <div className="w-10 h-10 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234] tracking-tight">
                {petaniAktif} <span className="text-xs font-medium text-gray-500">orang</span>
              </div>
              <p className="text-xs text-[#2d6a4f] mt-1 font-semibold">
                Berpartisipasi bulan ini
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* TABEL DETAIL PANEN & PENJUALAN */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8">
        
        {/* Table Header & Search Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          
          {/* Sub Tab Buttons */}
          <div className="flex bg-gray-100 p-1 rounded-full w-fit">
            <button
              onClick={() => setActiveTab('panen')}
              className={`px-5 py-2 rounded-full font-poppins font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'panen'
                  ? 'bg-[#1c4234] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#1c4234]'
              }`}
            >
              <Wheat className="w-3.5 h-3.5" />
              Tabel Hasil Panen ({filteredHarvests.length})
            </button>
            <button
              onClick={() => setActiveTab('penjualan')}
              className={`px-5 py-2 rounded-full font-poppins font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'penjualan'
                  ? 'bg-[#1c4234] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#1c4234]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Tabel Penjualan ({filteredSales.length})
            </button>
          </div>

          {/* Search & Commodity Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari petani/catatan..."
                className="pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#1c4234] w-48 sm:w-60 font-manrope"
              />
            </div>

            <select
              value={filterKomoditas}
              onChange={(e) => setFilterKomoditas(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-full text-gray-700 font-poppins font-medium focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
            >
              <option value="Semua">Semua Komoditas</option>
              <option value="Padi">Padi</option>
              <option value="Jagung">Jagung</option>
              <option value="Kedelai">Kedelai</option>
            </select>
          </div>
        </div>

        {/* CONTENT TAB 1: TABEL HASIL PANEN */}
        {activeTab === 'panen' && (
          <div className="overflow-x-auto">
            {filteredHarvests.length === 0 ? (
              <div className="text-center py-12 text-gray-500 space-y-2">
                <Wheat className="w-12 h-12 mx-auto text-gray-300" />
                <p className="font-semibold text-base text-gray-600 font-poppins">Tidak ada data panen untuk periode {getMonthName(selectedPeriod.month)} {selectedPeriod.year}</p>
                <p className="text-xs text-gray-400">Silakan pilih arsip bulan lain seperti Oktober, September, atau Agustus 2026.</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-[#f0fdf4] text-[11px] font-poppins font-bold uppercase tracking-wider text-[#1c4234] border-b border-[#dbf0e3]">
                  <tr>
                    <th className="py-3.5 px-4 rounded-l-xl">No</th>
                    <th className="py-3.5 px-4">Tanggal Panen</th>
                    <th className="py-3.5 px-4">Nama Petani</th>
                    <th className="py-3.5 px-4">Komoditas</th>
                    <th className="py-3.5 px-4 text-right">Jumlah Panen</th>
                    <th className="py-3.5 px-4 text-center">Kualitas</th>
                    <th className="py-3.5 px-4 rounded-r-xl">Catatan Petak / Kondisi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-manrope">
                  {filteredHarvests.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-[#f0fdf4]/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-400">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-medium text-gray-900 whitespace-nowrap">
                        {formatDateIndo(row.tanggal)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900 font-poppins">
                        {row.petaniNama}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          row.komoditas === 'Padi'
                            ? 'bg-[#dbf0e3] text-[#1c4234]'
                            : row.komoditas === 'Jagung'
                            ? 'bg-[#f5ece0] text-[#c9a96e]'
                            : 'bg-yellow-100 text-yellow-900'
                        }`}>
                          <Wheat className="w-3 h-3" />
                          {row.komoditas}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-poppins font-bold text-[#1c4234] text-base">
                        {formatNumber(row.jumlahKg)} <span className="text-xs font-normal text-gray-500">kg</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          row.kualitas === 'A'
                            ? 'bg-[#1c4234] text-white'
                            : row.kualitas === 'B'
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#c9a96e] text-white'
                        }`}>
                          Grade {row.kualitas}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-gray-600 max-w-xs truncate">
                        {row.catatan || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* CONTENT TAB 2: TABEL PENJUALAN */}
        {activeTab === 'penjualan' && (
          <div className="overflow-x-auto">
            {filteredSales.length === 0 ? (
              <div className="text-center py-12 text-gray-500 space-y-2">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300" />
                <p className="font-semibold text-base text-gray-600 font-poppins">Tidak ada riwayat penjualan pada bulan {getMonthName(selectedPeriod.month)} {selectedPeriod.year}</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-[#f5ece0] text-[11px] font-poppins font-bold uppercase tracking-wider text-[#9d7c43] border-b border-[#c9a96e]/20">
                  <tr>
                    <th className="py-3.5 px-4 rounded-l-xl">No</th>
                    <th className="py-3.5 px-4">Tanggal Penjualan</th>
                    <th className="py-3.5 px-4">Pembeli / Mitra</th>
                    <th className="py-3.5 px-4">Komoditas</th>
                    <th className="py-3.5 px-4 text-right">Volume</th>
                    <th className="py-3.5 px-4 text-right">Harga / Kg</th>
                    <th className="py-3.5 px-4 text-right">Total Transaksi</th>
                    <th className="py-3.5 px-4 text-center rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-manrope">
                  {filteredSales.map((sale, idx) => (
                    <tr key={sale.id} className="hover:bg-[#f5ece0]/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-400">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-medium text-gray-900 whitespace-nowrap">
                        {formatDateIndo(sale.tanggal)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900 font-poppins">
                        {sale.pembeli}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#1c4234]">
                        {sale.komoditas}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-gray-900 font-poppins">
                        {formatNumber(sale.jumlahKg)} kg
                      </td>
                      <td className="py-3.5 px-4 text-right text-gray-600">
                        {formatRupiah(sale.hargaPerKg)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-poppins font-bold text-[#9d7c43] text-base">
                        {formatRupiah(sale.totalNilai)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="bg-[#dbf0e3] text-[#1c4234] font-bold px-2.5 py-0.5 rounded-full text-xs">
                          {sale.status || 'Lunas'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
