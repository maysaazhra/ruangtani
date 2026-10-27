import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldAlert, Sprout } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0a1f14] flex flex-col justify-center items-center p-4 sm:p-6 relative font-manrope">
      
      {/* Return to Public Website Button */}
      <button
        onClick={() => navigateTo('home')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-poppins font-medium transition-all border border-white/15 backdrop-blur-md cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Beranda</span>
      </button>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Card Header */}
        <div className="bg-[#1c4234] p-8 text-center text-white relative">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sprout className="w-6 h-6 text-[#95d5b2]" />
            </div>
            <span className="font-poppins font-bold text-2xl text-white tracking-tight">
              Ruang<span className="text-[#95d5b2]">Tani</span>
            </span>
          </div>

          <h2 className="text-xl font-poppins font-bold tracking-tight">Login Operator Admin</h2>
          <p className="text-xs text-[#95d5b2] mt-1 font-manrope font-medium">
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
              <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-gray-700">
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-900 text-sm font-medium focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-gray-700">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-900 text-sm font-medium focus:ring-2 focus:ring-[#1c4234] focus:outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label="Tampilkan sandi"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button (Orbitani Pill) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1c4234] hover:bg-[#0a1f14] active:scale-98 text-white font-poppins font-bold py-3.5 px-6 rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Lock className="w-4 h-4 text-[#95d5b2]" />
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
            </button>
          </form>

          {/* Demo Helper Box */}
          <div className="bg-[#f0fdf4] rounded-2xl p-4 border border-[#dbf0e3] text-xs text-[#1c4234] space-y-2">
            <div className="font-poppins font-bold flex items-center justify-between">
              <span>Akun Demo Akses Operator:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[#1c4234] underline hover:text-[#0a1f14] font-extrabold cursor-pointer"
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
      <div className="text-center text-xs text-white/50 mt-6 max-w-sm font-manrope">
        Sistem Informasi Kelompok Tani Marsudi Among Tani Desa Dawuhan
      </div>

    </div>
  );
};
