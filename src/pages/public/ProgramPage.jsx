import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar, Printer, TrendingUp, Package, Users,
  Sprout, CheckCircle2, FileDown
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const ProgramPage = () => {
  const { getSummaryForPeriod, desaInfo } = useApp();

  const [bulan, setBulan] = useState('10');
  const [tahun, setTahun] = useState('2026');

  const summary = getSummaryForPeriod(bulan, tahun);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  // FUNGSI EXPORT PDF LAPORAN FORMAL
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const bulanNama = new Date(tahun, parseInt(bulan) - 1).toLocaleString('id-ID', { month: 'long' });

    // 1. KOP SURAT
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("KELOMPOK TANI MARSUDI AMONG TANI", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(desaInfo.alamatSekretariat, 105, 27, { align: "center", maxWidth: 180 });

    // Garis Kop
    doc.setLineWidth(1);
    doc.line(15, 35, 195, 35);

    // 2. JUDUL LAPORAN
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`LAPORAN HASIL PANEN & PENJUALAN`, 105, 45, { align: "center" });
    doc.text(`PERIODE: ${bulanNama.toUpperCase()} ${tahun}`, 105, 52, { align: "center" });

    // 3. RINGKASAN STATISTIK
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    let currentY = 65;
    doc.text(`Total Panen        : ${summary.totalPanen} kg`, 15, currentY);
    doc.text(`Total Terdistribusi : ${summary.totalJual} kg`, 15, currentY + 6);
    doc.text(`Total Pendapatan  : ${formatRupiah(summary.totalNilaiJual)}`, 15, currentY + 12);
    doc.text(`Petani Aktif       : ${summary.petaniAktif} orang`, 15, currentY + 18);

    // 4. TABEL DETAIL PANEN
    const tableData = summary.periodHarvests.map((item, index) => [
      index + 1,
      item.tanggal,
      item.petaniNama,
      item.komoditas,
      item.pengelolaan,
      `${item.jumlahKg} kg`
    ]);

    autoTable(doc, {
      startY: currentY + 25,
      head: [['No', 'Tanggal', 'Nama Petani', 'Komoditas', 'Pengelolaan', 'Jumlah']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [28, 66, 52], textColor: [255, 255, 255] }, // Warna hijau RuangTani
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 10 },
        5: { halign: 'right' }
      }
    });

    // 5. TANDA TANGAN
    const finalY = doc.lastAutoTable.finalY || currentY + 30;

    doc.setFontSize(10);
    doc.text(`${desaInfo.kecamatan}, ${new Date().toLocaleDateString('id-ID')}`, 140, finalY + 20);
    doc.text(`Ketua Kelompok Tani`, 140, finalY + 30);

    // Spasi untuk TTD
    doc.text(`${desaInfo.ketua}`, 140, finalY + 55);

    // Simpan PDF
    doc.save(`Laporan_Panen_${bulanNama}_${tahun}.pdf`);
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-[#1c4234] text-xs font-bold mb-4">
              <Calendar className="w-4 h-4" />
              TRANSPARANSI HASIL TANI DESA DAWUHAN
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#1c4234] mb-3 leading-tight">
              Program: Hasil Panen & Penjualan
            </h1>
            <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
              Laporan berkala hasil panen gabah & palawija, status budidaya (Organik, Konversi, Non-Organik), dan 3 siklus Masa Tanam lumbung kelompok tani.
            </p>
          </div>

          {/* Form Filter & Tombol Export */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 px-3">
              <span className="text-sm font-bold text-gray-600">Periode:</span>
              <select
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#1c4234] focus:outline-none focus:ring-2 focus:ring-[#1c4234] cursor-pointer"
              >
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>

              <select
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#1c4234] focus:outline-none focus:ring-2 focus:ring-[#1c4234] cursor-pointer"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>

            {/* TOMBOL EXPORT PDF BARU */}
            <button
              onClick={handleExportPDF}
              className="w-full sm:w-auto bg-[#1c4234] hover:bg-[#0a1f14] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <FileDown className="w-4 h-4" /> Unduh Laporan (PDF)
            </button>
          </div>
        </div>

        {/* (Sisa kode akses cepat arsip, kotak statistik, dan tabel di bawah biarkan persis sama seperti kode sebelumnya) */}
        <div className="bg-[#f0fdf4] rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-3 text-sm border border-green-100">
          <span className="font-bold text-[#1c4234] mr-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Akses Cepat Arsip:
          </span>
          <button onClick={() => setBulan('10')} className={`px-4 py-1.5 rounded-full border border-green-200 font-bold transition-all ${bulan === '10' ? 'bg-[#1c4234] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-green-50'}`}>Oktober 2026</button>
          <button onClick={() => setBulan('09')} className={`px-4 py-1.5 rounded-full border border-green-200 font-bold transition-all ${bulan === '09' ? 'bg-[#1c4234] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-green-50'}`}>September 2026</button>
          <button onClick={() => setBulan('08')} className={`px-4 py-1.5 rounded-full border border-green-200 font-bold transition-all ${bulan === '08' ? 'bg-[#1c4234] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-green-50'}`}>Agustus 2026</button>
          <button onClick={() => setBulan('05')} className={`px-4 py-1.5 rounded-full border border-green-200 font-bold transition-all ${bulan === '05' ? 'bg-[#1c4234] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-green-50'}`}>Mei 2026</button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#1c4234]">
            Ringkasan Periode: <span className="text-[#2d6a4f]">{bulan} {tahun}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wider">Total Panen</h3>
              <div className="p-2 bg-green-50 text-green-700 rounded-lg"><Sprout className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-bold text-[#1c4234]">{summary.totalPanen} <span className="text-sm font-normal text-gray-500">kg</span></div>
            <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {summary.periodHarvests.length} transaksi panen masuk
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wider">Total Terdistribusi</h3>
              <div className="p-2 bg-yellow-50 text-yellow-700 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-bold text-[#1c4234]">{summary.totalJual} <span className="text-sm font-normal text-gray-500">kg</span></div>
            <p className="text-xs text-yellow-600 font-medium mt-2">Senilai {formatRupiah(summary.totalNilaiJual)}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wider">Stok Akhir Lumbung</h3>
              <div className="p-2 bg-blue-50 text-blue-700 rounded-lg"><Package className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-bold text-[#1c4234]">{summary.stokAkhir} <span className="text-sm font-normal text-gray-500">kg</span></div>
            <p className="text-xs text-gray-400 font-medium mt-2">Tersimpan di gudang kelompok</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wider">Petani Aktif</h3>
              <div className="p-2 bg-purple-50 text-purple-700 rounded-lg"><Users className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-bold text-[#1c4234]">{summary.petaniAktif} <span className="text-sm font-normal text-gray-500">orang</span></div>
            <p className="text-xs text-blue-600 font-medium mt-2">Menyetorkan hasil panen</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1c4234]">Detail Transaksi Panen</h2>
              <p className="text-sm text-gray-500">Data panen pada periode yang dipilih.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Nama Petani</th>
                  <th className="px-6 py-4">Komoditas</th>
                  <th className="px-6 py-4">Pengelolaan</th>
                  <th className="px-6 py-4">Jumlah (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {summary.periodHarvests.length > 0 ? (
                  summary.periodHarvests.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{item.tanggal}</td>
                      <td className="px-6 py-4 font-bold text-[#1c4234]">{item.petaniNama}</td>
                      <td className="px-6 py-4">{item.komoditas}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${item.pengelolaan === 'Organik' ? 'bg-green-50 text-green-700 border-green-200' :
                            item.pengelolaan === 'Konversi' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                          {item.pengelolaan}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold">{item.jumlahKg} kg</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400 italic">
                      Tidak ada data panen pada periode ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};