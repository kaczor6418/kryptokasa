import { CryptoMarketApiClient, ExchangeRateNotFound, SingleRate } from "./CryptoMarketApiClient";
import { NbpApiClient } from "./NbpApiClient";

type ZondaTickerResponseItems = {
    [key: string]: ZondaTickerResponseItem;
};
interface ZondaTickerResponseItem {
    rate: string;
    time: string;
}

interface ZondaTickerResponse {
    status: string;
    items: ZondaTickerResponseItems;
}

export class ZondaApiClient implements CryptoMarketApiClient {
    private zondaTicker: ZondaTickerResponseItems | null = null;
    private acceptedFiats: string[];
    private nbpClient: NbpApiClient;
    constructor(nbpClient: NbpApiClient, acceptedFiats: string[]) {
        this.acceptedFiats = acceptedFiats;
        this.nbpClient = nbpClient;
    }
    async fetchRate(cryptocurrencyCode: string): Promise<SingleRate> {
        if(this.zondaTicker === null) {
            const tickerResponse = await fetch('https://api.zondacrypto.exchange/rest/trading/ticker', {
                headers: {
                    'accept': 'application/json'
                }
            });
            const parsedTickerResponse = (await tickerResponse.json()) as ZondaTickerResponse;
            if(parsedTickerResponse.status === "Ok") {
                this.zondaTicker = parsedTickerResponse.items;
            }
        }

        const fiat = this.acceptedFiats.find(f => this.zondaTicker![`${cryptocurrencyCode}-${f}`]);
        if(!fiat) {
            throw new ExchangeRateNotFound(cryptocurrencyCode, 'zonda'); 
        }
        const key = `${cryptocurrencyCode}-${fiat}`;
        const nbpRate = await this.nbpClient.fetchRate(fiat);
        return {
            unitPrice: parseFloat(this.zondaTicker![key].rate),
            unitPriceCurrency: fiat,
            exchangeRateEffectiveDateString: nbpRate.effectiveDate,
            exchangeRateToPLN: nbpRate.rate,
            sourceName: 'zondacrypto',
            sourceUrl: 'https://api.zondacrypto.exchange/rest/trading/ticker'
        };
    }
}