export interface SingleRate {
    unitPrice: number;
    unitPriceCurrency: string;
    exchangeRateToPLN: number;
    exchangeRateEffectiveDateString: string;
}

export interface CryptoMarketApiClient {
    fetchRate(cryptocurrencyCode: string): Promise<SingleRate>;
}

export class ExchangeRateNotFound extends Error {
    constructor(firstCode: string, exchangeMarket: string) {
        super(`Exchange rate for ${firstCode} was not found on ${exchangeMarket}`);
    }
}