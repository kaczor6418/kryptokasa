import './Input.css';
import { useContext, useEffect, useState } from 'react';
import { CustomFormContext } from '@/components/Form/Form';

export interface InputProps {
  onChange(value: string): void;
  onValidationChanged(isValid: boolean): void;
  value: string;
  label?: string;
  id: string;
  maxLength?: number;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Input(props: InputProps): JSX.Element {
  const [isPristine, setIsPristine] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const formContext = useContext(CustomFormContext);

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
    setIsValid(getValidationResults(value));
    props.onChange(value);
  }

  function getValidationResults(value: string): boolean {
    return !props.required || (props.required && !!value);
  }

  function setValidation(value: boolean) {
    setIsValid(value);
  }

  function getClasses() {
    const result = ['field field--input'];
    if (!isPristine && !isValid) {
      result.push('field--error');
    }
    return result.join(' ');
  }

  return (
    <div className={getClasses()}>
      {props.label ? <label htmlFor={props.id}>{props.label}</label> : null}
      <input
        type={props.type ? props.type : 'text'}
        value={props.value}
        name={props.id}
        id={props.id}
        disabled={props.disabled ?? false}
        maxLength={props.maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
