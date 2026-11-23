import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatRupiah, formatDateIndo, getMonthName, getMasaTanamFullLabel } from '../../utils/formatters';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Calendar, 
  Printer, 
  Wheat,
  Sprout,
  Clock,
  Sparkles
} from 'lucide-react';

export const LaporanPage = () => {
  const { 
    selectedPeriod, 
    setSelectedPeriod, 
    getSummaryForPeriod, 
    showToast,
    desaInfo
  } = useApp();

  const [isExporting, setIsExporting] = useState(false);
  const [filterPengelolaan, setFilterPengelolaan] = useState('Semua');

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

  const {
    periodHarvests,
    totalPanen,
    totalJual,
    totalNilaiJual,
    stokAkhir,
    petaniAktif,
    panenOrganik,
    panenNonOrganik,
    panenKonversi
  } = getSummaryForPeriod(selectedPeriod.month, selectedPeriod.year);

  // Filtered harvests if operator selects specific pengelolaan in view
  const displayHarvests = filterPengelolaan === 'Semua'
    ? periodHarvests
    : periodHarvests.filter(h => h.pengelolaan === filterPengelolaan);

  // Handle Export to PDF
  const handleExportPDF = () => {
    if (periodHarvests.length === 0) {
      showToast('Tidak ada data panen pada bulan ini untuk dicetak ke PDF', 'error');
      return;
    }

    setIsExporting(true);
    setTimeout(() => {
      const success = exportToPDF(periodHarvests, selectedPeriod.month, selectedPeriod.year, {
        totalPanen,
        totalJual,
        stokAkhir,
        petaniAktif,
        panenOrganik,
        panenNonOrganik,
        panenKonversi
      });

      setIsExporting(false);
      if (success) {
        showToast(`Laporan PDF periode ${getMonthName(selectedPeriod.month)} ${selectedPeriod.year} berhasil diunduh!`, 'success');
      } else {
        showToast('Gagal mencetak PDF. Silakan coba kembali.', 'error');
      }
    }, 400);
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    if (periodHarvests.length === 0) {
      showToast('Tidak ada data panen pada bulan ini untuk diekspor ke Excel', 'error');
      return;
    }

    setIsExporting(true);
    setTimeout(() => {
      const filename = `Laporan_Panen_Dawuhan_${getMonthName(selectedPeriod.month)}_${selectedPeriod.year}`;
      const success = exportToExcel(periodHarvests, filename);

      setIsExporting(false);
      if (success) {
        showToast(`File Excel (.xlsx) periode ${getMonthName(selectedPeriod.month)} ${selectedPeriod.year} berhasil diunduh!`, 'success');
      } else {
        showToast('Gagal membuat file Excel. Silakan coba kembali.', 'error');
      }
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-manrope">
      
      {/* Header and Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] bg-[#dbf0e3] px-3.5 py-1 rounded-full mb-1">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Arsip Historis & Pelaporan
          </div>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">
            Laporan Rekapitulasi Panen & Penjualan
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-manrope">
            Cetak laporan resmi pertanggungjawaban panen kelompok tani per periode bulanan dan masa tanam.
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Export PDF Button */}
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="bg-[#1c4234] hover:bg-[#0a1f14] active:scale-98 text-white font-poppins font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FileText className="w-4 h-4 text-[#95d5b2]" />
            <span>Export PDF</span>
          </button>

          {/* Export Excel Button */}
          <button
            onClick={handleExportExcel}
            disabled={isExporting}
            className="bg-[#2d6a4f] hover:bg-[#1b4332] active:scale-98 text-white font-poppins font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#c9a96e]" />
            <span>Export Excel</span>
          </button>

          {/* Print Browser Button */}
          <button
            onClick={() => window.print()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-poppins font-semibold px-4 py-2.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-gray-600" />
            <span>Cetak Halaman</span>
          </button>
        </div>
      </div>

      {/* Filter Period Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-sm text-[#1c4234]">Pilih Periode Bulan & Tahun Laporan</h3>
            <p className="text-xs text-gray-500 font-manrope">Rekapitulasi otomatis disesuaikan dengan database panen desa</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Dropdown Bulan */}
          <select
            value={selectedPeriod.month}
            onChange={(e) => setSelectedPeriod(prev => ({ ...prev, month: e.target.value }))}
            className="bg-gray-50 border border-gray-300 font-poppins font-bold text-xs sm:text-sm text-[#1c4234] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
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
            className="bg-gray-50 border border-gray-300 font-poppins font-bold text-xs sm:text-sm text-[#1c4234] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
          >
            {years.map(y => (
              <option key={y} value={y}>
                Tahun {y}
              </option>
            ))}
          </select>

          {/* Filter Pengelolaan in View */}
          <select
            value={filterPengelolaan}
            onChange={(e) => setFilterPengelolaan(e.target.value)}
            className="bg-gray-50 border border-gray-300 font-poppins font-bold text-xs text-gray-700 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
          >
            <option value="Semua">Semua Pengelolaan</option>
            <option value="Organik">Organik</option>
            <option value="Konversi">Konversi</option>
            <option value="Non-Organik">Non-Organik</option>
          </select>
        </div>
      </div>

      {/* PRINT-ONLY OFFICIAL KOP SURAT */}
      <div className="hidden print:block border-b-2 border-black pb-4 mb-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold uppercase tracking-wider text-black">
            KELOMPOK TANI MARSUDI AMONG TANI
          </h2>
          <p className="text-xs text-gray-800">
            {desaInfo.alamatSekretariat}
          </p>
          <p className="text-[11px] text-gray-600">
            Badan Hukum Kemenkumham RI: {desaInfo.badanHukum} • Reg: {desaInfo.nomorRegistrasi} • Halal: {desaInfo.sertifikatHalal}
          </p>
          <h3 className="text-sm font-bold uppercase pt-2 border-t border-gray-300 mt-2">
            LAPORAN REKAPITULASI HASIL PANEN — PERIODE: {getMonthName(selectedPeriod.month).toUpperCase()} {selectedPeriod.year}
          </h3>
        </div>
      </div>

      {/* 4 Cards Summary of the Month */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase">Total Panen Periode</span>
          <div className="text-2xl font-poppins font-bold text-[#1c4234] mt-2">
            {formatNumber(totalPanen)} <span className="text-xs font-normal text-gray-500">kg</span>
          </div>
          <span className="text-xs text-[#2d6a4f] font-semibold mt-1 block">
            {periodHarvests.length} transaksi setor
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase">Total Penjualan / Distribusi</span>
          <div className="text-2xl font-poppins font-bold text-amber-900 mt-2">
            {formatNumber(totalJual)} <span className="text-xs font-normal text-gray-500">kg</span>
          </div>
          <span className="text-xs text-amber-700 font-semibold mt-1 block">
            Nilai: {formatRupiah(totalNilaiJual)}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase">Stok Akhir Lumbung</span>
          <div className="text-2xl font-poppins font-bold text-[#1c4234] mt-2">
            {formatNumber(stokAkhir)} <span className="text-xs font-normal text-gray-500">kg</span>
          </div>
          <span className="text-xs text-gray-500 font-semibold mt-1 block">
            Cadangan pangan 4 komoditas
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase">Petani Aktif</span>
          <div className="text-2xl font-poppins font-bold text-blue-900 mt-2">
            {petaniAktif} <span className="text-xs font-normal text-gray-500">orang</span>
          </div>
          <span className="text-xs text-blue-700 font-semibold mt-1 block">
            Menyetor pada bulan ini
          </span>
        </div>
      </div>

      {/* Pengelolaan Breakdown Micro-card */}
      <div className="bg-[#f0fdf4] border border-[#dbf0e3] p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-manrope">
        <span className="font-poppins font-bold text-[#1c4234] flex items-center gap-1.5">
          <Sprout className="w-4 h-4 text-[#2d6a4f]" />
          Rincian Jenis Pengelolaan Periode Ini:
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            Organik Bersertifikat: <strong>{formatNumber(panenOrganik)} kg</strong>
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-amber-800">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            Masa Konversi: <strong>{formatNumber(panenKonversi)} kg</strong>
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-sky-800">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
            Non-Organik: <strong>{formatNumber(panenNonOrganik)} kg</strong>
          </span>
        </div>
      </div>

      {/* Detail Harvest Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-[#1c4234]">
            Daftar Setoran Panen — {getMonthName(selectedPeriod.month)} {selectedPeriod.year}
          </h3>
          <span className="text-xs text-gray-500 font-manrope">
            {displayHarvests.length} baris data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm font-manrope">
            <thead>
              <tr className="bg-[#1c4234] text-white text-xs font-poppins font-bold uppercase">
                <th className="py-3 px-4 sm:px-6">No</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Nama Petani</th>
                <th className="py-3 px-4">Komoditas</th>
                <th className="py-3 px-4 text-center">Pengelolaan</th>
                <th className="py-3 px-4 text-center">Masa Tanam</th>
                <th className="py-3 px-4 text-right">Jumlah (Kg)</th>
                <th className="py-3 px-4">Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayHarvests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-gray-500 font-medium">
                    Tidak ada catatan panen pada bulan {getMonthName(selectedPeriod.month)} {selectedPeriod.year}.
                  </td>
                </tr>
              ) : (
                displayHarvests.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                      {formatDateIndo(item.tanggal)}
                    </td>
                    <td className="py-3 px-4 font-poppins font-semibold text-[#1c4234]">
                      {item.petaniNama}
                    </td>
                    <td className="py-3 px-4 font-poppins font-bold text-gray-800">
                      {item.komoditas}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {item.pengelolaan === 'Organik' && (
                        <span className="text-[11px] font-poppins font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Organik
                        </span>
                      )}
                      {item.pengelolaan === 'Konversi' && (
                        <span className="text-[11px] font-poppins font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          Konversi
                        </span>
                      )}
                      {item.pengelolaan === 'Non-Organik' && (
                        <span className="text-[11px] font-poppins font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                          Non-Organik
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="text-[11px] font-poppins font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {item.masaTanam || 'MT 01'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-poppins font-bold text-[#1c4234]">
                      {formatNumber(item.jumlahKg)} kg
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate" title={item.catatan}>
                      {item.catatan || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature Section for Print View */}
      <div className="hidden print:grid grid-cols-2 gap-8 pt-8 text-xs font-manrope">
        <div>
          <p className="text-gray-600">Mengetahui,</p>
          <p className="font-bold font-poppins mt-1">Kepala Desa Dawuhan</p>
          <div className="h-20"></div>
          <p className="font-bold underline">RUSWANTO</p>
          <p className="text-[10px] text-gray-500">Kepala Desa Dawuhan</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Dawuhan, {formatDateIndo(new Date().toISOString().split('T')[0])}</p>
          <p className="font-bold font-poppins mt-1">Ketua Kelompok Tani Marsudi Among Tani</p>
          <div className="h-20"></div>
          <p className="font-bold underline">SLAMET</p>
          <p className="text-[10px] text-gray-500">Ketua Kelompok Tani</p>
        </div>
      </div>

    </div>
  );
};
