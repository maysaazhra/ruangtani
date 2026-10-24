// Data Dummy Awal Sistem Informasi Kelompok Tani Marsudi Among Tani Desa Dawuhan

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-padi',
    nama: 'Beras Organik Ciherang (Padi Pilihan)',
    kategori: 'Padi',
    komoditasKey: 'Padi',
    harga: 14500,
    satuan: 'kg',
    stokAwal: 3850,
    deskripsi: 'Beras putih pulen hasil panen sawah beririgasi teknis Desa Dawuhan. Ditanam secara organik minim pestisida kimia dengan bulir utuh dan aroma alami.',
    gambar: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    keunggulan: ['Pulen & Alami', 'Kadar Air Terjaga 14%', 'Bebas Pemutih Kimia'],
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
    deskripsi: 'Jagung pipil kering berkualitas tinggi dengan kadar air rendah (<14%). Sangat cocok untuk bahan pakan ternak berkualitas atau industri olahan pangan.',
    gambar: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    keunggulan: ['Kadar Air Kering <14%', 'Bulir Emas Bersih', 'Bebas Jamur'],
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
    deskripsi: 'Kedelai varietas Anjasmoro dengan biji besar kekuningan yang kaya protein nabati. Pilihan utama perajin tahu dan tempe tradisional khas Banyumas.',
    gambar: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
    keunggulan: ['Biji Besar Padat', 'Kadar Protein Tinggi', 'Hasil Rendemen Bagus'],
    kemasanTersedia: ['10 kg', '25 kg', '50 kg']
  }
];

export const INITIAL_FARMERS = [
  { id: 'petani-1', nama: 'Pak Slamet Raharjo', dusun: 'Dusun Krajan RT 02 / RW 01', luasLahan: '1.2 Ha', komoditasUtama: 'Padi' },
  { id: 'petani-2', nama: 'Bu Sari Handayani', dusun: 'Dusun Kebondalem RT 01 / RW 03', luasLahan: '0.8 Ha', komoditasUtama: 'Kedelai' },
  { id: 'petani-3', nama: 'Pak Wagiman', dusun: 'Dusun Sawah Lor RT 04 / RW 02', luasLahan: '1.5 Ha', komoditasUtama: 'Padi' },
  { id: 'petani-4', nama: 'Pak Joko Santoso', dusun: 'Dusun Krajan RT 03 / RW 01', luasLahan: '1.0 Ha', komoditasUtama: 'Jagung' },
  { id: 'petani-5', nama: 'Bu Hartini', dusun: 'Dusun Kebondalem RT 03 / RW 03', luasLahan: '0.7 Ha', komoditasUtama: 'Padi' },
  { id: 'petani-6', nama: 'Pak Suwarno', dusun: 'Dusun Sawah Kidul RT 02 / RW 04', luasLahan: '1.4 Ha', komoditasUtama: 'Jagung' },
  { id: 'petani-7', nama: 'Pak Bambang Triyono', dusun: 'Dusun Krajan RT 01 / RW 01', luasLahan: '1.1 Ha', komoditasUtama: 'Kedelai' },
  { id: 'petani-8', nama: 'Bu Siti Aminah', dusun: 'Dusun Kebondalem RT 02 / RW 03', luasLahan: '0.9 Ha', komoditasUtama: 'Padi' },
  { id: 'petani-9', nama: 'Pak Supardi', dusun: 'Dusun Sawah Kidul RT 01 / RW 04', luasLahan: '1.3 Ha', komoditasUtama: 'Jagung' }
];

