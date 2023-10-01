export function downloadPdf(domElement) {
  const content = domElement.innerHTML;
  const a = window.open();
  a.document.write('<html>');
  a.document.write('<body>');
  a.document.write(content);
  a.document.write('</body></html>');
  a.document.close();
  a.print();
}