import { CryptoRecord } from '@/type/CryptoRecord';
import { Input } from '@/components/Form/Input/Input';
import { NumberInput } from '@/components/Form/Input/NumberInput';
import './CryptoRecordElement.css';
import { CryptoPriceElement } from '@/components/CryptoPrice/CryptoPrice';
import { CryptoPrice } from '@/type/CryptoPrice';

export interface CryptoRecordProps {
  record: CryptoRecord;
  onChange(value: CryptoRecord): void;
}

export function CryptoRecordElement(props: CryptoRecordProps) {
  function onNameChange(value: string): void {
    props.onChange({
      ...props.record,
      name: value,
    });
  }
  function onAmountChange(value: number): void {
    props.onChange({
      ...props.record,
      amount: value,
    });
  }
  function onChangePrice(index: number, value: CryptoPrice): void {
    const oldPrices = props.record.prices.slice();
    oldPrices[index] = value;
    props.onChange({
      ...props.record,
      prices: oldPrices,
    });
  }
  return (
    <div className={'crypto-record'}>
      <div className={'grid-row grid-row--two-col'}>
        <Input
          onChange={onNameChange}
          value={props.record.name}
          label={'Nazwa'}
          id={props.record.guid}
        />
        <NumberInput
          onChange={onAmountChange}
          value={props.record.amount}
          label={'Ilość'}
          id={props.record.guid}
        />
      </div>
      <div className={'prices'}>
        <div className={'crypto-price--head'}>
          <label htmlFor={'0_unitPrice'}>Cena jednostki</label>
          <label htmlFor={'0_unitPriceCurrency'}>Waluta</label>
          <label htmlFor={'0_priceSourceName'}>Instytucja</label>
          <label htmlFor={'0_priceSourceURL'}>URL Instytucji</label>
        </div>
        {props.record.prices.map((price, index) => (
          <CryptoPriceElement
            index={index}
            value={price}
            onChange={(value) => onChangePrice(index, value)}
          />
        ))}
      </div>
    </div>
  );
}
