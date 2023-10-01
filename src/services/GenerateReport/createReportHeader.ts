const TITLE = 'Szacowanie wartości kryptoaktywów';

export function createReportHeader() {
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = TITLE;
  header.appendChild(title);
  
  return header; 
}