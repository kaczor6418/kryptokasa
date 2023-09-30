import './Select.css';
import { useContext, useEffect, useState } from 'react';
import { CustomFormContext, FormContextEvents } from '@/components/Form/Form';

export interface SelectProps {
  onChange(value: string): void;
  onValidationChanged(isValid: boolean): void;
  value: string;
  label?: string;
  id: string;
  required?: boolean;
  options: [string | number, string][];
}

export function Select(props: SelectProps) {
  const [isPristine, setIsPristine] = useState<boolean>(true);
  const formContext = useContext(CustomFormContext);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const isValidNew = getValidationResults(props.value);
    setIsValid(isValidNew);
    props.onValidationChanged(isValid);
  });

  useEffect(() => {
    props.onValidationChanged(isValid);
  }, [isValid]);

  useEffect(() => {
    if (formContext?.isSubmitted && isPristine) {
      setIsPristine(false);
    }
  }, [formContext?.isSubmitted]);

  function onChange(value: string) {
    setIsPristine(false);
    setIsValid(!props.required || (props.required && !!value));
    props.onChange(value);
  }

  function getValidationResults(value: string): boolean {
    return !props.required || (props.required && !!value);
  }

  function getClasses() {
    const result = ['field field--select'];
    if (!isPristine && !isValid) {
      result.push('field--error');
    }
    return result.join(' ');
  }

  return (
    <div className={getClasses()}>
      {props.label ? <label htmlFor={props.id}>{props.label}</label> : null}
      <select
        name={props.id}
        id={props.id}
        value={props.value}
        onChange={(e) => onChange(e.target.value)}
      >
        {props.options.map((item) => (
          <option
            value={item[0]}
            key={item[0]}
          >
            {item[1]}
          </option>
        ))}
      </select>
    </div>
  );
}
