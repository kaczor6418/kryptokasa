import { CryptoRecord } from '@/type/CryptoRecord';

export interface Report {
  taxInstitution: string;
  caseNumber: string;
  ownerId: string;
  reportId: string;
  cryptoCurrencies: CryptoRecord[];
}
