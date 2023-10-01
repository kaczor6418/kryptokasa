import { BinanceApiClient } from './BinanceApiClient';
import { SingleRate } from './CryptoMarketApiClient';
import { NbpApiClient } from './NbpApiClient';
import { OkxApiClient } from './OkxApiClient';
import { ZondaApiClient } from './ZondaApiClient';

export interface CryptoExchangeRateSummary {
  // TODO make generic
  // TODO add backup
  zonda: SingleRate | null;
  binance: SingleRate | null;
  okx: SingleRate | null;
  cryptocurrencyCode: string;
  timestamp: number;
}

const acceptedFiats = ['PLN', 'USD', 'EUR', 'GBP'];

export class ExchangeRatesService {
  private cache: Map<string, CryptoExchangeRateSummary> = new Map();
  private nbpClient: NbpApiClient = new NbpApiClient();
  private binanceClient: BinanceApiClient = new BinanceApiClient(this.nbpClient, acceptedFiats);
  private okxClient: OkxApiClient = new OkxApiClient(this.nbpClient, acceptedFiats);
  private zondaClient: ZondaApiClient = new ZondaApiClient(this.nbpClient, acceptedFiats);

  async getNpbUsdPlnRateDateString(): Promise<string> {
    const rate = await this.nbpClient.fetchRate('USD');
    return rate.effectiveDate;
  }

  async fetchCrypto(cryptocurrencyCode: string) {
    if (this.cache.has(cryptocurrencyCode)) {
      return Promise.resolve(this.cache.get(cryptocurrencyCode));
    }
    let zondaResponse: SingleRate | null = null;
    try {
      zondaResponse = await this.zondaClient.fetchRate(cryptocurrencyCode);
    } catch (e) {
      console.warn(e);
    }

    let binanceResponse: SingleRate | null = null;
    try {
      binanceResponse = await this.binanceClient.fetchRate(cryptocurrencyCode);
    } catch (e) {
      console.warn(e);
    }

    let okxResponse: SingleRate | null = null;
    try {
      okxResponse = await this.okxClient.fetchRate(cryptocurrencyCode);
    } catch (e) {
      console.warn(e);
    }

    const combinedResponse: CryptoExchangeRateSummary = {
      zonda: zondaResponse,
      binance: binanceResponse,
      okx: okxResponse,
      timestamp: Date.now(),
      cryptocurrencyCode,
    };
    this.cache.set(cryptocurrencyCode, combinedResponse);
    return combinedResponse;
  }
}
