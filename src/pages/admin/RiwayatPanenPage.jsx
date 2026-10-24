import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatNumber, formatDateIndo } from '../../utils/formatters';
import { 
  History, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  Wheat, 
  Calendar, 
  X, 
  Check, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

export const RiwayatPanenPage = () => {
  const { harvests, updateHarvest, deleteHarvest, farmers, navigateTo } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterKomoditas, setFilterKomoditas] = useState('Semua');
  const [filterKualitas, setFilterKualitas] = useState('Semua');

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    petaniNama: '',
    komoditas: 'Padi',
    jumlahKg: '',
    tanggal: '',
    kualitas: 'A',
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
    const matchesKualitas = filterKualitas === 'Semua' || item.kualitas === filterKualitas;

    return matchesSearch && matchesKomoditas && matchesKualitas;
  });

  const totalKgFiltered = filteredData.reduce((acc, curr) => acc + (Number(curr.jumlahKg) || 0), 0);

  // Open Edit
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      petaniNama: item.petaniNama,
      komoditas: item.komoditas,
      jumlahKg: item.jumlahKg,
      tanggal: item.tanggal,
      kualitas: item.kualitas,
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full mb-1">
            <History className="w-3.5 h-3.5" />
            Manajemen Transaksi
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-green-950">
            Riwayat Pencatatan Panen
          </h1>
          <p className="text-sm text-gray-600">
            Daftar lengkap transaksi setoran gabah petani Desa Dawuhan dengan kontrol edit dan hapus.
          </p>
        </div>

        <button
          onClick={() => navigateTo('admin-input-panen')}
          className="bg-green-800 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Input Panen Baru</span>
        </button>
      </div>

      {/* Filter and Summary Bar */}
      <div className="bg-white rounded-3xl p-6 border border-green-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama petani, komoditas, atau catatan..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-green-700 focus:outline-hidden"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Komoditas:</span>
              <select
                value={filterKomoditas}
                onChange={(e) => setFilterKomoditas(e.target.value)}
                className="py-2.5 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-700 focus:outline-hidden cursor-pointer"
              >
                <option value="Semua">Semua Komoditas</option>
                <option value="Padi">Padi</option>
                <option value="Jagung">Jagung</option>
                <option value="Kedelai">Kedelai</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Kualitas:</span>
              <select
                value={filterKualitas}
                onChange={(e) => setFilterKualitas(e.target.value)}
                className="py-2.5 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-700 focus:outline-hidden cursor-pointer"
              >
                <option value="Semua">Semua Kualitas</option>
                <option value="A">Grade A (Super)</option>
                <option value="B">Grade B (Standar)</option>
                <option value="C">Grade C (Sortir)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Micro statistics */}
        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
          <span>Menampilkan <strong>{filteredData.length}</strong> dari <strong>{harvests.length}</strong> total data panen</span>
          <span className="font-bold text-green-900 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            Total Bobot: {formatNumber(totalKgFiltered)} Kg
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-16 text-gray-500 space-y-3">
              <History className="w-12 h-12 mx-auto text-gray-300" />
              <p className="font-bold text-base text-gray-700">Tidak ada data panen yang cocok dengan kriteria pencarian.</p>
              <button
                onClick={() => { setSearchTerm(''); setFilterKomoditas('Semua'); setFilterKualitas('Semua'); }}
                className="text-xs font-bold text-green-800 underline hover:text-green-950 cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-green-50/80 text-xs font-bold uppercase tracking-wider text-green-950 border-b border-green-100">
                <tr>
                  <th className="py-4 px-4">ID Transaksi</th>
                  <th className="py-4 px-4">Tanggal Setor</th>
                  <th className="py-4 px-4">Nama Petani</th>
                  <th className="py-4 px-4">Komoditas</th>
                  <th className="py-4 px-4 text-right">Jumlah Panen</th>
                  <th className="py-4 px-4 text-center">Kualitas</th>
                  <th className="py-4 px-4">Catatan / Lokasi</th>
                  <th className="py-4 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-green-50/40 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-gray-500">
                      {row.id}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                      {formatDateIndo(row.tanggal)}
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-900">
                      {row.petaniNama}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        row.komoditas === 'Padi'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.komoditas === 'Jagung'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-yellow-100 text-yellow-900'
                      }`}>
                        {row.komoditas}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-black text-green-900 text-base">
                      {formatNumber(row.jumlahKg)} <span className="text-xs font-semibold text-gray-500">kg</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-extrabold ${
                        row.kualitas === 'A'
                          ? 'bg-green-700 text-white'
                          : row.kualitas === 'B'
                          ? 'bg-blue-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}>
                        Grade {row.kualitas}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-600 max-w-xs truncate">
                      {row.catatan || '-'}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(row)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                          title="Edit Catatan Panen"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeletingId(row.id)}
                          className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                          title="Hapus Catatan Panen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Edit Data Panen</h3>
                  <p className="text-xs text-gray-500 font-mono">{editingItem.id}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nama Petani Penyetor
                </label>
                <select
                  value={editForm.petaniNama}
                  onChange={(e) => setEditForm({ ...editForm, petaniNama: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                >
                  {farmers.map(f => (
                    <option key={f.id} value={f.nama}>{f.nama}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Komoditas
                  </label>
                  <select
                    value={editForm.komoditas}
                    onChange={(e) => setEditForm({ ...editForm, komoditas: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  >
                    <option value="Padi">Padi</option>
                    <option value="Jagung">Jagung</option>
                    <option value="Kedelai">Kedelai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Jumlah (Kg)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editForm.jumlahKg}
                    onChange={(e) => setEditForm({ ...editForm, jumlahKg: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={editForm.tanggal}
                    onChange={(e) => setEditForm({ ...editForm, tanggal: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Kualitas
                  </label>
                  <select
                    value={editForm.kualitas}
                    onChange={(e) => setEditForm({ ...editForm, kualitas: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  >
                    <option value="A">Grade A (Super)</option>
                    <option value="B">Grade B (Standar)</option>
                    <option value="C">Grade C (Sortir)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Catatan Petak / Kondisi
                </label>
                <input
                  type="text"
                  value={editForm.catatan}
                  onChange={(e) => setEditForm({ ...editForm, catatan: e.target.value })}
                  placeholder="Catatan kondisi panen..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-md cursor-pointer"
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-rose-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-black text-gray-900">Hapus Catatan Panen?</h3>
              <p className="text-xs text-gray-600">
                Apakah Anda yakin ingin menghapus data panen <span className="font-mono font-bold text-rose-700">{deletingId}</span>? Tindakan ini akan mengupdate stok gabah di lumbung secara otomatis.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md cursor-pointer"
              >
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
