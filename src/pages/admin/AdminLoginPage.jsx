import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const AdminLoginPage = () => {
  const { login, navigateTo } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Memanggil fungsi login dari AppContext
    const result = login(username, password);

    if (!result.success) {
      setError(result.message || 'Username atau Password salah!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] flex flex-col justify-center items-center p-4 sm:p-8 font-manrope">

      {/* Kartu Login */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

        {/* Header Kartu (Hijau) */}
        <div className="bg-[#1c4234] p-8 text-center relative">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl p-1 shadow-sm">
              <img
                src="/logo-desa.jpeg"
                alt="Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-poppins font-bold text-white tracking-tight">
              Ruang<span className="text-[#95d5b2]">Tani</span>
            </h1>
          </div>
          <h2 className="text-xl font-poppins font-bold text-white mb-1">Login Operator Admin</h2>
          <p className="text-xs text-[#95d5b2]">Kelompok Tani Marsudi Among Tani Desa Dawuhan</p>
        </div>

        {/* Form Login */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Input Username */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1c4234] uppercase tracking-wide">
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-none transition-all"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1c4234] uppercase tracking-wide">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#1c4234] focus:outline-none transition-all"
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#1c4234] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Pesan Error (Jika ada) */}
            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full bg-[#1c4234] hover:bg-[#0a1f14] text-white font-poppins font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <ShieldCheck className="w-5 h-5 text-[#95d5b2]" />
              Masuk ke Dashboard
            </button>
          </form>

          {/* Garis Pemisah & Tombol Kembali */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-sm text-gray-500 hover:text-[#1c4234] font-medium transition-colors"
            >
              &larr; Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-8 text-xs text-gray-400 text-center font-manrope">
        Sistem Informasi Kelompok Tani Marsudi Among Tani Desa Dawuhan<br />
        &copy; {new Date().getFullYear()} Hak Cipta Dilindungi.
      </p>
    </div>
  );
};