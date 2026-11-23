import React from 'react';
import { useApp } from '../../context/AppContext';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { TrendingUp, Award, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const AdminAnalyticsPage = () => {
    const { desaInfo, harvests } = useApp();

    // Data untuk grafik tren (visual)
    const trenBulanan = [
        { bulan: 'Mei', panen: 2720, penjualan: 2400 },
        { bulan: 'Jun', panen: 0, penjualan: 1200 },
        { bulan: 'Jul', panen: 0, penjualan: 1500 },
        { bulan: 'Ags', panen: 3540, penjualan: 4100 },
        { bulan: 'Sep', panen: 3810, penjualan: 4500 },
        { bulan: 'Okt', panen: 3100, penjualan: 3500 },
    ];

    // Data untuk grafik komoditas (visual)
    const komposisiKomoditas = [
        { name: 'Padi', pendapatan: 17400000 },
        { name: 'Jagung', pendapatan: 4960000 },
        { name: 'Kedelai', pendapatan: 6400000 },
        { name: 'Kacang Hijau', pendapatan: 5550000 },
    ];

    // FUNGSI EXPORT PDF (DATA ASLI PANEN)
    const handleExportPDF = () => {
        const doc = new jsPDF();

        // 1. Kop Surat
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("KELOMPOK TANI MARSUDI AMONG TANI", 105, 20, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(desaInfo.alamatSekretariat, 105, 27, { align: "center", maxWidth: 180 });
        doc.setLineWidth(1);
        doc.line(15, 32, 195, 32);

        // 2. Judul Laporan
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("LAPORAN REKAPITULASI DATA PANEN", 105, 42, { align: "center" });

        // 3. Tabel Data Asli dari Database (state harvests)
        const tableData = harvests.map((item, index) => [
            index + 1,
            item.tanggal,
            item.petaniNama,
            item.komoditas,
            item.pengelolaan,
            `${item.jumlahKg} kg`
        ]);

        autoTable(doc, {
            startY: 50,
            head: [['No', 'Tanggal', 'Nama Petani', 'Komoditas', 'Pengelolaan', 'Jumlah']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [28, 66, 52], textColor: [255, 255, 255] },
            styles: { fontSize: 9, cellPadding: 3 },
        });

        // 4. Tanda Tangan
        const finalY = doc.lastAutoTable.finalY || 50;
        doc.setFontSize(10);
        doc.text(`Banyumas, ${new Date().toLocaleDateString('id-ID')}`, 140, finalY + 20);
        doc.text(`Admin Lumbung`, 140, finalY + 30);
        doc.text(`( ......................... )`, 140, finalY + 55);

        // Simpan
        doc.save(`Laporan_Rekap_Panen_Admin.pdf`);
    };

    return (
        <div className="space-y-6 font-manrope pb-12">
            {/* Header Halaman */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-poppins font-bold text-[#1c4234]">Analitik & Laporan</h1>
                    <p className="text-sm text-gray-500">Dapur pengambilan keputusan berbasis data (Sains Data).</p>
                </div>

                {/* TOMBOL EXPORT PDF */}
                <button
                    onClick={handleExportPDF}
                    className="bg-[#1c4234] hover:bg-[#0a1f14] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                    <FileDown className="w-4 h-4" /> Unduh Laporan (PDF)
                </button>
            </div>

            {/* Insight Otomatis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f0fdf4] border border-green-200 p-5 rounded-2xl flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-700 rounded-xl shrink-0">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-green-900 text-sm">Tren Positif</h3>
                        <p className="text-sm text-green-800 mt-1">
                            Terjadi kenaikan tren panen sebesar <strong>15%</strong> dibanding bulan lalu. Disarankan untuk menyiapkan kapasitas gudang tambahan.
                        </p>
                    </div>
                </div>
                <div className="bg-[#fffbeb] border border-yellow-200 p-5 rounded-2xl flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 text-yellow-700 rounded-xl shrink-0">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-yellow-900 text-sm">Komoditas Terbaik</h3>
                        <p className="text-sm text-yellow-800 mt-1">
                            <strong>Padi</strong> menyumbang pendapatan tertinggi bulan ini. Segera negosiasi harga dengan Koperasi Pertanian.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grafik Tren */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h2 className="font-poppins font-bold text-lg text-[#1c4234]">Analisis Tren Panen & Penjualan (6 Bulan)</h2>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trenBulanan}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="bulan" tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <RechartsTooltip contentStyle={{ borderRadius: '12px' }} />
                            <Legend />
                            <Line type="monotone" dataKey="panen" name="Total Panen (kg)" stroke="#1c4234" strokeWidth={3} />
                            <Line type="monotone" dataKey="penjualan" name="Total Penjualan (kg)" stroke="#c9a96e" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Grafik Komposisi */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h2 className="font-poppins font-bold text-lg text-[#1c4234]">Perbandingan Pendapatan Komoditas</h2>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={komposisiKomoditas}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `Rp ${value / 1000000}M`} />
                            <RechartsTooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                            <Bar dataKey="pendapatan" name="Pendapatan" fill="#2d6a4f" radius={[6, 6, 0, 0]} barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};