import { CryptoRecord } from '@/type/CryptoRecord';
import { Input } from '@/components/Form/Input/Input';
import { NumberInput } from '@/components/Form/Input/NumberInput';
import './CryptoRecordElement.css';
import { CryptoPriceElement } from '@/components/CryptoPrice/CryptoPrice';
import { CryptoPrice } from '@/type/CryptoPrice';
import { useContext, useEffect } from 'react';
import { CustomFormContext, FormErrorStatusChange } from '@/components/Form/Form';
import { Select } from '@/components/Form/Select/Select';
import { AppContext } from '@/App';
import { CryptoExchangeRateSummary } from '@/exchangeRatesService/ExchangeRatesService';
import { getGUID } from '@/utils/getGUID';
import { SingleRate } from '@/exchangeRatesService/CryptoMarketApiClient';

export interface CryptoRecordProps {
  record: CryptoRecord;
  index: number;
  onChange(value: CryptoRecord): void;
}

export function CryptoRecordElement(props: CryptoRecordProps) {
  const form = useContext(CustomFormContext);
  const app = useContext(AppContext);

  useEffect(() => {
    app?.fetchCrypto(props.record.name).then((msg) => {
      if (msg) {
        const keys: Array<keyof CryptoExchangeRateSummary> = Object.keys(msg) as Array<keyof CryptoExchangeRateSummary>;
        const results = keys
          .filter((key: keyof CryptoExchangeRateSummary) => typeof msg[key] === 'object' && msg[key] != null)
          .map((key) => {
            const currencyInfo: SingleRate = msg[key] as SingleRate;
            const price: CryptoPrice = {
              guid: getGUID(),
              priceSourceURL: '',
              priceSourceName: key,
              unitPriceCurrency: currencyInfo.unitPriceCurrency,
              isManual: false,
              unitPrice: currencyInfo.unitPrice,
              exchangeRateToPLN: props.record.amount * currencyInfo.unitPrice * currencyInfo.exchangeRateToPLN,
            };
            return price;
          });
        for (let i = results.length; i < 3; i++) {
          results.push({
            exchangeRateToPLN: 1,
            isManual: true,
            unitPrice: 0,
            unitPriceCurrency: 'PLN',
            priceSourceName: '',
            guid: getGUID(),
            priceSourceURL: '',
          });
        }
        props.onChange({
          ...props.record,
          prices: results,
        });
      }
    });
  }, [props.record.name]);

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
