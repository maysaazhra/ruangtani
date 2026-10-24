import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wheat, Lock, User, Eye, EyeOff, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminLoginPage = () => {
  const { login, navigateTo } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      if (!res.success) {
        setErrorMsg(res.message);
        setIsLoading(false);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-950 flex flex-col justify-center items-center p-4 sm:p-6 relative">
      
      {/* Return to Public Website Button */}
      <button
        onClick={() => navigateTo('home')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-green-200 hover:text-white bg-green-900/60 hover:bg-green-800/80 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all border border-green-700/50 backdrop-blur-xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda Publik</span>
      </button>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Card Header */}
        <div className="bg-gradient-to-r from-green-800 to-green-900 p-8 text-center text-white relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-700 to-emerald-500 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/40 mb-3 border border-green-600">
            <Wheat className="w-9 h-9 text-amber-300" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Login Petugas Admin</h2>
          <p className="text-xs text-green-200 mt-1 font-medium">
            Kelompok Tani Marsudi Among Tani Desa Dawuhan
          </p>
        </div>

        {/* Card Body */}
        <div className="p-8 space-y-6">
          
          {/* Error Notice */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-shake">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username admin"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-900 text-base font-medium focus:ring-2 focus:ring-green-700 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-900 text-base font-medium focus:ring-2 focus:ring-green-700 focus:outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label="Tampilkan sandi"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-800 hover:bg-green-700 active:scale-98 text-white font-extrabold py-4 px-6 rounded-2xl text-base transition-all shadow-lg shadow-green-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Lock className="w-5 h-5" />
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard Admin'}</span>
            </button>
          </form>

          {/* Demo Helper Box */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 text-xs text-emerald-950 space-y-2">
            <div className="font-bold flex items-center justify-between">
              <span>Akun Demo Akses Pengurus:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-green-800 underline hover:text-green-950 font-extrabold cursor-pointer"
              >
                Isi Otomatis
              </button>
            </div>
            <div className="text-gray-600 font-mono text-[11px] space-y-0.5">
              <div>Username: <span className="font-bold text-gray-900">admin</span></div>
              <div>Password: <span className="font-bold text-gray-900">admin123</span></div>
            </div>
          </div>

        </div>

      </div>

      {/* Security footnote */}
      <div className="text-center text-xs text-green-300/70 mt-6 max-w-sm">
        Sistem Informasi Kelembagaan Desa Dawuhan • Akses Terenkripsi
      </div>

    </div>
  );
};
