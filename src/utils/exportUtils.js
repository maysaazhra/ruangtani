import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatNumber, formatDateIndo, getMonthName } from './formatters';

export const exportToExcel = (data, filename = 'Laporan_Panen_Marsudi_Among_Tani') => {
  try {
    const formattedData = data.map((item, index) => ({
      No: index + 1,
      Tanggal: formatDateIndo(item.tanggal),
      'Nama Petani': item.petaniNama,
      Komoditas: item.komoditas,
      'Jumlah (Kg)': item.jumlahKg,
      Kualitas: `Kualitas ${item.kualitas}`,
      Catatan: item.catatan || '-'
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Riwayat Panen');

    // Auto-fit column widths
    const maxCols = [
      { wch: 6 },
      { wch: 18 },
      { wch: 22 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 30 },
    ];
    worksheet['!cols'] = maxCols;

    XLSX.writeFile(workbook, `${filename}.xlsx`);
    return true;
  } catch (error) {
    console.error('Export Excel failed:', error);
    return false;
  }
};

export const exportToPDF = (data, month, year, summary = {}, filename = 'Laporan_Panen_Marsudi_Among_Tani') => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const monthName = getMonthName(month);

    // Header styling
    doc.setFillColor(22, 101, 52); // Green 800
    doc.rect(0, 0, 210, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('KELOMPOK TANI MARSUDI AMONG TANI', 14, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Desa Dawuhan, Kec. Padamara, Kab. Purbalingga, Jawa Tengah', 14, 20);
    doc.text(`LAPORAN HASIL PANEN & REKAPITULASI - PERIODE: ${monthName.toUpperCase()} ${year}`, 14, 26);

    // Summary Box
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Ringkasan Periode:', 14, 42);

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(14, 46, 182, 22, 3, 3, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Panen: ${formatNumber(summary.totalPanen || 0)} Kg`, 20, 53);
    doc.text(`Total Terdistribusi/Jual: ${formatNumber(summary.totalJual || 0)} Kg`, 20, 61);
    doc.text(`Stok Akhir Gabah: ${formatNumber(summary.stokAkhir || 0)} Kg`, 105, 53);
    doc.text(`Petani Berpartisipasi: ${summary.petaniAktif || 0} Orang`, 105, 61);

    // Table data
    const tableHeaders = [['No', 'Tanggal', 'Nama Petani', 'Komoditas', 'Jumlah (Kg)', 'Kualitas', 'Catatan']];
    const tableBody = data.map((item, index) => [
      index + 1,
      formatDateIndo(item.tanggal),
      item.petaniNama,
      item.komoditas,
      `${formatNumber(item.jumlahKg)} kg`,
      `Grade ${item.kualitas}`,
      item.catatan || '-'
    ]);

    doc.autoTable({
      head: tableHeaders,
      body: tableBody,
      startY: 75,
      theme: 'grid',
      headStyles: {
        fillColor: [22, 101, 52],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      styles: {
        fontSize: 8.5,
        cellPadding: 3
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    // Signatures
    const finalY = doc.lastAutoTable.finalY + 15;
    if (finalY < 250) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Mengetahui,', 20, finalY);
      doc.text('Ketua Kelompok Tani', 20, finalY + 5);
      doc.text('( Pak Slamet Raharjo )', 20, finalY + 28);

      doc.text(`Dawuhan, ${formatDateIndo(new Date().toISOString().split('T')[0])}`, 140, finalY);
      doc.text('Petugas Administrasi', 140, finalY + 5);
      doc.text('( Admin Kelompok Tani )', 140, finalY + 28);
    }

    doc.save(`${filename}_${monthName}_${year}.pdf`);
    return true;
  } catch (error) {
    console.error('Export PDF failed:', error);
    return false;
  }
};
