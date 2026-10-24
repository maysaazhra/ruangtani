import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminSidebar } from './components/AdminSidebar';
import { Toast } from './components/Toast';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { TentangKamiPage } from './pages/public/TentangKamiPage';
import { ProgramPage } from './pages/public/ProgramPage';
import { KatalogPage } from './pages/public/KatalogPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { InputPanenPage } from './pages/admin/InputPanenPage';
import { RiwayatPanenPage } from './pages/admin/RiwayatPanenPage';
import { StokPage } from './pages/admin/StokPage';
import { LaporanPage } from './pages/admin/LaporanPage';

const AppContent = () => {
  const { currentView, isAdmin } = useApp();

  // 1. Separate Login Page (no public navbar)
  if (currentView === 'login') {
    return (
      <main>
        <AdminLoginPage />
        <Toast />
      </main>
    );
  }

  // 2. Admin Mode Layout
  if (isAdmin && currentView.startsWith('admin-')) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex flex-col lg:flex-row">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Admin Main Content Area */}
        <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {currentView === 'admin-dashboard' && <AdminDashboard />}
            {currentView === 'admin-input-panen' && <InputPanenPage />}
            {currentView === 'admin-riwayat' && <RiwayatPanenPage />}
            {currentView === 'admin-stok' && <StokPage />}
            {currentView === 'admin-laporan' && <LaporanPage />}
          </main>
        </div>

        <Toast />
      </div>
    );
  }

  // 3. Public Mode Layout (Consistent Navbar, Main Content, Footer)
  return (
    <div className="min-h-screen bg-[#f8faf8] flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="min-h-[calc(100vh-250px)]">
          {currentView === 'home' && <HomePage />}
          {(currentView === 'tentang-desa' || currentView === 'sejarah-kelompok') && <TentangKamiPage />}
          {currentView === 'program' && <ProgramPage />}
          {currentView === 'katalog' && <KatalogPage />}
        </main>
      </div>

      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
