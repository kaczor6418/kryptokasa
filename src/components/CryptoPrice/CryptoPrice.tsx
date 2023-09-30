import { NumberInput } from '@/components/Form/Input/NumberInput';
import { CryptoPrice } from '@/type/CryptoPrice';
import { Input } from '@/components/Form/Input/Input';
import './CryptoPrice.css';
import { FormErrorStatusChange } from '@/components/Form/Form';
import { Select } from '@/components/Form/Select/Select';

export interface CryptoPriceElementProps {
  value: CryptoPrice;
  index: number;
  onChange(value: CryptoPrice): void;
  onValidationChange(error: FormErrorStatusChange): void;
}

export function CryptoPriceElement(props: CryptoPriceElementProps) {
  function onChangeProp(prop: keyof CryptoPrice, value: unknown) {
    props.onChange({
      ...props.value,
      [prop]: value,
    });
  }
  function getId(property: string) {
    return props.index + '_' + property;
  }

  function onUnitPriceValidationChanged(isValid: boolean) {
    props.onValidationChange({
      isValid: isValid,
      error: `"Cena jednostkowa" jest wymaganym polem.`,
      path: `${props.index}.unitPrice`,
    });
  }

  function onUnitPriceCurrencyValidationChanged(isValid: boolean) {
    props.onValidationChange({
      isValid: isValid,
      error: `"Waluta" jest wymaganym polem.`,
      path: `${props.index}.unitPriceCurrency`,
    });
  }

  function onPriceSourceNameValidationChanged(isValid: boolean) {
    props.onValidationChange({
      isValid: isValid,
      error: `Instytucja jest wymaganym polem.`,
      path: `${props.index}.priceSourceName`,
    });
  }

  function onUnitPriceSourceURLValidationChanged(isValid: boolean) {
    props.onValidationChange({
      isValid: isValid,
      error: `URL Instytucji jest wymaganym polem.`,
      path: `${props.index}.priceSourceURL`,
    });
  }

  return (
    <div className={'crypto-price'}>
      <NumberInput
        onChange={(value) => onChangeProp('unitPrice', value)}
        onValidationChanged={onUnitPriceValidationChanged}
        value={props.value.unitPrice}
        disabled={!props.value.isManual}
        id={getId('unitPrice')}
        required={true}
      />
      <Select
        onChange={(value) => onChangeProp('unitPriceCurrency', value)}
        onValidationChanged={onPriceSourceNameValidationChanged}
        value={props.value.unitPriceCurrency}
        id={getId('unitPriceCurrency')}
        required={true}
        disabled={!props.value.isManual}
        options={[
          ['PLN', 'PLN'],
          ['USD', 'USD'],
          ['EUR', 'EUR'],
          ['GBP', 'GBP'],
        ]}
      />
      <Input
        onChange={(value) => onChangeProp('priceSourceName', value)}
        onValidationChanged={onUnitPriceSourceURLValidationChanged}
        value={props.value.priceSourceName}
        disabled={!props.value.isManual}
        id={getId('priceSourceName')}
        required={true}
      />
      <Input
        onChange={(value) => onChangeProp('priceSourceURL', value)}
        onValidationChanged={onUnitPriceSourceURLValidationChanged}
        value={props.value.priceSourceURL}
        disabled={!props.value.isManual}
        required={true}
        id={getId('priceSourceURL')}
      />
    </div>
  );
}
