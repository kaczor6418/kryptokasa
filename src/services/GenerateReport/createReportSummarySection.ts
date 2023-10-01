import {CryptoPrice} from "@/type/CryptoPrice";
import {CryptoRecord} from "@/type/CryptoRecord";
import {Report} from "@/type/Report";
import { twoDecimalPlaces } from './twoDecimalPlaces'
import { createSectionList } from './createSectionList'

const SECTION_TITLE = 'Kryptoaktywa';
const TABLE_HEADERS = [
  'Nazwa', 'Ilość', 'Giełda', 'Cena jednostkowa',
  'Całkowita wartość', 'Metoda wyliczenia', 'Średnia wartość kryptoaktywa', 'Manualnie'
];

function createActivesHeader() {
  const tableHeader = document.createElement('thead');
  const tableHeaderRow = document.createElement('tr');
  for (const header of TABLE_HEADERS) {
    const headerContent = document.createElement('th');
    headerContent.textContent = header;
    tableHeaderRow.appendChild(headerContent);
  }
  tableHeader.appendChild(tableHeaderRow);
  return tableHeader;
}

function createCryptoRow(cryptoCurrency: CryptoRecord) {
  const cryptoRows: HTMLTableRowElement[] = [];
  const unitPrices: number[] = [];
  let record: CryptoPrice;
  for (let subRow = 0; subRow < 3; subRow++) {
    const rowContentWrapper = document.createElement('tr');
    for (const colName of TABLE_HEADERS) {
      switch (colName) {
        case 'Nazwa':
          if (subRow === 0) {
            const cryptoName = document.createElement('td');
            cryptoName.className = 'crypto-name';
            cryptoName.rowSpan = 3;
            cryptoName.textContent = cryptoCurrency.name;
            rowContentWrapper.appendChild(cryptoName);
          }
          break;
        case 'Ilość':
          if (subRow === 0) {
            const cryptoAmount = document.createElement('td');
            cryptoAmount.className = 'crypto-amount';
            cryptoAmount.rowSpan = 3;
            cryptoAmount.textContent = cryptoCurrency.amount.toString(10);
            rowContentWrapper.appendChild(cryptoAmount);
          }
          break;
        case 'Giełda':
          record = cryptoCurrency.prices[subRow];
          const cryptoSource = document.createElement('td');
          cryptoSource.className = 'crypto-stock-name';
          cryptoSource.innerHTML = `${record.priceSourceName}<br/><a href="${record.priceSourceURL}">${record.priceSourceURL}</a>`;
          rowContentWrapper.appendChild(cryptoSource);
          break;
        case 'Cena jednostkowa':
          record = cryptoCurrency.prices[subRow];
          const cryptoUnitPrice = document.createElement('td');
          cryptoUnitPrice.className = 'crypto-unit-price';
          unitPrices.push(record.unitPrice);
          if (record.unitPriceCurrency === 'PLN') {
            cryptoUnitPrice.textContent = `${twoDecimalPlaces(record.unitPrice)} PLN`;
          } else {
            const pricePLN = record.unitPrice * record.exchangeRateToPLN;
            cryptoUnitPrice.textContent = `${twoDecimalPlaces(pricePLN)} PLN (${twoDecimalPlaces(record.unitPrice)} ${record.unitPriceCurrency})`;
          }
          rowContentWrapper.appendChild(cryptoUnitPrice);
          break;
        case 'Całkowita wartość':
          record = cryptoCurrency.prices[subRow];
          const cryptoTotalPrice = document.createElement('td');
          cryptoTotalPrice.className = 'crypto-total-price';
          const unitPrice = record.unitPriceCurrency === 'PLN' ? record.unitPrice : record.unitPrice * record.exchangeRateToPLN;
          const totalPrice = cryptoCurrency.amount * unitPrice;
          cryptoTotalPrice.textContent = `${twoDecimalPlaces(totalPrice)} PLN`;
          rowContentWrapper.appendChild(cryptoTotalPrice);
          break;
        case 'Metoda wyliczenia':
          record = cryptoCurrency.prices[subRow];
          const cryptoCalculationType = document.createElement('td');
          cryptoCalculationType.className = 'crypto-calculation-type';
          if (record.unitPriceCurrency === 'PLN') {
            cryptoCalculationType.textContent = 'Cena Jednostkowa x Ilość';
          } else {
            cryptoCalculationType.textContent = 'Cena Jednostkowa x Kurs x Ilość';
          }
          rowContentWrapper.appendChild(cryptoCalculationType);
          break;
        case 'Średnia wartość kryptoaktywa':
          if (subRow === 0) {
            const cryptoAverageTotalPrice = document.createElement('td');
            cryptoAverageTotalPrice.className = 'crypto-average-total-price';
            cryptoAverageTotalPrice.rowSpan = 3;
            const averageUnitPrice = unitPrices.reduce((sum, value) => {
              sum += value;
              return sum;
            }, 0);
            cryptoAverageTotalPrice.textContent = `${twoDecimalPlaces(averageUnitPrice * cryptoCurrency.amount)} PLN`;
            rowContentWrapper.appendChild(cryptoAverageTotalPrice);
          }
          break;
        case 'Manualnie':
          record = cryptoCurrency.prices[subRow];
          const cryptoIsManual = document.createElement('td');
          cryptoIsManual.className = 'crypto-is-manual';
          cryptoIsManual.textContent = record.isManual ? 'TAK' : 'NIE';
          rowContentWrapper.appendChild(cryptoIsManual);
          break;
        default:
          break;
      }
    }
    cryptoRows.push(rowContentWrapper);
  }
  return cryptoRows;
}

function createTableBody(cryptos: CryptoRecord[]) {
  const tableContent = document.createElement('tbody');
  for (const cryptoCurrency of cryptos) {
    createCryptoRow(cryptoCurrency).forEach(row => {
      tableContent.appendChild(row);
    })
  }
  return tableContent;
}

function createCryptosTable(cryptos: CryptoRecord[]) {
  const table = document.createElement('table');
  const tableHeader = createActivesHeader();
  const tableBody = createTableBody(cryptos);
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  return table;
}

export function createReportSummarySection(cryptos: Report, usdPlnExchangeTime: string) {
  const summarySection = document.createElement('section');
  const title = document.createElement('h2');
  const details = createSectionList([
    [
      'Kurs USD/PLN',
      twoDecimalPlaces(cryptos.cryptoCurrencies[0].prices[0].exchangeRateToPLN)
    ],
    [
      'Kurs z dnia',
      usdPlnExchangeTime.split('-').reverse().join('.')
    ]
  ]);
  const cryptosTable = createCryptosTable(cryptos.cryptoCurrencies);
  title.textContent = SECTION_TITLE;
  summarySection.appendChild(title);
  summarySection.appendChild(details);
  summarySection.appendChild(cryptosTable);
  return summarySection;
}
