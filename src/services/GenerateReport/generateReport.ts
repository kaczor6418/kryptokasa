import { createReportHeader } from './createReportHeader.ts'
import { createReportBody } from './createReportBody.ts'

const example = {
  taxInstitution: 'Urząd w łodzi',
  caseNumber: '12908duqie8712aqhca',
  ownerId: 'Jan Kowalski, lat 23',
  reportId: crypto.randomUUID(),
  cryptoCurrencies: [
    {
      name: 'Bitcoin (BTC)',
      amount: 12.54,
      prices: [
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.7,
          priceSourceName: 'Binance',
          priceSourceURL: 'binance.com',
          isManual: true,
        },
        {
          unitPrice: 413.12,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.72,
          priceSourceName: 'Zonda',
          priceSourceURL: 'zonda.com',
          isManual: false,
        },
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'PLN',
          exchangeRateToPLN: 1,
          priceSourceName: 'Coinbase',
          priceSourceURL: 'coinbase.com',
          isManual: false,
        }
      ],
    },
    {
      name: 'Ethereum (ETH)',
      amount: 1234123,
      prices: [
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.72,
          priceSourceName: 'Binance',
          priceSourceURL: 'binance.com',
          isManual: true,
        },
        {
          unitPrice: 413.12,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.72,
          priceSourceName: 'Zonda',
          priceSourceURL: 'zonda.com',
          isManual: false,
        },
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'PLN',
          exchangeRateToPLN: 1,
          priceSourceName: 'Coinbase',
          priceSourceURL: 'coinbase.com',
          isManual: false,
        }
      ],
    },
    {
      name: 'Dogecoin (DOGE)',
      amount: 2.43,
      prices: [
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.72,
          priceSourceName: 'Binance',
          priceSourceURL: 'binance.com',
          isManual: true,
        },
        {
          unitPrice: 413.12,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.72,
          priceSourceName: 'Zonda',
          priceSourceURL: 'zonda.com',
          isManual: false,
        },
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'PLN',
          exchangeRateToPLN: 1,
          priceSourceName: 'Coinbase',
          priceSourceURL: 'coinbase.com',
          isManual: false,
        }
      ],
    },
    {
      name: 'OutGrid (OG)',
      amount: 1.21,
      prices: [
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.72,
          priceSourceName: 'Binance',
          priceSourceURL: 'binance.com',
          isManual: true,
        },
        {
          unitPrice: 413.12,
          unitPriceCurrency: 'USD',
          exchangeRateToPLN: 4.72,
          priceSourceName: 'Zonda',
          priceSourceURL: 'zonda.com',
          isManual: false,
        },
        {
          unitPrice: 2.1231,
          unitPriceCurrency: 'PLN',
          exchangeRateToPLN: 1,
          priceSourceName: 'Coinbase',
          priceSourceURL: 'coinbase.com',
          isManual: false,
        }
      ],
    }
  ]
}

export function generateReport(config = example, ) {
  const reportTemplate = document.createElement('div');
  const header = createReportHeader();
  reportTemplate.appendChild(header);
  reportTemplate.appendChild(createReportBody(config));

  return reportTemplate;
}
