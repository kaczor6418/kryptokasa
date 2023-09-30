import { CryptoPrice } from '@/type/CryptoPrice';

export interface CryptoRecord {
  name: string;
  amount: number;
  guid: string;
  prices: CryptoPrice[];
}
