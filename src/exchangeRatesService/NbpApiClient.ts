import { buildDateString } from './buildDateString';
//{"table":"A","currency":"dolar amerykański","code":"USD","rates":[{"no":"189/A/NBP/2023","effectiveDate":"2023-09-29","mid":4.3697}]}
interface NbpApiResponse {
    table: 'A';
    code: string;
    rates: Array<
        {
            no: string;
            effectiveDate: string;
            mid: number
        }
    >
}
interface NbpRate {
    rate: number;
    currencyCode: string;
    effectiveDate: string;
}
export class NbpApiClient {
    private cache: Map<string, NbpApiResponse> = new Map();

    async fetchRate(currencyCode: string): Promise<NbpRate> {
        if (currencyCode === 'PLN') {
            return {
                currencyCode,
                effectiveDate: buildDateString(new Date()),
                rate: 1
            };
        }

        let nbpResponse: NbpApiResponse | null = null;
        if (!this.cache.has(currencyCode)) {
            const date = new Date();
            const dateStrings = [];
            for (let i = 0; i < 7; i++) {
                dateStrings.push(buildDateString(date));
                date.setDate(date.getDate() - 1);
            }


            for (let dateString of dateStrings) {
                nbpResponse = await this.tryFetchingRateForDateString(currencyCode, dateString);
                if (nbpResponse !== null) {
                    break;
                }
            }
            if (!nbpResponse) {
                throw new NbpRateNotFoundError(currencyCode, dateStrings);
            }
            this.cache.set(currencyCode, nbpResponse);
        }

        nbpResponse = nbpResponse ?? this.cache.get(currencyCode)!;
        return {
            currencyCode,
            effectiveDate: nbpResponse.rates[0].effectiveDate,
            rate: nbpResponse.rates[0].mid
        };
    }

    async tryFetchingRateForDateString(currencyCode: string, dateString: string) {
        //https://api.nbp.pl/api/exchangerates/rates/a/usd/2023-09-29/?format=json
        const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode.toLowerCase()}/${dateString}/?format=json`;
        const response = await fetch(url, {
            headers: {
                accept: 'application/json'
            }
        });
        return response.status === 404 ? null : ((await response.json()) as NbpApiResponse);
    }
}

export class NbpRateNotFoundError extends Error {
    constructor(currencyCode: string, dateStrings: string[]) {
        super(`Looking up rate in NPB failed for ${currencyCode}. Used dateStrings: ${dateStrings.join(', ')}.`);
    }
}