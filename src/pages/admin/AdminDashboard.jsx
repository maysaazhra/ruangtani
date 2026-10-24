import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatDateIndo, formatRupiah } from '../../utils/formatters';
import { 
  PlusCircle, 
  TrendingUp, 
  Boxes, 
  Users, 
  Calendar, 
  Wheat, 
  History, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    navigateTo, 
    harvests, 
    farmers, 
    currentStocks, 
    todayStats 
  } = useApp();

  const recentHarvests = harvests.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 bg-green-700/60 border border-green-500/50 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Mode Admin Aktif • Desa Dawuhan
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Selamat Bertugas, Petugas Operator!
          </h1>
          <p className="text-sm text-green-200 max-w-xl leading-relaxed">
            Kelola pencatatan panen, ketersediaan gabah di gudang, dan laporan pertanggungjawaban Kelompok Tani Marsudi Among Tani dengan mudah dan cepat.
          </p>
        </div>

        {/* Quick Action: Input Panen Baru */}
        <div className="z-10 shrink-0">
          <button
            onClick={() => navigateTo('admin-input-panen')}
            className="bg-amber-400 hover:bg-amber-300 text-green-950 font-black px-6 py-4 rounded-2xl text-base transition-all shadow-xl hover:shadow-amber-400/30 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-5 h-5 text-green-950" />
            <span>Input Panen Baru</span>
          </button>
        </div>

        {/* Background glow */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      </div>

      {/* 4 KARTU RINGKASAN ADMIN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Panen Hari Ini */}
        <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Panen Hari Ini</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-green-950">
              {formatNumber(todayStats.totalKgToday)} <span className="text-sm font-semibold text-gray-500">kg</span>
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1">
              {todayStats.todayCount > 0 ? `${todayStats.todayCount} transaksi panen dicatat hari ini` : 'Belum ada input panen hari ini'}
            </p>
          </div>
        </div>

        {/* Card 2: Total Panen Bulan Ini */}
        <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Panen Bulan Ini</span>
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-green-900">
              {formatNumber(todayStats.totalKgMonth)} <span className="text-sm font-semibold text-gray-500">kg</span>
            </div>
            <p className="text-xs text-green-700 font-semibold mt-1">
              Oktober 2026 (Musim Panen Raya)
            </p>
          </div>
        </div>

        {/* Card 3: Stok Gabah Gudang */}
        <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Stok Gabah</span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-amber-900">
              {formatNumber(todayStats.totalStokGabah)} <span className="text-sm font-semibold text-gray-500">kg</span>
            </div>
            <p className="text-xs text-amber-700 font-semibold mt-1">
              Padi, Jagung, & Kedelai
            </p>
          </div>
        </div>

        {/* Card 4: Petani Aktif */}
        <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Petani Terdaftar</span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-blue-900">
              {todayStats.totalPetaniAktif} <span className="text-sm font-semibold text-gray-500">petani</span>
            </div>
            <p className="text-xs text-blue-700 font-semibold mt-1">
              Desa Dawuhan (4 Dusun)
            </p>
          </div>
        </div>

      </div>

      {/* Commodity Stock Snapshot */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-green-950">Status Ketersediaan Stok Gabah Lumbung</h3>
            <p className="text-xs text-gray-500">Otomatis bertambah saat ada input panen & berkurang saat distribusi</p>
          </div>
          <button
            onClick={() => navigateTo('admin-stok')}
            className="text-xs font-bold text-green-800 hover:text-green-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Kelola Rinci</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Padi */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-base">Gabah Padi (Beras)</span>
              <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">Ciherang</span>
            </div>
            <div className="text-2xl font-black text-emerald-900 mt-3">
              {formatNumber(currentStocks.Padi || 0)} <span className="text-xs font-semibold text-gray-600">kg</span>
            </div>
            <div className="mt-3 w-full bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          {/* Jagung */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 text-base">Jagung Pipil Kering</span>
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">Hibrida</span>
            </div>
            <div className="text-2xl font-black text-amber-900 mt-3">
              {formatNumber(currentStocks.Jagung || 0)} <span className="text-xs font-semibold text-gray-600">kg</span>
            </div>
            <div className="mt-3 w-full bg-amber-200 rounded-full h-2">
              <div className="bg-amber-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Kedelai */}
          <div className="p-5 rounded-2xl bg-yellow-50/70 border border-yellow-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-yellow-950 text-base">Kedelai Kuning</span>
              <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full font-bold">Anjasmoro</span>
            </div>
            <div className="text-2xl font-black text-yellow-900 mt-3">
              {formatNumber(currentStocks.Kedelai || 0)} <span className="text-xs font-semibold text-gray-600">kg</span>
            </div>
            <div className="mt-3 w-full bg-yellow-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Harvest Entries Feed */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-green-950">5 Catatan Panen Terbaru</h3>
            <p className="text-xs text-gray-500">Data panen gabah yang baru saja dicatat oleh sistem</p>
          </div>
          <button
            onClick={() => navigateTo('admin-riwayat')}
            className="text-xs font-bold text-green-800 hover:text-green-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Riwayat</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Tanggal</th>
                <th className="py-3 px-4">Nama Petani</th>
                <th className="py-3 px-4">Komoditas</th>
                <th className="py-3 px-4 text-right">Jumlah</th>
                <th className="py-3 px-4 text-center">Kualitas</th>
                <th className="py-3 px-4 rounded-r-xl">Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentHarvests.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {formatDateIndo(row.tanggal)}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">{row.petaniNama}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-green-800">{row.komoditas}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-black text-gray-900">
                    {formatNumber(row.jumlahKg)} kg
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                      Grade {row.kualitas}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">
                    {row.catatan || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
