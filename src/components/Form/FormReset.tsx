import { MouseEvent, useContext } from 'react';
import { CustomFormContext } from '@/components/Form/Form';

export interface FormSubmitProps {
  label: string;
}

export function FormReset(props: FormSubmitProps) {
  const formContext = useContext(CustomFormContext);
  function onClick(e: MouseEvent) {
    e.preventDefault();
    if (formContext) {
      formContext.reset();
    }
  }
  return (
    <button
      onClick={onClick}
      className={'form-button--reset'}
    >
      {props.label}
    </button>
  );
}
