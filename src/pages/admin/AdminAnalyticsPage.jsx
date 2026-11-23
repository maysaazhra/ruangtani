import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { TrendingUp, Award, FileDown, AlertTriangle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const AdminAnalyticsPage = () => {
    const { desaInfo, harvests } = useApp();
    
    const [forecastData, setForecastData] = useState({ riwayat: [], forecast: [], evaluasi: {} });
    const [risikoData, setRisikoData] = useState({ petani: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resForecast = await fetch('/data/forecast_gkp.json');
                const dataForecast = await resForecast.json();
                const resRisiko = await fetch('/data/risiko_petani.json');
                const dataRisiko = await resRisiko.json();
                setForecastData(dataForecast);
                setRisikoData(dataRisiko);
            } catch (error) {
                console.error("Gagal memuat data analitik:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const grafikTren = [
        ...(forecastData.riwayat || []).map(d => ({ periode: d.periode, aktual: d.gkp, prediksi: null })),
        ...(forecastData.forecast || []).map(d => ({ periode: d.periode, aktual: null, prediksi: d.prediksi_gkp }))
    ];

    const grafikRisiko = (risikoData.petani || []).slice(0, 5).map(p => ({
        nama: p.nama,
        skor: p.rata_skor_risiko
    }));

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("KELOMPOK TANI MARSUDI AMONG TANI", 105, 20, { align: "center" });
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(desaInfo?.alamatSekretariat || "Desa Dawuhan, Banyumas", 105, 27, { align: "center", maxWidth: 180 });
        doc.setLineWidth(1);
        doc.line(15, 32, 195, 32);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("LAPORAN REKAPITULASI DATA PANEN", 105, 42, { align: "center" });
        const tableData = (harvests || []).map((item, index) => [
            index + 1, item.tanggal, item.petaniNama, item.komoditas, item.pengelolaan, `${item.jumlahKg} kg`
        ]);
        autoTable(doc, {
            startY: 50,
            head: [['No', 'Tanggal', 'Nama Petani', 'Komoditas', 'Pengelolaan', 'Jumlah']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [28, 66, 52], textColor: [255, 255, 255] },
            styles: { fontSize: 9, cellPadding: 3 },
        });
        const finalY = doc.lastAutoTable.finalY || 50;
        doc.setFontSize(10);
        doc.text(`Banyumas, ${new Date().toLocaleDateString('id-ID')}`, 140, finalY + 20);
        doc.text(`Admin Lumbung`, 140, finalY + 30);
        doc.text(`( ......................... )`, 140, finalY + 55);
        doc.save(`Laporan_Rekap_Panen_Admin.pdf`);
    };

    if (loading) return <div className="p-6 text-center text-gray-500">Memuat data sains data...</div>;

    return (
        <div className="space-y-6 font-manrope pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-poppins font-bold text-[#1c4234]">Analitik & Laporan</h1>
                    <p className="text-sm text-gray-500">Dapur pengambilan keputusan berbasis data (Sains Data).</p>
                </div>
                <button onClick={handleExportPDF} className="bg-[#1c4234] hover:bg-[#0a1f14] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md">
                    <FileDown className="w-4 h-4" /> Unduh Laporan (PDF)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f0fdf4] border border-green-200 p-5 rounded-2xl flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-700 rounded-xl shrink-0"><TrendingUp className="w-6 h-6" /></div>
                    <div>
                        <h3 className="font-bold text-green-900 text-sm">Performa Model Peramalan</h3>
                        <p className="text-sm text-green-800 mt-1">
                            Model <strong>{forecastData.evaluasi?.model || 'Holt-Winters'}</strong> memprediksi panen. Akurasi lebih baik <strong>{Math.round(((forecastData.evaluasi?.baseline_lag2_mae - forecastData.evaluasi?.holt_winters_mae) / forecastData.evaluasi?.baseline_lag2_mae) * 100)}%</strong> dari metode konvensional.
                        </p>
                    </div>
                </div>
                <div className="bg-[#fffbeb] border border-yellow-200 p-5 rounded-2xl flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 text-yellow-700 rounded-xl shrink-0"><AlertTriangle className="w-6 h-6" /></div>
                    <div>
                        <h3 className="font-bold text-yellow-900 text-sm">Pantauan Risiko Petani</h3>
                        <p className="text-sm text-yellow-800 mt-1">
                            Sistem mendeteksi <strong>{(risikoData.petani || []).filter(p => p.rata_skor_risiko > 0.5).length} petani</strong> berisiko tinggi. Disarankan pendampingan lapangan.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h2 className="font-poppins font-bold text-lg text-[#1c4234]">Tren Historis & Prediksi Panen (Sains Data)</h2>
                    <p className="text-sm text-gray-500">Garis putus-putus adalah prediksi 2 musim ke depan.</p>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={grafikTren}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="periode" tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <RechartsTooltip contentStyle={{ borderRadius: '12px' }} />
                            <Legend />
                            <Line type="monotone" dataKey="aktual" name="Panen Aktual (kg)" stroke="#1c4234" strokeWidth={3} connectNulls />
                            <Line type="monotone" dataKey="prediksi" name="Prediksi Panen (kg)" stroke="#c9a96e" strokeWidth={3} strokeDasharray="5 5" connectNulls />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h2 className="font-poppins font-bold text-lg text-[#1c4234]">Top 5 Petani Berisiko (Machine Learning)</h2>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={grafikRisiko} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                            <XAxis type="number" domain={[0, 1]} tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <YAxis dataKey="nama" type="category" tick={{ fill: '#6B7280', fontSize: 12 }} width={120} />
                            <RechartsTooltip formatter={(value) => value.toFixed(3)} />
                            <Bar dataKey="skor" name="Skor Risiko (0-1)" fill="#e11d48" radius={[0, 6, 6, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
