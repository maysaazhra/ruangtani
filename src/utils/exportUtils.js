import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatNumber, formatDateIndo, getMonthName, getMasaTanamFullLabel } from './formatters';

export const exportToExcel = (data, filename = 'Laporan_Panen_Marsudi_Among_Tani') => {
  try {
    const formattedData = data.map((item, index) => ({
      No: index + 1,
      Tanggal: formatDateIndo(item.tanggal),
      'Nama Petani': item.petaniNama,
      Komoditas: item.komoditas,
      'Pengelolaan': item.pengelolaan || 'Organik',
      'Masa Tanam': getMasaTanamFullLabel(item.masaTanam || 'MT 01'),
      'Jumlah (Kg)': item.jumlahKg,
      Catatan: item.catatan || '-'
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Riwayat Panen');

    // Auto-fit column widths
    const maxCols = [
      { wch: 6 },
      { wch: 18 },
      { wch: 24 },
      { wch: 16 },
      { wch: 16 },
      { wch: 22 },
      { wch: 14 },
      { wch: 32 }
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

    // Header styling — Official Green
    doc.setFillColor(22, 101, 52); // Green 800
    doc.rect(0, 0, 210, 34, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('KELOMPOK TANI MARSUDI AMONG TANI', 14, 13);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Jalan Pesarehan Adipati Mrapat No 68, RT 03/RW 02, Desa Dawuhan, Kec. Banyumas, Kab. Banyumas 53192', 14, 19);
    doc.text('Badan Hukum: AHU-0058238.AH.01.07.2016 • Halal: ID33110018130760524 • Reg: 33.02.110.011.1.01', 14, 24);
    doc.text(`LAPORAN HASIL PANEN & REKAPITULASI - PERIODE: ${monthName.toUpperCase()} ${year}`, 14, 30);

    // Summary Box
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.text('Ringkasan Rekapitulasi Periode:', 14, 43);

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(14, 46, 182, 24, 3, 3, 'F');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Panen Masuk: ${formatNumber(summary.totalPanen || 0)} Kg`, 20, 53);
    doc.text(`Total Terdistribusi/Jual: ${formatNumber(summary.totalJual || 0)} Kg`, 20, 60);
    doc.text(`Stok Akhir Lumbung: ${formatNumber(summary.stokAkhir || 0)} Kg`, 105, 53);
    doc.text(`Petani Berpartisipasi: ${summary.petaniAktif || 0} Orang`, 105, 60);
    doc.text(`Rincian: Organik (${formatNumber(summary.panenOrganik || 0)} kg) • Konversi (${formatNumber(summary.panenKonversi || 0)} kg) • Non-Organik (${formatNumber(summary.panenNonOrganik || 0)} kg)`, 20, 66);

    // Table data (without kualitas, with pengelolaan & masa tanam)
    const tableHeaders = [['No', 'Tanggal', 'Nama Petani', 'Komoditas', 'Pengelolaan', 'Masa Tanam', 'Jumlah (Kg)', 'Catatan']];
    const tableBody = data.map((item, index) => [
      index + 1,
      formatDateIndo(item.tanggal),
      item.petaniNama,
      item.komoditas,
      item.pengelolaan || 'Organik',
      item.masaTanam || 'MT 01',
      `${formatNumber(item.jumlahKg)} kg`,
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
        fontSize: 8.5
      },
      styles: {
        fontSize: 8,
        cellPadding: 2.5
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    // Signatures
    const finalY = doc.lastAutoTable.finalY + 12;
    if (finalY < 250) {
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Dawuhan, ${formatDateIndo(new Date().toISOString().split('T')[0])}`, 140, finalY);
      doc.text('Mengetahui,', 20, finalY + 5);
      doc.text('Pengurus Poktan Marsudi Among Tani', 140, finalY + 5);
      doc.text('Ketua Kelompok Tani', 20, finalY + 10);
      doc.text('Sekretaris / Bendahara', 140, finalY + 10);

      doc.setFont('helvetica', 'bold');
      doc.text('SLAMET', 20, finalY + 28);
      doc.text('PURWADI PAIMAN', 140, finalY + 28);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('Ketua Kelompok Tani', 20, finalY + 32);
      doc.text('Bendahara Poktan', 140, finalY + 32);
    }

    doc.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('Export PDF failed:', error);
    return false;
  }
};
