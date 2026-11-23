export const INITIAL_PRODUCTS = [
  {
    id: 'prod-padi',
    nama: 'Beras Organik Ciherang (Padi Pilihan)',
    kategori: 'Padi',
    komoditasKey: 'Padi',
    harga: 14500,
    satuan: 'kg',
    stokAwal: 3850,
    deskripsi: 'Beras putih pulen hasil panen sawah beririgasi teknis Desa Dawuhan. Ditanam secara organik bersertifikat, bebas pestisida kimia sintetis dengan bulir utuh dan aroma alami.',
    gambar: '/beras-organik.jpeg', // <--- FOTO BARU BERAS
    keunggulan: ['Organik Bersertifikat', 'Pulen & Alami', 'Kadar Air Terjaga 14%', 'Bebas Pemutih Kimia'],
    kemasanTersedia: ['5 kg', '10 kg', '25 kg', '50 kg (Karung)']
  },
  {
    id: 'prod-jagung',
    nama: 'Jagung Pipil Kering Hibrida Unggul',
    kategori: 'Jagung',
    komoditasKey: 'Jagung',
    harga: 6200,
    satuan: 'kg',
    stokAwal: 2400,
    deskripsi: 'Jagung pipil kering berkualitas tinggi dengan kadar air rendah (<14%). Sangat cocok untuk bahan pakan ternak berkualitas maupun industri olahan pangan.',
    gambar: '/jagung.jpeg',
    keunggulan: ['Kadar Air Kering <14%', 'Bulir Emas Bersih', 'Bebas Jamur & Aflatoksin'],
    kemasanTersedia: ['25 kg', '50 kg (Karung)']
  },
  {
    id: 'prod-kedelai',
    nama: 'Kedelai Kuning Dawuhan (Anjasmoro)',
    kategori: 'Kedelai',
    komoditasKey: 'Kedelai',
    harga: 12800,
    satuan: 'kg',
    stokAwal: 1750,
    deskripsi: 'Kedelai varietas Anjasmoro dengan biji besar kekuningan yang kaya protein nabati. Menjadi komoditas berprestasi Juara 1 Tingkat Kabupaten Banyumas & Juara 2 Tingkat Provinsi Jawa Tengah.',
    gambar: '/kedelai.jpeg',
    keunggulan: ['Biji Besar Padat', 'Juara Komoditas Provinsi', 'Kadar Protein Tinggi', 'Rendemen Tempe Optimal'],
    kemasanTersedia: ['10 kg', '25 kg', '50 kg']
  },
  {
    id: 'prod-kacang-hijau',
    nama: 'Kacang Hijau Varietas Vima Unggul Dawuhan',
    kategori: 'Kacang Hijau',
    komoditasKey: 'Kacang Hijau',
    harga: 18500,
    satuan: 'kg',
    stokAwal: 950,
    deskripsi: 'Kacang hijau varietas Vima bermutu tinggi hasil panen musim palawija Desa Dawuhan. Biji bernas berkilau, kadar air rendah, cepat empuk saat diolah, serta kaya serat dan antioksidan.',
    gambar: '/kacang-hijau.jpeg',
    keunggulan: ['Bulir Bernas & Berkilau', 'Cepat Empuk Saat Dimasak', 'Tinggi Serat & Zat Besi', 'Bebas Kutu & Pengawet'],
    kemasanTersedia: ['1 kg', '5 kg', '25 kg (Karung)']
  }
];

