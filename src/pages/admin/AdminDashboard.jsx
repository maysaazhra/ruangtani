import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatDateIndo } from '../../utils/formatters';
import { 
  PlusCircle, 
  TrendingUp, 
  Boxes, 
  Users, 
  Calendar, 
  Wheat, 
  ChevronRight, 
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    navigateTo, 
    harvests, 
    currentStocks, 
    todayStats 
  } = useApp();

  const recentHarvests = harvests.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-manrope">
      
      {/* Welcome Banner — Orbitani Deep Green */}
      <div className="bg-gradient-to-r from-[#0a1f14] via-[#1c4234] to-[#0a1f14] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold text-[#95d5b2]">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]" />
            Panel Operator RuangTani • Desa Dawuhan
          </div>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold">
            Selamat Bertugas, Petugas Operator!
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed font-manrope">
            Kelola pencatatan panen, ketersediaan stok gabah di gudang, dan laporan pertanggungjawaban Kelompok Tani Marsudi Among Tani Desa Dawuhan secara presisi.
          </p>
        </div>

        {/* Quick Action: Input Panen Baru (Orbitani Pill Button) */}
        <div className="z-10 shrink-0">
          <button
            onClick={() => navigateTo('admin-input-panen')}
            className="bg-[#c9a96e] hover:bg-[#b8985c] text-[#0a1f14] font-poppins font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4 text-[#0a1f14]" />
            <span>Input Panen Baru</span>
          </button>
        </div>

        {/* Background glow */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-[#95d5b2]/10 blur-3xl pointer-events-none"></div>
      </div>

      {/* 4 KARTU RINGKASAN ADMIN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Panen Hari Ini */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Panen Hari Ini</span>
            <div className="w-10 h-10 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-poppins font-bold text-gray-900">
              {formatNumber(todayStats.totalKgToday)} <span className="text-xs font-normal text-gray-500">kg</span>
            </div>
            <p className="text-xs text-[#2d6a4f] font-semibold mt-1">
              {todayStats.todayCount > 0 ? `${todayStats.todayCount} transaksi panen dicatat hari ini` : 'Belum ada input panen hari ini'}
            </p>
          </div>
        </div>

        {/* Card 2: Total Panen Bulan Ini */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Total Panen Bulan Ini</span>
            <div className="w-10 h-10 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">
              {formatNumber(todayStats.totalKgMonth)} <span className="text-xs font-normal text-gray-500">kg</span>
            </div>
            <p className="text-xs text-[#2d6a4f] font-semibold mt-1">
              Oktober 2026 (Musim Panen Raya)
            </p>
          </div>
        </div>

        {/* Card 3: Stok Gabah Gudang */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Total Stok Gabah</span>
            <div className="w-10 h-10 rounded-xl bg-[#f5ece0] text-[#c9a96e] flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-poppins font-bold text-[#9d7c43]">
              {formatNumber(todayStats.totalStokGabah)} <span className="text-xs font-normal text-gray-500">kg</span>
            </div>
            <p className="text-xs text-[#c9a96e] font-semibold mt-1">
              Padi, Jagung, & Kedelai
            </p>
          </div>
        </div>

        {/* Card 4: Petani Aktif */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-poppins font-bold text-gray-500 uppercase tracking-wider">Petani Terdaftar</span>
            <div className="w-10 h-10 rounded-xl bg-[#dbf0e3] text-[#1c4234] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-poppins font-bold text-gray-900">
              {todayStats.totalPetaniAktif} <span className="text-xs font-normal text-gray-500">petani</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              Desa Dawuhan (4 Dusun)
            </p>
          </div>
        </div>

      </div>

      {/* Commodity Stock Snapshot */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-poppins font-bold text-[#1c4234]">Ketersediaan Stok Gabah Lumbung</h3>
            <p className="text-xs text-gray-500">Otomatis bertambah saat ada input panen & berkurang saat distribusi</p>
          </div>
          <button
            onClick={() => navigateTo('admin-stok')}
            className="text-xs font-poppins font-bold text-[#1c4234] hover:text-[#0a1f14] flex items-center gap-1 cursor-pointer"
          >
            <span>Kelola Rinci</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Padi */}
          <div className="p-5 rounded-2xl bg-[#f0fdf4] border border-[#dbf0e3]">
            <div className="flex items-center justify-between">
              <span className="font-poppins font-bold text-[#1c4234] text-sm">Gabah Padi (Beras)</span>
              <span className="text-xs bg-[#dbf0e3] text-[#1c4234] px-2 py-0.5 rounded-full font-bold">Ciherang</span>
            </div>
            <div className="text-2xl font-poppins font-bold text-[#1c4234] mt-3">
              {formatNumber(currentStocks.Padi || 0)} <span className="text-xs font-normal text-gray-600">kg</span>
            </div>
            <div className="mt-3 w-full bg-[#dbf0e3] rounded-full h-2">
              <div className="bg-[#1c4234] h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          {/* Jagung */}
          <div className="p-5 rounded-2xl bg-[#f5ece0] border border-[#c9a96e]/30">
            <div className="flex items-center justify-between">
              <span className="font-poppins font-bold text-[#9d7c43] text-sm">Jagung Pipil Kering</span>
              <span className="text-xs bg-[#c9a96e]/20 text-[#9d7c43] px-2 py-0.5 rounded-full font-bold">Hibrida</span>
            </div>
            <div className="text-2xl font-poppins font-bold text-[#9d7c43] mt-3">
              {formatNumber(currentStocks.Jagung || 0)} <span className="text-xs font-normal text-gray-600">kg</span>
            </div>
            <div className="mt-3 w-full bg-[#c9a96e]/20 rounded-full h-2">
              <div className="bg-[#c9a96e] h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Kedelai */}
          <div className="p-5 rounded-2xl bg-yellow-50/70 border border-yellow-200">
            <div className="flex items-center justify-between">
              <span className="font-poppins font-bold text-yellow-950 text-sm">Kedelai Kuning</span>
              <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full font-bold">Anjasmoro</span>
            </div>
            <div className="text-2xl font-poppins font-bold text-yellow-900 mt-3">
              {formatNumber(currentStocks.Kedelai || 0)} <span className="text-xs font-normal text-gray-600">kg</span>
            </div>
            <div className="mt-3 w-full bg-yellow-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Harvest Entries Feed */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-poppins font-bold text-[#1c4234]">5 Catatan Panen Terbaru</h3>
            <p className="text-xs text-gray-500">Data panen gabah yang baru saja dicatat oleh sistem</p>
          </div>
          <button
            onClick={() => navigateTo('admin-riwayat')}
            className="text-xs font-poppins font-bold text-[#1c4234] hover:text-[#0a1f14] flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Riwayat</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-[11px] font-poppins font-bold uppercase tracking-wider text-gray-600 border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Tanggal</th>
                <th className="py-3 px-4">Nama Petani</th>
                <th className="py-3 px-4">Komoditas</th>
                <th className="py-3 px-4 text-right">Jumlah</th>
                <th className="py-3 px-4 text-center">Kualitas</th>
                <th className="py-3 px-4 rounded-r-xl">Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-manrope">
              {recentHarvests.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {formatDateIndo(row.tanggal)}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900 font-poppins">{row.petaniNama}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#1c4234]">{row.komoditas}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900 font-poppins">
                    {formatNumber(row.jumlahKg)} kg
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#dbf0e3] text-[#1c4234]">
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
