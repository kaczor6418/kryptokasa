/**
 * Example 1:
 * We have 5 BTC with unit price: 20 000 USD
 * Average exchange rate according to NBP is 4.5 PLN for USD
 * unitPrice - 20 000
 * unitPriceCurrency: USD
 * exchangeRateToPLN: 4.5
 * priceSourceName: Zonda
 * priceSourceURL: Zonda.com
 *
 * Example 2:
 * We have 10 ETH with unit price: 1200 PLN
 * unitPrice - 1200
 * unitPriceCurrency: PLN
 * exchangeRateToPLN: 1
 * priceSourceName: Binance
 * priceSourceURL: Binance.pl
 */

export interface CryptoPrice {
    unitPrice: number;
    unitPriceCurrency: string;
    exchangeRateToPLN: number;
    priceSourceName: string;
    priceSourceURL: string;
    isManual: boolean;
}
