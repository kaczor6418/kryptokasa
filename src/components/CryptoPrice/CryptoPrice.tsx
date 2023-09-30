import { NumberInput } from '@/components/Form/Input/NumberInput';
import { CryptoPrice } from '@/type/CryptoPrice';
import { Input } from '@/components/Form/Input/Input';
import './CryptoPrice.css';

export interface CryptoPriceElementProps {
  value: CryptoPrice;
  index: number;
  onChange(value: CryptoPrice): void;
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
  return (
    <div className={'crypto-price'}>
      <NumberInput
        onChange={(value) => onChangeProp('unitPrice', value)}
        value={props.value.unitPrice}
        id={getId('unitPrice')}
      />
      <Input
        onChange={(value) => onChangeProp('unitPriceCurrency', value)}
        value={props.value.unitPriceCurrency}
        id={getId('unitPriceCurrency')}
      />
      <Input
        onChange={(value) => onChangeProp('priceSourceName', value)}
        value={props.value.priceSourceName}
        id={getId('priceSourceName')}
      />
      <Input
        onChange={(value) => onChangeProp('priceSourceURL', value)}
        value={props.value.priceSourceURL}
        id={getId('priceSourceURL')}
      />
    </div>
  );
}
