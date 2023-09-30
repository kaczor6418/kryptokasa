import { CryptoRecord } from '@/type/CryptoRecord';
import { Input } from '@/components/Form/Input/Input';
import { NumberInput } from '@/components/Form/Input/NumberInput';
import './CryptoRecordElement.css';
import { CryptoPriceElement } from '@/components/CryptoPrice/CryptoPrice';
import { CryptoPrice } from '@/type/CryptoPrice';
import { useContext } from 'react';
import { CustomFormContext, FormErrorStatusChange } from '@/components/Form/Form';
import { Select } from '@/components/Form/Select/Select';

export interface CryptoRecordProps {
  record: CryptoRecord;
  index: number;
  onChange(value: CryptoRecord): void;
}

export function CryptoRecordElement(props: CryptoRecordProps) {
  const form = useContext(CustomFormContext);

  function onPriceValidationChanged(index: Number, error: FormErrorStatusChange) {
    form?.onValidationChanged({
      isValid: error.isValid,
      path: `${props.index}.${error.path}`,
      error: error.error,
    });
  }

  function onNameValidationChanged(isValid: boolean) {
    form?.onValidationChanged({
      isValid,
      path: `${props.index}.name`,
      error: 'Nazwa kryptoaktywy jest wymaganym polem.',
    });
  }

  function onAmountValidationChanged(isValid: boolean) {
    form?.onValidationChanged({
      isValid,
      path: `${props.index}.amount`,
      error: 'Ilość kryptoaktywy jest wymaganym polem.',
    });
  }

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
        <Select
          onChange={onNameChange}
          options={[
            ['', '--'],
            ['BTC', 'Bitcoin(BTC)'],
            ['ETH', 'Etherium(ETH)'],
          ]}
          onValidationChanged={onNameValidationChanged}
          value={props.record.name}
          label={'Nazwa'}
          id={props.record.guid}
          required={true}
        />
        <NumberInput
          onChange={onAmountChange}
          onValidationChanged={onAmountValidationChanged}
          value={props.record.amount}
          label={'Ilość'}
          id={props.record.guid}
          required={true}
        />
      </div>
      <div className={'prices'}>
        <div className={'crypto-price--head'}>
          <label htmlFor={'0_unitPrice'}>Cena jednostkowa</label>
          <label htmlFor={'0_unitPriceCurrency'}>Waluta</label>
          <label htmlFor={'0_priceSourceName'}>Instytucja</label>
          <label htmlFor={'0_priceSourceURL'}>URL Instytucji</label>
        </div>
        {props.record.prices.map((price, index) => (
          <CryptoPriceElement
            key={price.guid}
            index={index}
            onValidationChange={(error) => onPriceValidationChanged(index, error)}
            value={price}
            onChange={(value) => onChangePrice(index, value)}
          />
        ))}
      </div>
    </div>
  );
}
