import { CryptoMarketApiClient, ExchangeRateNotFound, SingleRate } from "./CryptoMarketApiClient";
import { NbpApiClient } from "./NbpApiClient";

interface OkxTickerResponse {
    code: string; // "0" ok "51001" not found
    msg: string;
    data: Array<{
        instId: string; // BTC-USD
        idxPx: string; // last index price
        ts: string;// Index price update time, Unix timestamp format in milliseconds, e.g. 1597026383085
    }>;
}

export class OkxApiClient implements CryptoMarketApiClient {
    private acceptedFiats: string[];
    private nbpClient: NbpApiClient;
    private cache: Map<string, OkxTickerResponse> = new Map();

    constructor(nbpClient: NbpApiClient, acceptedFiats: string[]) {
        this.acceptedFiats = acceptedFiats;
        this.nbpClient = nbpClient;
    }

    async fetchRate(cryptocurrencyCode: string): Promise<SingleRate> {
        if(!this.cache.has(cryptocurrencyCode)) {
            const keys = this.acceptedFiats.map(f => `${cryptocurrencyCode}-${f}`);
            let parsedResponse = null;
            for(let key of keys) {
                const response = await fetch(`https://www.okx.com/api/v5/market/index-tickers?instId=${key}`);
                parsedResponse = (await response.json()) as OkxTickerResponse;
                if(parsedResponse.code === '0') {
                    break;
                }
            }

            if(parsedResponse?.code !== '0') {
                throw new ExchangeRateNotFound(cryptocurrencyCode, 'okx'); 
            }

            this.cache.set(cryptocurrencyCode, parsedResponse);
        }

        const rate = this.cache.get(cryptocurrencyCode)!;
        const fiat = rate.data[0].instId.split('-')[1]!;
        const nbpRate = await this.nbpClient.fetchRate(fiat);
        return {
            exchangeRateEffectiveDateString: nbpRate.effectiveDate,
            exchangeRateToPLN: nbpRate.rate,
            unitPrice: parseFloat(rate.data[0].idxPx),
            unitPriceCurrency: fiat,
            sourceName: 'OKX',
            sourceUrl: 'https://www.okx.com/api/v5/market/index-tickers'
        };
    }


}