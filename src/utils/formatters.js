// Helper formatters for Indonesian Locale

export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};

export const formatDateIndo = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const getMonthName = (monthNumber) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return months[parseInt(monthNumber, 10) - 1] || '';
};

/**
 * Menghitung Masa Tanam (MT) berdasarkan tanggal atau bulan:
 * MT 01: Oktober - Januari (Musim Rendeng)
 * MT 02: Februari - Mei (Musim Gadu)
 * MT 03: Juni - September (Musim Kemarau / Palawija)
 */
export const getMasaTanamFromDate = (dateString) => {
  if (!dateString) return 'MT 01';
  let month = 10;
  if (typeof dateString === 'string' && dateString.includes('-')) {
    const parts = dateString.split('-');
    month = parseInt(parts[1], 10);
  } else {
    month = parseInt(dateString, 10);
  }

  if (month === 10 || month === 11 || month === 12 || month === 1) {
    return 'MT 01';
  } else if (month >= 2 && month <= 5) {
    return 'MT 02';
  } else if (month >= 6 && month <= 9) {
    return 'MT 03';
  }
  return 'MT 01';
};

export const getMasaTanamFullLabel = (mtCode) => {
  switch (mtCode) {
    case 'MT 01':
      return 'MT 01 (Okt - Jan)';
    case 'MT 02':
      return 'MT 02 (Feb - Mei)';
    case 'MT 03':
      return 'MT 03 (Juni - Sept)';
    default:
      return mtCode || 'MT 01 (Okt - Jan)';
  }
};