export const INITIAL_FARMERS = [
  { id: 'petani-1', nama: 'Pak Slamet', dusun: 'Blok Krikil & Wungu (RT 02 / RW 01)', luasLahan: '0.14 Ha', jenisDefault: 'Organik', jabatan: 'Ketua Kelompok Tani' },
  { id: 'petani-2', nama: 'Pak Purwadi Paiman', dusun: 'Blok Krikil (KR-11, KR-23, KR-7)', luasLahan: '0.50 Ha', jenisDefault: 'Organik', jabatan: 'Bendahara' },
  { id: 'petani-3', nama: 'Pak Sukirno', dusun: 'Blok Krikil (KR-03)', luasLahan: '0.32 Ha', jenisDefault: 'Organik', jabatan: 'Sekretaris' },
  { id: 'petani-4', nama: 'Pak Suwarman', dusun: 'Blok Krikil (KR-12)', luasLahan: '0.53 Ha', jenisDefault: 'Organik', jabatan: 'Ketua Blok Krikil' },
  { id: 'petani-5', nama: 'Pak Karsono', dusun: 'Blok Blimbing & Krikil', luasLahan: '0.50 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-6', nama: 'Pak Yatiman', dusun: 'Blok Blimbing (BL-04)', luasLahan: '0.14 Ha', jenisDefault: 'Organik', jabatan: 'Ketua Blok Blimbing' },
  { id: 'petani-7', nama: 'Pak Taslim Miharjo', dusun: 'Blok Jembangan (JB-10)', luasLahan: '0.14 Ha', jenisDefault: 'Organik', jabatan: 'Ketua Blok Jembangan' },
  { id: 'petani-8', nama: 'Pak Sanadi', dusun: 'Blok Krikil (KR-22)', luasLahan: '0.14 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-9', nama: 'Pak Timan Muhajir', dusun: 'Blok Krikil (KR-25)', luasLahan: '0.18 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-10', nama: 'Pak Tisun Sayekti', dusun: 'Blok Krikil (KR-29)', luasLahan: '0.14 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-11', nama: 'Bu Aminah', dusun: 'Blok Wungu (WG-01)', luasLahan: '0.14 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-12', nama: 'Pak Rusdiarjo Siwan', dusun: 'Blok Krikil & Wungu', luasLahan: '0.31 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-13', nama: 'Pak Agung Triyatno', dusun: 'Blok Wungu (WG-06)', luasLahan: '0.08 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-14', nama: 'Bu Etti Puji Rahayu', dusun: 'Blok Jembangan (JB-09)', luasLahan: '0.27 Ha', jenisDefault: 'Organik', jabatan: 'Anggota' },
  { id: 'petani-15', nama: 'Pak Sukasno', dusun: 'Blok Serang (RT 01 / RW 04)', luasLahan: '0.45 Ha', jenisDefault: 'Non-Organik', jabatan: 'Ketua Blok Serang' },
  { id: 'petani-16', nama: 'Pak Sutarjo', dusun: 'Blok Margono (RT 02 / RW 04)', luasLahan: '0.35 Ha', jenisDefault: 'Konversi', jabatan: 'Ketua Blok Margono' }
];