export const INITIAL_HARVESTS = [
  // --- OKTOBER 2026 ---
  {
    id: 'PN-202610-001',
    tanggal: '2026-10-24',
    petaniId: 'petani-1',
    petaniNama: 'Pak Slamet Raharjo',
    komoditas: 'Padi',
    jumlahKg: 780,
    kualitas: 'A',
    catatan: 'Petak sawah barat, bulir padat matang merata'
  },
  {
    id: 'PN-202610-002',
    tanggal: '2026-10-22',
    petaniId: 'petani-3',
    petaniNama: 'Pak Wagiman',
    komoditas: 'Padi',
    jumlahKg: 850,
    kualitas: 'A',
    catatan: 'Kadar air 13.8%, hasil panen sangat baik'
  },
  {
    id: 'PN-202610-003',
    tanggal: '2026-10-20',
    petaniId: 'petani-4',
    petaniNama: 'Pak Joko Santoso',
    komoditas: 'Jagung',
    jumlahKg: 620,
    kualitas: 'B',
    catatan: 'Kering penjemuran 3 hari, sedikit tongkol kecil'
  },
  {
    id: 'PN-202610-004',
    tanggal: '2026-10-18',
    petaniId: 'petani-2',
    petaniNama: 'Bu Sari Handayani',
    komoditas: 'Kedelai',
    jumlahKg: 420,
    kualitas: 'A',
    catatan: 'Biji kuning mulus, siap kemas perajin tempe'
  },
  {
    id: 'PN-202610-005',
    tanggal: '2026-10-15',
    petaniId: 'petani-6',
    petaniNama: 'Pak Suwarno',
    komoditas: 'Jagung',
    jumlahKg: 740,
    kualitas: 'A',
    catatan: 'Jagung hibrida bisi, tongkol besar'
  },
  {
    id: 'PN-202610-006',
    tanggal: '2026-10-12',
    petaniId: 'petani-5',
    petaniNama: 'Bu Hartini',
    komoditas: 'Padi',
    jumlahKg: 590,
    kualitas: 'B',
    catatan: 'Sebagian terimbas angin, butir sedikit pecah'
  },
  {
    id: 'PN-202610-007',
    tanggal: '2026-10-08',
    petaniId: 'petani-7',
    petaniNama: 'Pak Bambang Triyono',
    komoditas: 'Kedelai',
    jumlahKg: 460,
    kualitas: 'A',
    catatan: 'Varietas Anjasmoro asli, panen optimal'
  },
  {
    id: 'PN-202610-008',
    tanggal: '2026-10-04',
    petaniId: 'petani-8',
    petaniNama: 'Bu Siti Aminah',
    komoditas: 'Padi',
    jumlahKg: 630,
    kualitas: 'A',
    catatan: 'Pupuk kandang organik fermentasi'
  },

  // --- SEPTEMBER 2026 ---
  {
    id: 'PN-202609-001',
    tanggal: '2026-09-28',
    petaniId: 'petani-1',
    petaniNama: 'Pak Slamet Raharjo',
    komoditas: 'Padi',
    jumlahKg: 910,
    kualitas: 'A',
    catatan: 'Panen raya musim rendeng petak 1'
  },
  {
    id: 'PN-202609-002',
    tanggal: '2026-09-25',
    petaniId: 'petani-9',
    petaniNama: 'Pak Supardi',
    komoditas: 'Jagung',
    jumlahKg: 820,
    kualitas: 'A',
    catatan: 'Kering giling sempurna'
  },
  {
    id: 'PN-202609-003',
    tanggal: '2026-09-21',
    petaniId: 'petani-3',
    petaniNama: 'Pak Wagiman',
    komoditas: 'Padi',
    jumlahKg: 760,
    kualitas: 'B',
    catatan: 'Cuaca sempat hujan ringan'
  },
  {
    id: 'PN-202609-004',
    tanggal: '2026-09-17',
    petaniId: 'petani-2',
    petaniNama: 'Bu Sari Handayani',
    komoditas: 'Kedelai',
    jumlahKg: 510,
    kualitas: 'A',
    catatan: 'Sortir kualitas premium'
  },
  {
    id: 'PN-202609-005',
    tanggal: '2026-09-14',
    petaniId: 'petani-4',
    petaniNama: 'Pak Joko Santoso',
    komoditas: 'Jagung',
    jumlahKg: 680,
    kualitas: 'A',
    catatan: 'Pipilan bersih dari tongkol'
  },
  {
    id: 'PN-202609-006',
    tanggal: '2026-09-09',
    petaniId: 'petani-8',
    petaniNama: 'Bu Siti Aminah',
    komoditas: 'Padi',
    jumlahKg: 710,
    kualitas: 'A',
    catatan: 'Ciherang murni'
  },
  {
    id: 'PN-202609-007',
    tanggal: '2026-09-04',
    petaniId: 'petani-6',
    petaniNama: 'Pak Suwarno',
    komoditas: 'Jagung',
    jumlahKg: 650,
    kualitas: 'B',
    catatan: 'Sedikit kadar air 15%'
  },

  // --- AGUSTUS 2026 ---
  {
    id: 'PN-202608-001',
    tanggal: '2026-08-29',
    petaniId: 'petani-1',
    petaniNama: 'Pak Slamet Raharjo',
    komoditas: 'Padi',
    jumlahKg: 870,
    kualitas: 'A',
    catatan: 'Pemberian pupuk bokashi berhasil'
  },
  {
    id: 'PN-202608-002',
    tanggal: '2026-08-24',
    petaniId: 'petani-7',
    petaniNama: 'Pak Bambang Triyono',
    komoditas: 'Kedelai',
    jumlahKg: 490,
    kualitas: 'A',
    catatan: 'Hasil tumpang sari tegalan'
  },
  {
    id: 'PN-202608-003',
    tanggal: '2026-08-19',
    petaniId: 'petani-3',
    petaniNama: 'Pak Wagiman',
    komoditas: 'Padi',
    jumlahKg: 790,
    kualitas: 'A',
    catatan: 'Kondisi air irigasi mencukupi'
  },
  {
    id: 'PN-202608-004',
    tanggal: '2026-08-15',
    petaniId: 'petani-9',
    petaniNama: 'Pak Supardi',
    komoditas: 'Jagung',
    jumlahKg: 710,
    kualitas: 'A',
    catatan: 'Pipil mesin perontok desa'
  },
  {
    id: 'PN-202608-005',
    tanggal: '2026-08-10',
    petaniId: 'petani-5',
    petaniNama: 'Bu Hartini',
    komoditas: 'Padi',
    jumlahKg: 640,
    kualitas: 'C',
    catatan: 'Serangan wereng lokal teratasi sebagian'
  },
  {
    id: 'PN-202608-006',
    tanggal: '2026-08-05',
    petaniId: 'petani-4',
    petaniNama: 'Pak Joko Santoso',
    komoditas: 'Jagung',
    jumlahKg: 600,
    kualitas: 'B',
    catatan: 'Pengeringan lantai jemur kelompok'
  }
];

