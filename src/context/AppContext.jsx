import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_PRODUCTS,
  INITIAL_FARMERS,
  INITIAL_HARVESTS,
  INITIAL_SALES,
  DESA_DAWUHAN_INFO
} from '../data/dummyData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation / View State
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('ruangtani_view') || 'home';
  });

  // Authentication State
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('ruangtani_isAdmin') === 'true';
  });

  // Data States with LocalStorage Persistence
  const [harvests, setHarvests] = useState(() => {
    const saved = localStorage.getItem('ruangtani_harvests');
    return saved ? JSON.parse(saved) : INITIAL_HARVESTS;
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('ruangtani_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [farmers, setFarmers] = useState(() => {
    const saved = localStorage.getItem('ruangtani_farmers');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  // Selected filter period (default to October 2026 for demo data)
  const [selectedPeriod, setSelectedPeriod] = useState({
    month: '10',
    year: '2026'
  });

  // Toast Notification State
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('ruangtani_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('ruangtani_isAdmin', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('ruangtani_harvests', JSON.stringify(harvests));
  }, [harvests]);

  useEffect(() => {
    localStorage.setItem('ruangtani_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('ruangtani_farmers', JSON.stringify(farmers));
  }, [farmers]);

  // Auth Handlers
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setCurrentView('admin-dashboard');
      showToast('Berhasil masuk ke Dashboard Admin Kelompok Tani', 'success');
      return { success: true };
    }
    return { success: false, message: 'Username atau Password salah! (Gunakan: admin / admin123)' };
  };

  const logout = () => {
    setIsAdmin(false);
    setCurrentView('home');
    showToast('Anda telah keluar dari Mode Admin', 'info');
  };

  // Safe Navigation
  const navigateTo = (view) => {
    // Restrict admin routes to logged-in admins
    if (view.startsWith('admin-') && !isAdmin) {
      setCurrentView('login');
      showToast('Silakan login terlebih dahulu untuk mengakses area Admin', 'info');
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stock Calculation per Commodity
  // Stock = Base initial + sum of all harvests - sum of all sales
  const currentStocks = useMemo(() => {
    const baseStocks = {
      Padi: 2500,
      Jagung: 1800,
      Kedelai: 1200
    };

    const stockMap = { ...baseStocks };

    harvests.forEach(h => {
      if (stockMap[h.komoditas] !== undefined) {
        stockMap[h.komoditas] += Number(h.jumlahKg) || 0;
      }
    });

    sales.forEach(s => {
      if (stockMap[s.komoditas] !== undefined) {
        stockMap[s.komoditas] -= Number(s.jumlahKg) || 0;
      }
    });

    return stockMap;
  }, [harvests, sales]);

  // Reactive Products with Real-time Stock
  const reactiveProducts = useMemo(() => {
    return INITIAL_PRODUCTS.map(prod => ({
      ...prod,
      stok: Math.max(0, currentStocks[prod.komoditasKey] || 0)
    }));
  }, [currentStocks]);

  // Add Harvest Action
  const addHarvest = (data, options = { keepOpen: false }) => {
    const now = new Date();
    const id = `PN-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-4)}`;
    
    const newEntry = {
      id,
      tanggal: data.tanggal || new Date().toISOString().split('T')[0],
      petaniId: data.petaniId || 'petani-1',
      petaniNama: data.petaniNama || 'Petani Dawuhan',
      komoditas: data.komoditas || 'Padi',
      jumlahKg: Number(data.jumlahKg) || 0,
      kualitas: data.kualitas || 'A',
      catatan: data.catatan || ''
    };

    setHarvests(prev => [newEntry, ...prev]);

    // Trigger joyful confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#166534', '#22c55e', '#eab308', '#ffffff']
      });
    } catch {
      // ignore
    }

    showToast(`Data panen ${newEntry.komoditas} (${newEntry.jumlahKg} kg) dari ${newEntry.petaniNama} berhasil dicatat!`, 'success');

    if (!options.keepOpen) {
      navigateTo('admin-riwayat');
    }
  };

  // Update Harvest
  const updateHarvest = (id, updatedData) => {
    setHarvests(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedData,
          jumlahKg: Number(updatedData.jumlahKg) || item.jumlahKg
        };
      }
      return item;
    }));
    showToast('Data panen berhasil diperbarui', 'success');
  };

  // Delete Harvest
  const deleteHarvest = (id) => {
    setHarvests(prev => prev.filter(item => item.id !== id));
    showToast('Data panen berhasil dihapus', 'info');
  };

  // Add Sale / Distribution Simulation (to test stock reduction)
  const addSale = (saleData) => {
    const now = new Date();
    const id = `JL-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-4)}`;
    const newSale = {
      id,
      tanggal: saleData.tanggal || new Date().toISOString().split('T')[0],
      komoditas: saleData.komoditas,
      jumlahKg: Number(saleData.jumlahKg) || 0,
      pembeli: saleData.pembeli || 'Pembeli Umum',
      hargaPerKg: Number(saleData.hargaPerKg) || 10000,
      totalNilai: (Number(saleData.jumlahKg) || 0) * (Number(saleData.hargaPerKg) || 10000),
      status: 'Lunas'
    };

    setSales(prev => [newSale, ...prev]);
    showToast(`Penyaluran/Penjualan ${newSale.jumlahKg} kg ${newSale.komoditas} berhasil dicatat! Stok gabah diperbarui.`, 'success');
  };

  // Delete Sale
  const deleteSale = (id) => {
    setSales(prev => prev.filter(s => s.id !== id));
    showToast('Catatan penjualan berhasil dihapus', 'info');
  };

  // Reset to Default Dummy Data
  const resetToDefault = () => {
    setHarvests(INITIAL_HARVESTS);
    setSales(INITIAL_SALES);
    setFarmers(INITIAL_FARMERS);
    localStorage.removeItem('ruangtani_harvests');
    localStorage.removeItem('ruangtani_sales');
    localStorage.removeItem('ruangtani_farmers');
    showToast('Semua data berhasil di-reset kembali ke data default simulasi', 'info');
  };

  // Summaries by Period (Month & Year)
  const getSummaryForPeriod = (month, year) => {
    const mStr = String(month).padStart(2, '0');
    const yStr = String(year);

    // Filter harvests in this period
    const periodHarvests = harvests.filter(h => {
      const [hY, hM] = h.tanggal.split('-');
      return hY === yStr && hM === mStr;
    });

    // Filter sales in this period
    const periodSales = sales.filter(s => {
      const [sY, sM] = s.tanggal.split('-');
      return sY === yStr && sM === mStr;
    });

    const totalPanen = periodHarvests.reduce((acc, curr) => acc + (Number(curr.jumlahKg) || 0), 0);
    const totalJual = periodSales.reduce((acc, curr) => acc + (Number(curr.jumlahKg) || 0), 0);
    const totalNilaiJual = periodSales.reduce((acc, curr) => acc + (Number(curr.totalNilai) || 0), 0);

    const activeFarmerIds = new Set(periodHarvests.map(h => h.petaniId || h.petaniNama));
    const petaniAktif = activeFarmerIds.size;

    // Total stock in warehouse
    const totalStokGudang = (currentStocks.Padi || 0) + (currentStocks.Jagung || 0) + (currentStocks.Kedelai || 0);

    return {
      periodHarvests,
      periodSales,
      totalPanen,
      totalJual,
      totalNilaiJual,
      stokAkhir: totalStokGudang,
      petaniAktif,
      stocks: currentStocks
    };
  };

  // Today's stats for dashboard
  const todayStats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayHarvests = harvests.filter(h => h.tanggal === todayStr);
    const totalKgToday = todayHarvests.reduce((acc, curr) => acc + (Number(curr.jumlahKg) || 0), 0);

    const [currentYear, currentMonth] = todayStr.split('-');
    const currentMonthHarvests = harvests.filter(h => {
      const [y, m] = h.tanggal.split('-');
      return y === currentYear && m === currentMonth;
    });
    const totalKgMonth = currentMonthHarvests.reduce((acc, curr) => acc + (Number(curr.jumlahKg) || 0), 0);

    return {
      todayStr,
      totalKgToday,
      todayCount: todayHarvests.length,
      totalKgMonth,
      totalPetaniAktif: farmers.length,
      totalStokGabah: (currentStocks.Padi || 0) + (currentStocks.Jagung || 0) + (currentStocks.Kedelai || 0)
    };
  }, [harvests, farmers, currentStocks]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        isAdmin,
        login,
        logout,
        harvests,
        sales,
        farmers,
        products: reactiveProducts,
        currentStocks,
        desaInfo: DESA_DAWUHAN_INFO,
        toast,
        showToast,
        selectedPeriod,
        setSelectedPeriod,
        addHarvest,
        updateHarvest,
        deleteHarvest,
        addSale,
        deleteSale,
        resetToDefault,
        getSummaryForPeriod,
        todayStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
