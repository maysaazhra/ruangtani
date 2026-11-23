import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatDateIndo, getMasaTanamFullLabel } from '../../utils/formatters';
import { 
  History, 
  Search, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  Wheat, 
  X, 
  AlertTriangle,
  Sprout,
  Clock,
  Sparkles
} from 'lucide-react';

export const RiwayatPanenPage = () => {
  const { harvests, updateHarvest, deleteHarvest, farmers, navigateTo } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterKomoditas, setFilterKomoditas] = useState('Semua');
  const [filterPengelolaan, setFilterPengelolaan] = useState('Semua');
  const [filterMT, setFilterMT] = useState('Semua');

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    petaniNama: '',
    komoditas: 'Padi',
    pengelolaan: 'Organik',
    masaTanam: 'MT 01',
    jumlahKg: '',
    tanggal: '',
    catatan: ''
  });

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState(null);

  // Filter logic
  const filteredData = harvests.filter(item => {
    const matchesSearch = 
      item.petaniNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.komoditas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.catatan && item.catatan.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesKomoditas = filterKomoditas === 'Semua' || item.komoditas === filterKomoditas;
    const matchesPengelolaan = filterPengelolaan === 'Semua' || item.pengelolaan === filterPengelolaan;
    const matchesMT = filterMT === 'Semua' || item.masaTanam === filterMT;

    return matchesSearch && matchesKomoditas && matchesPengelolaan && matchesMT;
  });

  const totalKgFiltered = filteredData.reduce((acc, curr) => acc + (Number(curr.jumlahKg) || 0), 0);

  // Open Edit
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      petaniNama: item.petaniNama,
      komoditas: item.komoditas,
      pengelolaan: item.pengelolaan || 'Organik',
      masaTanam: item.masaTanam || 'MT 01',
      jumlahKg: item.jumlahKg,
      tanggal: item.tanggal,
      catatan: item.catatan || ''
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    updateHarvest(editingItem.id, editForm);
    setEditingItem(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteHarvest(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-manrope">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold uppercase tracking-wider text-[#1c4234] bg-[#dbf0e3] px-3.5 py-1 rounded-full mb-1">
            <History className="w-3.5 h-3.5" />
            Manajemen Transaksi Panen
          </div>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1c4234]">
            Riwayat Pencatatan Panen
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-manrope">
            Daftar lengkap transaksi setoran panen anggota Poktan Marsudi Among Tani dengan filter jenis pengelolaan dan masa tanam.
          </p>
        </div>

        <button
          onClick={() => navigateTo('admin-input-panen')}
          className="bg-[#1c4234] hover:bg-[#0a1f14] text-white font-poppins font-bold px-5 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#95d5b2]" />
          <span>Input Panen Baru</span>
        </button>
      </div>

      {/* Filter and Summary Bar */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama petani, komoditas, atau catatan..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-manrope focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
            />
          </div>

          {/* Filters: Komoditas, Pengelolaan, Masa Tanam */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Filter Komoditas */}
            <select
              value={filterKomoditas}
              onChange={(e) => setFilterKomoditas(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-[#1c4234] font-poppins font-bold text-xs rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
            >
              <option value="Semua">Semua Komoditas</option>
              <option value="Padi">Padi</option>
              <option value="Jagung">Jagung</option>
              <option value="Kedelai">Kedelai</option>
              <option value="Kacang Hijau">Kacang Hijau</option>
            </select>

            {/* Filter Pengelolaan */}
            <select
              value={filterPengelolaan}
              onChange={(e) => setFilterPengelolaan(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-[#1c4234] font-poppins font-bold text-xs rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
            >
              <option value="Semua">Semua Pengelolaan</option>
              <option value="Organik">Organik</option>
              <option value="Konversi">Konversi</option>
              <option value="Non-Organik">Non-Organik</option>
            </select>

            {/* Filter Masa Tanam */}
            <select
              value={filterMT}
              onChange={(e) => setFilterMT(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-[#1c4234] font-poppins font-bold text-xs rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
            >
              <option value="Semua">Semua Masa Tanam</option>
              <option value="MT 01">MT 01 (Okt - Jan)</option>
              <option value="MT 02">MT 02 (Feb - Mei)</option>
              <option value="MT 03">MT 03 (Juni - Sept)</option>
            </select>

          </div>

        </div>

        {/* Counter Summary */}
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 font-medium font-manrope">
          <span>Menampilkan <strong>{filteredData.length}</strong> transaksi panen</span>
          <span>Total Berat Terfilter: <strong className="text-[#1c4234] font-poppins font-bold text-sm">{formatNumber(totalKgFiltered)} kg</strong></span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1c4234] text-white text-xs font-poppins font-bold uppercase tracking-wider">
                <th className="py-4 px-4 sm:px-6">No / ID</th>
                <th className="py-4 px-4">Tanggal Panen</th>
                <th className="py-4 px-4">Nama Petani</th>
                <th className="py-4 px-4">Komoditas</th>
                <th className="py-4 px-4 text-right">Jumlah (Kg)</th>
                <th className="py-4 px-4 text-center">Pengelolaan</th>
                <th className="py-4 px-4 text-center">Masa Tanam</th>
                <th className="py-4 px-4">Catatan</th>
                <th className="py-4 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-manrope">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-gray-500">
                    <Wheat className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    Tidak ada data panen yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* ID & No */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-poppins font-bold text-gray-900">#{index + 1}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{item.id}</div>
                    </td>

                    {/* Tanggal */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-gray-700">
                      {formatDateIndo(item.tanggal)}
                    </td>

                    {/* Petani */}
                    <td className="py-3.5 px-4 font-poppins font-semibold text-[#1c4234]">
                      {item.petaniNama}
                    </td>

                    {/* Komoditas */}
                    <td className="py-3.5 px-4 font-poppins font-bold text-gray-800">
                      {item.komoditas}
                    </td>

                    {/* Jumlah Kg */}
                    <td className="py-3.5 px-4 text-right font-poppins font-bold text-[#1c4234]">
                      {formatNumber(item.jumlahKg)} <span className="text-xs font-normal text-gray-500">kg</span>
                    </td>

                    {/* Pengelolaan: Organik / Konversi / Non-Organik */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {item.pengelolaan === 'Organik' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-poppins font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <Sprout className="w-3 h-3 text-emerald-700" />
                          Organik
                        </span>
                      )}
                      {item.pengelolaan === 'Konversi' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-poppins font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          Konversi
                        </span>
                      )}
                      {item.pengelolaan === 'Non-Organik' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-poppins font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                          Non-Organik
                        </span>
                      )}
                    </td>

                    {/* Masa Tanam */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-poppins font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {item.masaTanam || 'MT 01'}
                      </span>
                    </td>

                    {/* Catatan */}
                    <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate" title={item.catatan}>
                      {item.catatan || '-'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Catatan Panen"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Hapus Data Panen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-[#1c4234] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#95d5b2]" />
                <h3 className="font-poppins font-bold text-lg">Edit Data Panen Petani</h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              
              {/* Petani */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Nama Petani</label>
                <input
                  type="text"
                  required
                  value={editForm.petaniNama}
                  onChange={(e) => setEditForm(prev => ({ ...prev, petaniNama: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                />
              </div>

              {/* Komoditas & Jumlah */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-poppins font-bold uppercase text-gray-700">Komoditas</label>
                  <select
                    value={editForm.komoditas}
                    onChange={(e) => setEditForm(prev => ({ ...prev, komoditas: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Padi">Padi</option>
                    <option value="Jagung">Jagung</option>
                    <option value="Kedelai">Kedelai</option>
                    <option value="Kacang Hijau">Kacang Hijau</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-poppins font-bold uppercase text-gray-700">Jumlah (Kg)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editForm.jumlahKg}
                    onChange={(e) => setEditForm(prev => ({ ...prev, jumlahKg: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#1c4234] focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Pengelolaan & Masa Tanam */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-poppins font-bold uppercase text-gray-700">Jenis Pengelolaan</label>
                  <select
                    value={editForm.pengelolaan}
                    onChange={(e) => setEditForm(prev => ({ ...prev, pengelolaan: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Organik">Organik</option>
                    <option value="Konversi">Konversi</option>
                    <option value="Non-Organik">Non-Organik</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-poppins font-bold uppercase text-gray-700">Masa Tanam</label>
                  <select
                    value={editForm.masaTanam}
                    onChange={(e) => setEditForm(prev => ({ ...prev, masaTanam: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden cursor-pointer"
                  >
                    <option value="MT 01">MT 01 (Okt - Jan)</option>
                    <option value="MT 02">MT 02 (Feb - Mei)</option>
                    <option value="MT 03">MT 03 (Juni - Sept)</option>
                  </select>
                </div>
              </div>

              {/* Tanggal */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Tanggal Panen</label>
                <input
                  type="date"
                  required
                  value={editForm.tanggal}
                  onChange={(e) => setEditForm(prev => ({ ...prev, tanggal: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                />
              </div>

              {/* Catatan */}
              <div className="space-y-1">
                <label className="text-xs font-poppins font-bold uppercase text-gray-700">Catatan</label>
                <input
                  type="text"
                  value={editForm.catatan}
                  onChange={(e) => setEditForm(prev => ({ ...prev, catatan: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-poppins font-semibold text-xs hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1c4234] hover:bg-[#0a1f14] text-white font-poppins font-bold text-xs shadow-md cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-gray-900 text-lg">Hapus Catatan Panen?</h3>
              <p className="text-xs text-gray-600 font-manrope">
                Data transaksi panen ini akan dihapus dari sistem dan perhitungan stok gabah akan disesuaikan.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="w-1/2 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-poppins font-semibold text-xs hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-poppins font-bold text-xs shadow-md cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