export const INITIAL_SALES = [
  // --- OKTOBER 2026 ---
  {
    id: 'JL-202610-001',
    tanggal: '2026-10-23',
    komoditas: 'Padi',
    jumlahKg: 1200,
    pembeli: 'Koperasi Pertanian Tri Mulya',
    hargaPerKg: 14500,
    totalNilai: 17400000,
    status: 'Lunas'
  },
  {
    id: 'JL-202610-002',
    tanggal: '2026-10-19',
    komoditas: 'Kedelai',
    jumlahKg: 500,
    pembeli: 'Pabrik Tahu Pak Tardi Sokaraja',
    hargaPerKg: 12800,
    totalNilai: 6400000,
    status: 'Lunas'
  },
  {
    id: 'JL-202610-003',
    tanggal: '2026-10-14',
    komoditas: 'Jagung',
    jumlahKg: 800,
    pembeli: 'Sentra Pakan Unggas Dawuhan Makmur',
    hargaPerKg: 6200,
    totalNilai: 4960000,
    status: 'Lunas'
  },

  // --- SEPTEMBER 2026 ---
  {
    id: 'JL-202609-001',
    tanggal: '2026-09-26',
    komoditas: 'Padi',
    jumlahKg: 1800,
    pembeli: 'Perum Bulog Subdivre Banyumas',
    hargaPerKg: 14200,
    totalNilai: 25560000,
    status: 'Lunas'
  },
  {
    id: 'JL-202609-002',
    tanggal: '2026-09-18',
    komoditas: 'Jagung',
    jumlahKg: 1100,
    pembeli: 'Kemitraan Peternak Ayam Broiler',
    hargaPerKg: 6100,
    totalNilai: 6710000,
    status: 'Lunas'
  },
  {
    id: 'JL-202609-003',
    tanggal: '2026-09-12',
    komoditas: 'Kedelai',
    jumlahKg: 400,
    pembeli: 'Pengrajin Tempe Mendoan Dawuhan',
    hargaPerKg: 12700,
    totalNilai: 5080000,
    status: 'Lunas'
  },

  // --- AGUSTUS 2026 ---
  {
    id: 'JL-202608-001',
    tanggal: '2026-08-27',
    komoditas: 'Padi',
    jumlahKg: 1600,
    pembeli: 'Distributor Beras Sejahtera',
    hargaPerKg: 14000,
    totalNilai: 22400000,
    status: 'Lunas'
  },
  {
    id: 'JL-202608-002',
    tanggal: '2026-08-18',
    komoditas: 'Jagung',
    jumlahKg: 950,
    pembeli: 'Grosir Pakan Ternak Barokah',
    hargaPerKg: 6000,
    totalNilai: 5700000,
    status: 'Lunas'
  }
];

