import { Input } from '@/components/Form/Input/Input';

export interface NumberInputProps {
  value: number | undefined;
  onChange(value: number): void;
  label?: string;
  id: string;
}

export function NumberInput(props: NumberInputProps) {
  function onChange(value: string) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      props.onChange(parseFloat(value));
    }
  }
  function valueToString(value: number | undefined): string {
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toString();
    }
    return '';
  }

  return (
    <Input
      onChange={onChange}
      value={valueToString(props.value)}
      label={props.label}
      type={'number'}
      id={props.id}
    />
  );
}
