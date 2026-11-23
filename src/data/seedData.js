// src/data/seedData.js
// Data real (non‑dummy) for the Kelompok Tani Marsudi Among Tani

// ---- Import product images (place these files in src/assets/products/) ----
import berasImg from '../assets/products/Beras Organik.jpeg';
import jagungImg from '../assets/products/Jagung.jpeg';
import kedelaiImg from '../assets/products/Kedelai.jpeg';
import kacangHijauImg from '../assets/products/Kacang Hijau.jpeg';
import logoImg from '../assets/logo/Logo Desa.jpeg';

export const LOGO = logoImg;

export const DESA_INFO = {
  namaKelompok: 'Marsudi Among Tani',
  namaDesa: 'Desa Dawuhan',
  kecamatan: 'Kecamatan Banyumas',
  kabupaten: 'Kabupaten Banyumas',
  provinsi: 'Jawa Tengah',
  kodePos: '53192',
  kepalaDesa: 'Bapak Ruswanto',
  tahunBerdiri: 'Agustus 1979',
  badanHukum: 'AHU-0058238.AH.01.07. TAHUN 2016 (Kemenkumham RI)',
  nomorRegistrasi: '33.02.110.011.1.01',
  kelasKelompok: 'Madya',
  sertifikatHalal: 'ID33110018130760524-DINKOP PROV',
  jumlahAnggota: '148 Petani (116 Laki-Laki, 32 Perempuan)',
  petaniOrganikBersertifikat: '12 Petani (2.76 Ha Bersertifikat)',
  luasLahanBinaan: '20.0 Hektar',
  ketua: 'Pak Slamet',
  sekretaris1: 'Pak Sutomo',
  sekretaris2: 'Pak Sukirno',
  bendahara: 'Pak Purwadi Paiman',
  primaryWA: '+62 813-2738-7302',
  adminWAs: [
    { name: 'Admin 1', number: '+62 821-3594-2461' },
    { name: 'Admin 2', number: '+62 853-2665-3761' },
  ],
  teleponDisplay: '+62 813-2738-7302',
  email: 'marsudiamongtani@gmail.com',
  emailDesa: 'siddawuhanbanyumas@gmail.com',
  websiteDesa: 'https://dawuhan-bms.desa.id',
  alamatSekretariat: 'Jalan Pesarehan Adipati Mrapat No 68, RT 03 / RW 02, Desa Dawuhan, Kecamatan Banyumas, Kabupaten Banyumas, Jawa Tengah 53192',
};

// ---- Product catalog (real data) ----
export const PRODUCTS = [
  {
    id: 'padi',
    nama: 'Beras Organik Ciherang',
    gambar: berasImg,
    harga: 25000,
    stok: 1200,
    pengelolaan: 'Organik',
    deskripsi: 'Beras organik varietas Ciherang, bersertifikat halal, dipanen secara organik di lahan Dawuhan.',
  },
  {
    id: 'jagung',
    nama: 'Jagung Pipil Kering Hibrida',
    gambar: jagungImg,
    harga: 19000,
    stok: 850,
    pengelolaan: 'Konversi',
    deskripsi: 'Jagung pipil kering hibrida, diproduksi pada masa transisi ke organik (MT 03).',
  },
  {
    id: 'kedelai',
    nama: 'Kedelai Kuning Anjasmoro',
    gambar: kedelaiImg,
    harga: 21000,
    stok: 600,
    pengelolaan: 'Organik',
    deskripsi: 'Kedelai varietas Anjasmoro, diproduksi pada MT 03 dengan praktik organik bersertifikat.',
  },
  {
    id: 'kacang_hijau',
    nama: 'Kacang Hijau Vima Unggul',
    gambar: kacangHijauImg,
    harga: 18000,
    stok: 400,
    pengelolaan: 'Organik',
    deskripsi: 'Kacang hijau varietas Vima unggul, dibudidayakan secara organik pada MT 03.',
  },
];

// ---- Masa Tanam (MT) cycle ----
export const MT_CYCLE = [
  {
    kode: 'MT 01',
    periode: 'Oktober - Januari',
    namaMusim: 'Musim Rendeng',
    fokus: 'Padi Organik Utama',
    deskripsi: 'Hujan musiman, lahan utama untuk padi organik.',
  },
  {
    kode: 'MT 02',
    periode: 'Februari - Mei',
    namaMusim: 'Musim Gadu',
    fokus: 'Padi Lanjutan & Palawija',
    deskripsi: 'Masa peralihan, penanaman padi lanjutan serta palawija.',
  },
  {
    kode: 'MT 03',
    periode: 'Juni - September',
    namaMusim: 'Musim Kemarau',
    fokus: 'Rotasi Kedelai, Kacang Hijau, & Jagung',
    deskripsi: 'Musim kemarau, rotasi tanaman penghasil protein.',
  },
];

// ---- Sample farmers (used in admin input) ----
export const FARMERS = [
  { id: 'farmer-1', nama: 'Pak Slamet', dusun: 'Blimbing' },
  { id: 'farmer-2', nama: 'Bu Sari', dusun: 'Kalibening' },
  { id: 'farmer-3', nama: 'Pak Wagiman', dusun: 'Sawah Lor' },
  { id: 'farmer-4', nama: 'Pak Yatiman', dusun: 'Blimbing' },
  { id: 'farmer-5', nama: 'Bu Mahyuni', dusun: 'Kedung' },
];

// ---- Initial harvest & sales data (empty – will be filled via admin input / Excel) ----
export const INITIAL_HARVESTS = [];
export const INITIAL_SALES = [];