export const DESA_DAWUHAN_INFO = {
  namaKelompok: 'Marsudi Among Tani',
  namaDesa: 'Desa Dawuhan',
  kecamatan: 'Kecamatan Padamara',
  kabupaten: 'Kabupaten Purbalingga',
  provinsi: 'Jawa Tengah',
  tahunBerdiri: '2014',
  jumlahAnggota: '48 Petani Aktif',
  luasLahanBinaan: '42.5 Hektar',
  ketua: 'Pak Slamet Raharjo',
  kontakWA: '6281234567890',
  teleponDisplay: '+62 812-3456-7890',
  email: 'kontak@marsudiamongtani-dawuhan.id',
  alamatSekretariat: 'Balai Kelompok Tani, Jl. Sawah Subur No. 12, Dusun Krajan, Desa Dawuhan',
  
  profilDesa: `Desa Dawuhan merupakan salah satu lumbung pangan potensial yang terletak di lereng selatan Gunung Slamet, memberikan keunggulan berupa tanah vulkanik yang subur dan ketersediaan air irigasi pegunungan yang melimpah sepanjang tahun. Sebagian besar warga desa menggantungkan mata pencaharian pada sektor agraris dengan tradisi gotong royong yang kental.

Komoditas utama yang dihasilkan meliputi padi sawah varietas unggul seperti Ciherang dan Mentik Wangi, jagung hibrida berbobot tinggi, serta kedelai Anjasmoro yang menjadi bahan baku utama tempe dan tahu lokal. Melalui pengelolaan terintegrasi dan modernisasi pertanian, Desa Dawuhan bertekad mewujudkan kedaulatan pangan desa yang mandiri dan berdaya saing.`,

  sejarahKelompok: `Kelompok Tani "Marsudi Among Tani" resmi dibentuk pada tanggal 14 Mei 2014 atas inisiatif 18 petani pelopor Desa Dawuhan. Nama "Marsudi Among Tani" diambil dari falsafah luhur Jawa: "Marsudi" yang bermakna berikhtiar sungguh-sungguh dengan penuh ketulusan, dan "Among Tani" yang bermakna memelihara dan memuliakan profesi petani serta bumi pertiwi.

Awalnya kelompok ini berdiri sebagai sarana musyawarah jadwal tanam, pengelolaan saluran irigasi bersama (ulu-ulu), dan gotong royong pembagian pupuk bersubsidi. Seiring perkembangan waktu, kelompok tani ini bertransformasi menjadi wadah modern yang mencakup pencatatan data panen digital, pengelolaan lumbung stok gabah kelompok, stabilisasi harga jual gabah petani, hingga pemasaran produk unggulan langsung kepada konsumen dan koperasi tanpa perantara tengkulak yang merugikan.

Hingga tahun 2026, kelompok tani telah beranggotakan lebih dari 48 petani aktif dengan total hamparan lahan binaan mencapai 42.5 hektar, menjadi percontohan kelompok tani mandiri data di Kabupaten Purbalingga.`,

  visiMisi: {
    visi: 'Terwujudnya Kelompok Tani Mandiri, Sejahtera, dan Berbasis Sains Data Pertanian yang Berkelanjutan di Desa Dawuhan.',
    misi: [
      'Meningkatkan produktivitas hasil tani melalui penerapan teknik budidaya ramah lingkungan dan pemanfaatan data panen presisi.',
      'Menjamin transparansi pencatatan panen, pengelolaan stok gabah lumbung desa, dan akuntabilitas hasil kelompok.',
      'Memperluas akses pemasaran produk pangan langsung ke pembeli dengan harga yang adil bagi petani dan konsumen.',
      'Mempererat persaudaraan, solidaritas, dan gotong-royong antar-petani demi ketahanan pangan desa.'
    ]
  },

  strukturOrganisasi: [
    { jabatan: 'Ketua Kelompok Tani', nama: 'Pak Slamet Raharjo', periode: '2023 - 2027', peran: 'Penanggung Jawab Umum & Kemitraan' },
    { jabatan: 'Wakil Ketua', nama: 'Pak Wagiman', periode: '2023 - 2027', peran: 'Koordinator Lapangan & Irigasi' },
    { jabatan: 'Sekretaris & Operator Data', nama: 'Pak Joko Santoso', periode: '2023 - 2027', peran: 'Pencatatan Panen & Administrasi' },
    { jabatan: 'Bendahara', nama: 'Bu Sari Handayani', periode: '2023 - 2027', peran: 'Keuangan & Distribusi Hasil Penjualan' },
    { jabatan: 'Koordinator Pemasaran & Logistik', nama: 'Pak Suwarno', periode: '2023 - 2027', peran: 'Katalog & Layanan Pemesanan WA' }
  ]
};
