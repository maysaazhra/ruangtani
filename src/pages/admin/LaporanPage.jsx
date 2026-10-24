import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatRupiah, formatDateIndo, getMonthName } from '../../utils/formatters';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Calendar, 
  Printer, 
  Wheat, 
  ShoppingBag, 
  Boxes, 
  Users, 
  CheckCircle2, 
  Sparkles,
  History
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
    periodSales,
    totalPanen,
    totalJual,
    totalNilaiJual,
    stokAkhir,
    petaniAktif
  } = getSummaryForPeriod(selectedPeriod.month, selectedPeriod.year);

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
        petaniAktif
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
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header and Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full mb-1">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Arsip Historis & Pelaporan
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-green-950">
            Laporan Rekapitulasi Panen & Penjualan
          </h1>
          <p className="text-sm text-gray-600">
            Cetak laporan resmi pertanggungjawaban panen kelompok tani per periode bulanan.
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Export PDF Button */}
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="bg-rose-700 hover:bg-rose-800 active:scale-98 text-white font-extrabold px-5 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>

          {/* Export Excel Button */}
          <button
            onClick={handleExportExcel}
            disabled={isExporting}
            className="bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold px-5 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel (.xlsx)</span>
          </button>

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-3 rounded-2xl text-sm transition-all flex items-center gap-2 cursor-pointer border border-gray-200"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>
      </div>

      {/* FILTER PERIODE (Bulan & Tahun) */}
      <div className="bg-white rounded-3xl p-6 border border-green-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Pilih Periode Arsip</div>
            <div className="text-base font-extrabold text-green-950">
              Periode: {getMonthName(selectedPeriod.month)} {selectedPeriod.year}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Dropdown Bulan */}
          <select
            value={selectedPeriod.month}
            onChange={(e) => setSelectedPeriod(prev => ({ ...prev, month: e.target.value }))}
            className="bg-green-50 border border-green-200 text-green-950 font-bold text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-700 focus:outline-hidden cursor-pointer"
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
            className="bg-green-50 border border-green-200 text-green-950 font-bold text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-700 focus:outline-hidden cursor-pointer"
          >
            {years.map(y => (
              <option key={y} value={y}>
                Tahun {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PRINT-ONLY OFFICIAL KOP SURAT */}
      <div className="hidden print-only mb-6 border-b-2 border-black pb-4 text-center">
        <h2 className="text-xl font-bold uppercase tracking-tight">KELOMPOK TANI MARSUDI AMONG TANI</h2>
        <p className="text-xs">Desa Dawuhan, Kec. Padamara, Kab. Purbalingga, Jawa Tengah</p>
        <p className="text-xs font-semibold mt-1">LAPORAN HASIL PANEN & PENJUALAN - PERIODE: {getMonthName(selectedPeriod.month).toUpperCase()} {selectedPeriod.year}</p>
      </div>

      {/* 4 SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-green-100 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-500">Total Panen Masuk</div>
          <div className="text-2xl sm:text-3xl font-black text-green-900 mt-2">
            {formatNumber(totalPanen)} <span className="text-xs font-bold text-gray-500">kg</span>
          </div>
          <div className="text-xs text-green-700 mt-1 font-semibold">{periodHarvests.length} transaksi</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-green-100 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-500">Total Terdistribusi</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-900 mt-2">
            {formatNumber(totalJual)} <span className="text-xs font-bold text-gray-500">kg</span>
          </div>
          <div className="text-xs text-amber-700 mt-1 font-semibold">{formatRupiah(totalNilaiJual)}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-green-100 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-500">Stok Akhir Gabah</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-2">
            {formatNumber(stokAkhir)} <span className="text-xs font-bold text-gray-500">kg</span>
          </div>
          <div className="text-xs text-emerald-700 mt-1 font-semibold">Tersimpan di lumbung</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-green-100 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-500">Petani Berpartisipasi</div>
          <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-2">
            {petaniAktif} <span className="text-xs font-bold text-gray-500">orang</span>
          </div>
          <div className="text-xs text-blue-700 mt-1 font-semibold">Bulan {getMonthName(selectedPeriod.month)}</div>
        </div>
      </div>

      {/* DETAIL TABLE (SESUAI BULAN DIPILIH) */}
      <div className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="text-base font-extrabold text-green-950">
            Tabel Rekapitulasi Panen ({getMonthName(selectedPeriod.month)} {selectedPeriod.year})
          </h3>
          <span className="text-xs text-gray-500">
            {periodHarvests.length} Catatan Ditemukan
          </span>
        </div>

        <div className="overflow-x-auto">
          {periodHarvests.length === 0 ? (
            <div className="text-center py-12 text-gray-500 space-y-2">
              <Wheat className="w-12 h-12 mx-auto text-gray-300" />
              <p className="font-bold text-base text-gray-700">Tidak ada data panen tercatat pada periode ini.</p>
              <p className="text-xs text-gray-400">Pilih bulan Oktober, September, atau Agustus 2026 untuk melihat data historis.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-green-50 text-xs font-bold uppercase tracking-wider text-green-950 border-b border-green-100">
                <tr>
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Tanggal Setor</th>
                  <th className="py-3 px-4">Nama Petani</th>
                  <th className="py-3 px-4">Komoditas</th>
                  <th className="py-3 px-4 text-right">Volume (Kg)</th>
                  <th className="py-3 px-4 text-center">Kualitas</th>
                  <th className="py-3 px-4">Catatan Petak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {periodHarvests.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-green-50/30">
                    <td className="py-3 px-4 font-semibold text-gray-400">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                      {formatDateIndo(row.tanggal)}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">{row.petaniNama}</td>
                    <td className="py-3 px-4 font-semibold text-green-800">{row.komoditas}</td>
                    <td className="py-3 px-4 text-right font-black text-gray-900 text-base">
                      {formatNumber(row.jumlahKg)} kg
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                        Grade {row.kualitas}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate">
                      {row.catatan || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};