export const INITIAL_HARVESTS = [
  // --- OKTOBER 2026 ---
  { id: 'PN-202610-001', tanggal: '2026-10-24', petaniId: 'petani-1', petaniNama: 'Pak Slamet', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 01', jumlahKg: 780, catatan: 'Petak sawah Blok Krikil, bulir bernas matang merata tanpa pupuk kimia sintetis', kualitas: 'A' },
  { id: 'PN-202610-002', tanggal: '2026-10-22', petaniId: 'petani-2', petaniNama: 'Pak Purwadi Paiman', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 01', jumlahKg: 850, catatan: 'Lahan sawah KR-11, kadar air 13.8%, bersertifikat organik', kualitas: 'A' },
  { id: 'PN-202610-003', tanggal: '2026-10-20', petaniId: 'petani-15', petaniNama: 'Pak Sukasno', komoditas: 'Jagung', pengelolaan: 'Non-Organik', masaTanam: 'MT 01', jumlahKg: 620, catatan: 'Blok Serang, jagung hibrida pipilan kering penjemuran 3 hari', kualitas: 'B' },
  { id: 'PN-202610-004', tanggal: '2026-10-18', petaniId: 'petani-16', petaniNama: 'Pak Sutarjo', komoditas: 'Kedelai', pengelolaan: 'Konversi', masaTanam: 'MT 01', jumlahKg: 420, catatan: 'Blok Margono, masa transisi pemupukan kompos bokashi alami', kualitas: 'B' },
  { id: 'PN-202610-005', tanggal: '2026-10-16', petaniId: 'petani-4', petaniNama: 'Pak Suwarman', komoditas: 'Kacang Hijau', pengelolaan: 'Organik', masaTanam: 'MT 01', jumlahKg: 340, catatan: 'Varietas Vima unggul, biji hijau berkilau siap pasokan lumbung', kualitas: 'A' },
  { id: 'PN-202610-006', tanggal: '2026-10-14', petaniId: 'petani-3', petaniNama: 'Pak Sukirno', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 01', jumlahKg: 720, catatan: 'Lahan KR-03, pemupukan organik teratur sesuai jadwal SOP', kualitas: 'A' },
  { id: 'PN-202610-007', tanggal: '2026-10-11', petaniId: 'petani-6', petaniNama: 'Pak Yatiman', komoditas: 'Kacang Hijau', pengelolaan: 'Organik', masaTanam: 'MT 01', jumlahKg: 280, catatan: 'Blok Blimbing, hasil tumpang sari ramah lingkungan', kualitas: 'A' },
  { id: 'PN-202610-008', tanggal: '2026-10-07', petaniId: 'petani-7', petaniNama: 'Pak Taslim Miharjo', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 01', jumlahKg: 640, catatan: 'Blok Jembangan JB-10, kualitas bulir murni Ciherang', kualitas: 'A' },
  { id: 'PN-202610-009', tanggal: '2026-10-04', petaniId: 'petani-11', petaniNama: 'Bu Aminah', komoditas: 'Kedelai', pengelolaan: 'Organik', masaTanam: 'MT 01', jumlahKg: 390, catatan: 'Blok Wungu WG-01, biji kuning besar pilihan Anjasmoro', kualitas: 'A' },
  // --- SEPTEMBER 2026 ---
  { id: 'PN-202609-001', tanggal: '2026-09-28', petaniId: 'petani-1', petaniNama: 'Pak Slamet', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 910, catatan: 'Panen musim kemarau beririgasi ulu-ulu Dawuhan teratur', kualitas: 'A' },
  { id: 'PN-202609-002', tanggal: '2026-09-24', petaniId: 'petani-15', petaniNama: 'Pak Sukasno', komoditas: 'Jagung', pengelolaan: 'Non-Organik', masaTanam: 'MT 03', jumlahKg: 820, catatan: 'Kering giling sempurna, kadar air 13.5%', kualitas: 'B' },
  { id: 'PN-202609-003', tanggal: '2026-09-20', petaniId: 'petani-4', petaniNama: 'Pak Suwarman', komoditas: 'Kacang Hijau', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 410, catatan: 'Panen raya kacang hijau MT 03, kadar air rendah & bernas', kualitas: 'A' },
  { id: 'PN-202609-004', tanggal: '2026-09-17', petaniId: 'petani-2', petaniNama: 'Pak Purwadi Paiman', komoditas: 'Kedelai', pengelolaan: 'Konversi', masaTanam: 'MT 03', jumlahKg: 510, catatan: 'Lahan KR-7 masa konversi, rendemen bagus untuk tahu tempe', kualitas: 'B' },
  { id: 'PN-202609-005', tanggal: '2026-09-12', petaniId: 'petani-8', petaniNama: 'Pak Sanadi', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 760, catatan: 'Blok Krikil KR-22, padi organik berkualitas lumbung', kualitas: 'A' },
  { id: 'PN-202609-006', tanggal: '2026-09-08', petaniId: 'petani-14', petaniNama: 'Bu Etti Puji Rahayu', komoditas: 'Kacang Hijau', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 310, catatan: 'Kacang hijau organik tanpa pestisida kimia sintetis', kualitas: 'A' },
  // --- AGUSTUS 2026 ---
  { id: 'PN-202608-001', tanggal: '2026-08-28', petaniId: 'petani-1', petaniNama: 'Pak Slamet', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 870, catatan: 'Pemberian pupuk bokashi dan ecoenzym kelompok berhasil optimal', kualitas: 'A' },
  { id: 'PN-202608-002', tanggal: '2026-08-22', petaniId: 'petani-9', petaniNama: 'Pak Timan Muhajir', komoditas: 'Kedelai', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 490, catatan: 'Kedelai kuning organik berpredikat unggulan daerah', kualitas: 'A' },
  { id: 'PN-202608-003', tanggal: '2026-08-18', petaniId: 'petani-12', petaniNama: 'Pak Rusdiarjo Siwan', komoditas: 'Kacang Hijau', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 350, catatan: 'Varietas Vima hasil panen serempak anggota kelompok', kualitas: 'A' },
  { id: 'PN-202608-004', tanggal: '2026-08-14', petaniId: 'petani-15', petaniNama: 'Pak Sukasno', komoditas: 'Jagung', pengelolaan: 'Non-Organik', masaTanam: 'MT 03', jumlahKg: 710, catatan: 'Pipilan bersih perontok mekanis traktor kelompok', kualitas: 'B' },
  { id: 'PN-202608-005', tanggal: '2026-08-09', petaniId: 'petani-16', petaniNama: 'Pak Sutarjo', komoditas: 'Kedelai', pengelolaan: 'Konversi', masaTanam: 'MT 03', jumlahKg: 440, catatan: 'Sortir biji pilihan perajin mendoan khas Banyumas', kualitas: 'B' },
  { id: 'PN-202608-006', tanggal: '2026-08-04', petaniId: 'petani-10', petaniNama: 'Pak Tisun Sayekti', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 03', jumlahKg: 680, catatan: 'Pengeringan lantai jemur swadaya lumbung kelompok', kualitas: 'A' },
  // --- MEI 2026 ---
  { id: 'PN-202605-001', tanggal: '2026-05-26', petaniId: 'petani-1', petaniNama: 'Pak Slamet', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 02', jumlahKg: 950, catatan: 'Panen gadu MT 02, irigasi teknis teratur dari Bendung Krikil', kualitas: 'A' },
  { id: 'PN-202605-002', tanggal: '2026-05-20', petaniId: 'petani-2', petaniNama: 'Pak Purwadi Paiman', komoditas: 'Padi', pengelolaan: 'Organik', masaTanam: 'MT 02', jumlahKg: 890, catatan: 'Beras Ciherang organik murni tanpa pestisida', kualitas: 'A' },
  { id: 'PN-202605-003', tanggal: '2026-05-15', petaniId: 'petani-4', petaniNama: 'Pak Suwarman', komoditas: 'Kedelai', pengelolaan: 'Organik', masaTanam: 'MT 02', jumlahKg: 520, catatan: 'Panen selingan palawija akhir musim gadu MT 02', kualitas: 'A' },
  { id: 'PN-202605-004', tanggal: '2026-05-10', petaniId: 'petani-13', petaniNama: 'Pak Agung Triyatno', komoditas: 'Kacang Hijau', pengelolaan: 'Organik', masaTanam: 'MT 02', jumlahKg: 360, catatan: 'Kacang hijau bernas varietas unggul', kualitas: 'A' }
];

export const INITIAL_SALES = [
  // --- OKTOBER 2026 ---
  { id: 'JL-202610-001', tanggal: '2026-10-23', komoditas: 'Padi', jumlahKg: 1200, pembeli: 'Koperasi Pertanian Tri Mulya Banyumas', hargaPerKg: 14500, totalNilai: 17400000, status: 'Lunas' },
  { id: 'JL-202610-002', tanggal: '2026-10-19', komoditas: 'Kedelai', jumlahKg: 500, pembeli: 'Pabrik Tahu Pak Tardi Sokaraja', hargaPerKg: 12800, totalNilai: 6400000, status: 'Lunas' },
  { id: 'JL-202610-003', tanggal: '2026-10-15', komoditas: 'Kacang Hijau', jumlahKg: 300, pembeli: 'Sentra Oleh-Oleh & Bakpia Banyumas', hargaPerKg: 18500, totalNilai: 5550000, status: 'Lunas' },
  { id: 'JL-202610-004', tanggal: '2026-10-12', komoditas: 'Jagung', jumlahKg: 800, pembeli: 'Sentra Pakan Unggas Dawuhan Makmur', hargaPerKg: 6200, totalNilai: 4960000, status: 'Lunas' },
  // --- SEPTEMBER 2026 ---
  { id: 'JL-202609-001', tanggal: '2026-09-26', komoditas: 'Padi', jumlahKg: 1800, pembeli: 'Perum Bulog Subdivre Banyumas', hargaPerKg: 14200, totalNilai: 25560000, status: 'Lunas' },
  { id: 'JL-202609-002', tanggal: '2026-09-19', komoditas: 'Kacang Hijau', jumlahKg: 350, pembeli: 'Industri Minuman Sari Kacang Hijau Alami', hargaPerKg: 18200, totalNilai: 6370000, status: 'Lunas' },
  { id: 'JL-202609-003', tanggal: '2026-09-15', komoditas: 'Jagung', jumlahKg: 1100, pembeli: 'Kemitraan Peternak Ayam Broiler Kalisube', hargaPerKg: 6100, totalNilai: 6710000, status: 'Lunas' },
  { id: 'JL-202609-004', tanggal: '2026-09-10', komoditas: 'Kedelai', jumlahKg: 400, pembeli: 'Pengrajin Tempe Mendoan Dawuhan', hargaPerKg: 12700, totalNilai: 5080000, status: 'Lunas' },
  // --- AGUSTUS 2026 ---
  { id: 'JL-202608-001', tanggal: '2026-08-27', komoditas: 'Padi', jumlahKg: 1600, pembeli: 'Distributor Beras Sejahtera Purwokerto', hargaPerKg: 14000, totalNilai: 22400000, status: 'Lunas' },
  { id: 'JL-202608-002', tanggal: '2026-08-18', komoditas: 'Jagung', jumlahKg: 950, pembeli: 'Grosir Pakan Ternak Barokah Banyumas', hargaPerKg: 6000, totalNilai: 5700000, status: 'Lunas' },
  { id: 'JL-202608-003', tanggal: '2026-08-12', komoditas: 'Kacang Hijau', jumlahKg: 250, pembeli: 'Koperasi Kuliner Tradisional Dawuhan', hargaPerKg: 18000, totalNilai: 4500000, status: 'Lunas' }
];

export const DESA_DAWUHAN_INFO = {
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

  profilDesa: `Desa Dawuhan berada sekitar 5 km di sebelah barat alun-alun Kota Banyumas, terletak di wilayah Kecamatan Banyumas, Kabupaten Banyumas, Jawa Tengah. Nama Dawuhan berasal dari kata "dawuan" dalam bahasa Sunda yang berarti tempat mengatur aliran air ke sawah dan ladang (irigasi pertanian), yang berkembang menjadi "Dawuhan" seiring bercampurnya budaya luhur Jawa dan Sunda di daerah ini. Selain itu, nama ini lekat dengan dawuh (perintah) pendiri Banyumas, Adipati Mrapat (Raden Djoko Kahiman), yang menjadikan desa ini sebagai kompleks pemakaman Bupati Banyumas pertama (Pesarehan Adipati Mrapat No 68).

Dipimpin oleh Kepala Desa Bapak Ruswanto, Desa Dawuhan merupakan kawasan agraris subur sekaligus lumbung pangan dan desa wisata budaya-religi terkemuka. Lahan persawahan Dawuhan dialiri sistem irigasi teknis dari Bendung Gombyang, Bendung Krikil, dan Bendung Dukuh, menghasilkan komoditas tanaman pangan berkelas: Padi sawah organik Ciherang & Mentik Wangi, Jagung hibrida, Kedelai Anjasmoro, dan Kacang Hijau Vima unggul.`,

  sejarahKelompok: `Kelompok Tani "Marsudi Among Tani" resmi didirikan di Dawuhan pada bulan Agustus 1979 dan telah berbadan hukum resmi dari Kementerian Hukum dan HAM RI Nomor AHU-0058238.AH.01.07. TAHUN 2016 serta memiliki Sertifikat Halal ID33110018130760524-DINKOP PROV dan NIB resmi.

Nama "Marsudi Among Tani" diambil dari falsafah luhur: "Marsudi" bermakna ikhtiar sungguh-sungguh dengan ketulusan hati, dan "Among Tani" bermakna memelihara profesi petani serta merawat kesuburan bumi pertiwi.

Kelompok ini membina hamparan lahan seluas 20 hektar yang terbagi dalam 6 blok persawahan produktif:
1. Blok Blimbing (1.74 Ha, Ketua Blok: Pak Yatiman)
2. Blok Serang (3.74 Ha, Ketua Blok: Pak Sukasno)
3. Blok Wungu (2.87 Ha, Ketua Blok: Pak Suwarman)
4. Blok Krikil (7.20 Ha, Ketua Blok: Pak Suwarman)
5. Blok Jembangan (3.03 Ha, Ketua Blok: Pak Taslim Miharjo)
6. Blok Margono (1.42 Ha, Ketua Blok: Pak Sutarjo)

Dengan keanggotaan 148 orang (116 laki-laki, 32 perempuan), kelompok ini menjadi pelopor Pertanian Organik bersertifikat di Kabupaten Banyumas yang diserahkan langsung oleh Bupati Banyumas bersama Kepala Dinas Pertanian dan Ketahanan Pangan. Melalui aplikasi RuangTani, kelompok menerapkan transparansi data digital untuk 3 Masa Tanam (MT 01, MT 02, MT 03) dan klasifikasi budidaya Organik, Non-Organik, serta Konversi.`,

  polaMasaTanam: [
    { kode: 'MT 01', periode: 'Oktober - Januari', namaMusim: 'Musim Rendeng', fokus: 'Padi Sawah Organik Utama & Palawija Awal' },
    { kode: 'MT 02', periode: 'Februari - Mei', namaMusim: 'Musim Gadu', fokus: 'Padi Sawah Lanjutan, Palawija & Jagung' },
    { kode: 'MT 03', periode: 'Juni - September', namaMusim: 'Musim Kemarau / Palawija', fokus: 'Kedelai Unggul Anjasmoro, Kacang Hijau Vima & Jagung' }
  ],

  prestasi: [
    { tahun: '2016', predikat: 'Juara 2 Lomba Cerdas Cermat Pertanian Tingkat Kecamatan Banyumas' },
    { tahun: '2018', predikat: 'Juara 1 Lomba Komoditas Kedelai Tingkat Kabupaten Banyumas' },
    { tahun: '2019', predikat: 'Juara 2 Lomba Komoditas Kedelai Tingkat Provinsi Jawa Tengah' },
    { tahun: '2020', predikat: 'Rangking Pertama Lomba Pertanian Berkelanjutan Tingkat Provinsi' },
    { tahun: '2024', predikat: 'Sertifikasi Halal Beras Organik ID33110018130760524-DINKOP PROV' }
  ],

  strukturOrganisasi: [
    { jabatan: 'Pelindung & Pembina', nama: 'Bapak Ruswanto', periode: 'Kepala Desa Dawuhan', peran: 'Kebijakan Umum Pemdes' },
    { jabatan: 'Penasehat', nama: 'Pak Saridjo', periode: 'Ketua Gapoktan', peran: 'Pembina Teknis Pertanian' },
    { jabatan: 'Ketua Kelompok Tani', nama: 'Pak Slamet', periode: '2015 - Sekarang', peran: 'Penanggung Jawab Kelompok & Manajemen' },
    { jabatan: 'Sekretaris 1 & 2', nama: 'Pak Sutomo & Pak Sukirno', periode: '2015 - Sekarang', peran: 'Administrasi, Buku Induk & Data Panen' },
    { jabatan: 'Bendahara', nama: 'Pak Purwadi Paiman', periode: '2015 - Sekarang', peran: 'Pengelolaan Keuangan & Kas Lumbung' },
    { jabatan: 'Seksi Pengolahan Tanah', nama: 'Pak Taslim Miharjo', periode: '2015 - Sekarang', peran: 'Koordinator Alsintan Traktor' },
    { jabatan: 'Seksi Pengairan (Ulu-Ulu)', nama: 'Pak Sutarjo', periode: '2015 - Sekarang', peran: 'Distribusi Saluran Irigasi 3 Bendung' },
    { jabatan: 'Seksi Hama & Penyakit (HPT)', nama: 'Pak Sutiyarso', periode: '2015 - Sekarang', peran: 'Pengendalian Hama & Agens Hayati' },
    { jabatan: 'Seksi Panen & Pasca Panen', nama: 'Pak Sukasno', periode: '2015 - Sekarang', peran: 'Uji Kadar Air & Gudang Lumbung' },
    { jabatan: 'Seksi Informasi & IT / Humas', nama: 'Pak Sutrimo', periode: '2015 - Sekarang', peran: 'Sistem Informasi Digital RuangTani' }
  ]
};