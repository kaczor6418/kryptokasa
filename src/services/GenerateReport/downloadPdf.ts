export function downloadPdf(url: string) {
  const fileToPrint = window.open(url);
  fileToPrint.print();
  // fileToPrint.document.close();
}
